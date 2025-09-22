import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

// Add enhanced logging and error handling
const LOG_LEVEL = Deno.env.get('LOG_LEVEL') || 'info';

function log(level: string, message: string, data?: any) {
  if (LOG_LEVEL === 'debug' || level === 'error') {
    console.log(`[${level.toUpperCase()}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }
}

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

// Validate environment variables
if (!stripeSecret || !stripeWebhookSecret) {
  throw new Error('Missing required Stripe environment variables: STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
}

const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required Supabase environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req) => {
  try {
    log('debug', 'Received webhook request', { method: req.method, url: req.url });
    
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      log('error', 'Invalid method received', { method: req.method });
      return new Response('Method not allowed', { status: 405 });
    }

    // get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      log('error', 'No Stripe signature found in headers');
      return new Response('No signature found', { status: 400 });
    }

    // get the raw body
    const body = await req.text();
    log('debug', 'Webhook body received', { bodyLength: body.length });

    // verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
      log('info', 'Webhook signature verified successfully', { eventType: event.type, eventId: event.id });
    } catch (error: any) {
      log('error', 'Webhook signature verification failed', { error: error.message });
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    log('info', 'Processing webhook event', { type: event.type, id: event.id });
    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    log('error', 'Error processing webhook', { error: error.message, stack: error.stack });
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  log('info', 'Processing webhook event', { type: event.type, id: event.id });
  log('debug', 'Event data', event.data.object);
  
  // Log webhook processing to database for debugging
  try {
    const stripeData = event?.data?.object ?? {};
    const customerId = ('customer' in stripeData) ? stripeData.customer as string : null;
    
    await supabase.from('stripe_webhook_logs').insert({
      event_id: event.id,
      event_type: event.type,
      customer_id: customerId,
      processing_status: 'processing'
    });
  } catch (logError) {
    log('error', 'Failed to log webhook processing', { error: logError });
  }
  
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    log('error', 'No stripe data found in event', { eventType: event.type });
    await updateWebhookLog(event.id, 'failed', 'No stripe data found in event');
    return;
  }

  if (!('customer' in stripeData)) {
    log('debug', 'No customer field found in stripe data', { eventType: event.type });
    await updateWebhookLog(event.id, 'skipped', 'No customer field found');
    return;
  }

  // for one time payments, we only listen for the checkout.session.completed event
  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    log('debug', 'Skipping payment_intent.succeeded for one-time payment');
    await updateWebhookLog(event.id, 'skipped', 'One-time payment handled by checkout.session.completed');
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    log('error', 'No valid customer ID received', { eventType: event.type, customerId });
    await updateWebhookLog(event.id, 'failed', 'Invalid customer ID');
    return;
  } else {
    log('info', 'Processing event for customer', { customerId, eventType: event.type });
    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;

      isSubscription = mode === 'subscription';

      log('info', `Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    try {
      if (isSubscription) {
        log('info', 'Starting subscription sync', { customerId });
        await syncCustomerFromStripe(customerId);
        await updateWebhookLog(event.id, 'completed', 'Subscription synced successfully');
      } else if (mode === 'payment' && payment_status === 'paid') {
        log('info', 'Processing one-time payment order', { customerId });
        
        // Extract the necessary information from the session
        const {
          id: checkout_session_id,
          payment_intent,
          amount_subtotal,
          amount_total,
          currency,
        } = stripeData as Stripe.Checkout.Session;

        // Generate order number using database function to ensure uniqueness
        const { data: orderNumberResult, error: orderNumberError } = await supabase
          .rpc('generate_v2x_order_number');

        if (orderNumberError) {
          log('error', 'Failed to generate order number', { error: orderNumberError });
          throw new Error(`Failed to generate order number: ${orderNumberError.message}`);
        }

        const orderNumber = orderNumberResult;

        log('info', 'Inserting order into database', { checkout_session_id, customerId, amount_total });
        
        // Insert the order into the stripe_orders table
        const { error: orderError } = await supabase.from('stripe_orders').insert({
          order_number: orderNumber,
          checkout_session_id,
          payment_intent_id: payment_intent || null,
          customer_id: customerId,
          amount_subtotal,
          amount_total,
          currency,
          payment_status,
          status: 'completed', // assuming we want to mark it as completed since payment is successful
        });

        if (orderError) {
          log('error', 'Error inserting order', { error: orderError, customerId, checkout_session_id, orderNumber });
          await updateWebhookLog(event.id, 'failed', `Order insertion failed: ${orderError.message}`);
          return;
        }
        log('info', 'Successfully processed one-time payment', { checkout_session_id, customerId, orderNumber });
        await updateWebhookLog(event.id, 'completed', 'One-time payment processed successfully');
      } else {
        await updateWebhookLog(event.id, 'skipped', `Unhandled payment mode or status: ${mode}/${payment_status}`);
      }
    } catch (error: any) {
      log('error', 'Error processing webhook event', { error, customerId, eventType: event.type });
      await updateWebhookLog(event.id, 'failed', `Processing error: ${error.message}`);
      throw error;
    }
  }
}

async function updateWebhookLog(eventId: string, status: string, message?: string) {
  try {
    await supabase.from('stripe_webhook_logs')
      .update({
        processing_status: status,
        error_message: message,
        updated_at: new Date().toISOString()
      })
      .eq('event_id', eventId);
  } catch (error) {
    log('error', 'Failed to update webhook log', { error, eventId });
  }
}

// based on the excellent https://github.com/t3dotgg/stripe-recommendations
async function syncCustomerFromStripe(customerId: string) {
  try {
    log('info', 'Syncing customer from Stripe', { customerId });
    // fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    // TODO verify if needed
    if (subscriptions.data.length === 0) {
      log('info', 'No active subscriptions found, setting status to not_started', { customerId });
      
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        log('error', 'Error updating subscription status to not_started', { error: noSubError, customerId });
        throw new Error('Failed to update subscription status in database');
      }
      return;
    }

    // assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];
    log('debug', 'Found subscription data', { subscriptionId: subscription.id, status: subscription.status });

    // store subscription state
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      log('error', 'Error syncing subscription to database', { error: subError, customerId, subscriptionId: subscription.id });
      throw new Error('Failed to sync subscription in database');
    }
    log('info', 'Successfully synced subscription', { customerId, subscriptionId: subscription.id });
  } catch (error) {
    log('error', 'Failed to sync subscription', { error, customerId });
    throw error;
  }
}