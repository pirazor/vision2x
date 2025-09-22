import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const { price_id, success_url, cancel_url, mode, guest_checkout, discount_code, discount_amount } = await req.json();

    const error = validateParameters(
      { price_id, success_url, cancel_url, mode, guest_checkout, discount_code, discount_amount },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
        guest_checkout: 'boolean',
        discount_code: 'optional_string',
        discount_amount: 'optional_number',
      },
    );

    if (error) {
      return corsResponse({ error }, 400);
    }

    const authHeader = req.headers.get('Authorization')!;
    let customerId;
    let user = null;

    if (!guest_checkout) {
      // Authenticated user checkout
      const token = authHeader.replace('Bearer ', '');
      const {
        data: { user: authUser },
        error: getUserError,
      } = await supabase.auth.getUser(token);

      if (getUserError) {
        return corsResponse({ error: 'Failed to authenticate user' }, 401);
      }

      if (!authUser) {
        return corsResponse({ error: 'User not found' }, 404);
      }

      user = authUser;

      const { data: customer, error: getCustomerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .maybeSingle();

      if (getCustomerError) {
        console.error('Failed to fetch customer information from the database', getCustomerError);
        return corsResponse({ error: 'Failed to fetch customer information' }, 500);
      }

      if (!customer || !customer.customer_id) {
        // Create new customer for authenticated user
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            userId: user.id,
          },
        });

        console.log(`Created new Stripe customer ${newCustomer.id} for user ${user.id}`);

        const { error: createCustomerError } = await supabase.from('stripe_customers').insert({
          user_id: user.id,
          customer_id: newCustomer.id,
        });

        if (createCustomerError) {
          console.error('Failed to save customer information in the database', createCustomerError);
          try {
            await stripe.customers.del(newCustomer.id);
          } catch (deleteError) {
            console.error('Failed to clean up after customer mapping error:', deleteError);
          }
          return corsResponse({ error: 'Failed to create customer mapping' }, 500);
        }

        if (mode === 'subscription') {
          const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
            customer_id: newCustomer.id,
            status: 'not_started',
          });

          if (createSubscriptionError) {
            console.error('Failed to save subscription in the database', createSubscriptionError);
            try {
              await stripe.customers.del(newCustomer.id);
            } catch (deleteError) {
              console.error('Failed to delete Stripe customer after subscription creation error:', deleteError);
            }
            return corsResponse({ error: 'Unable to save the subscription in the database' }, 500);
          }
        }

        customerId = newCustomer.id;
      } else {
        customerId = customer.customer_id;

        if (mode === 'subscription') {
          const { data: subscription, error: getSubscriptionError } = await supabase
            .from('stripe_subscriptions')
            .select('status')
            .eq('customer_id', customerId)
            .maybeSingle();

          if (getSubscriptionError) {
            console.error('Failed to fetch subscription information from the database', getSubscriptionError);
            return corsResponse({ error: 'Failed to fetch subscription information' }, 500);
          }

          if (!subscription) {
            const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
              customer_id: customerId,
              status: 'not_started',
            });

            if (createSubscriptionError) {
              console.error('Failed to create subscription record for existing customer', createSubscriptionError);
              return corsResponse({ error: 'Failed to create subscription record for existing customer' }, 500);
            }
          }
        }
      }
    } else {
      // Guest checkout - create temporary customer
      const guestCustomer = await stripe.customers.create({
        metadata: {
          guest_checkout: 'true',
        },
      });

      customerId = guestCustomer.id;
      console.log(`Created guest customer ${customerId} for checkout`);
    }

    // Prepare line items
    const lineItems = [
      {
        price: price_id,
        quantity: 1,
      },
    ];

    // Prepare session configuration
    const sessionConfig: any = {
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode,
      ui_mode: 'hosted',
      automatic_tax: {
        enabled: true,
      },
      custom_text: {
        shipping_address: {
          message: 'Please note that delivery times may vary based on your location.',
        },
        submit: {
          message: 'We\'ll email you instructions on how to get started.',
        },
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'JP', 'SG', 'HK'],
      },
      customer_update: {
        shipping: 'auto',
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: 'company',
          label: {
            type: 'custom',
            custom: 'Company/Institution (Optional)',
          },
          type: 'text',
          optional: true,
        },
      ],
      metadata: {
        ...(discount_code && { discount_code }),
        ...(discount_amount && { discount_amount: discount_amount.toString() }),
      },
      success_url,
      cancel_url,
    };

    // Apply discount using Stripe's discount mechanism
    if (discount_code && discount_amount && discount_amount > 0) {
      // For 100% discount, set the price to $0
      if (discount_amount >= 100) {
        // Create a custom price for $0
        const freePrice = await stripe.prices.create({
          currency: 'usd',
          unit_amount: 0,
          product_data: {
            name: `Free Product (${discount_code})`,
          },
        });
        
        sessionConfig.line_items = [
          {
            price: freePrice.id,
            quantity: 1,
          },
        ];
      } else {
        // For partial discounts, create a coupon
        const coupon = await stripe.coupons.create({
          percent_off: discount_amount,
          duration: 'once',
          name: `Discount Code: ${discount_code}`,
        });
        
        sessionConfig.discounts = [
          {
            coupon: coupon.id,
          },
        ];
      }
    }

    // create Checkout Session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log(`Created checkout session ${session.id} for customer ${customerId}`);

    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});

type ExpectedType = 'string' | { values: string[] };
type ExpectedType = 'string' | 'boolean' | 'optional_string' | 'optional_number' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(values: T, expected: Expectations<T>): string | undefined {
  for (const parameter in values) {
    const expectation = expected[parameter];
    const value = values[parameter];

    if (expectation === 'string') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
      }
    } else if (expectation === 'boolean') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'boolean') {
        return `Expected parameter ${parameter} to be a boolean got ${JSON.stringify(value)}`;
      }
    } else if (expectation === 'optional_string') {
      if (value != null && typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string or null got ${JSON.stringify(value)}`;
      }
    } else if (expectation === 'optional_number') {
      if (value != null && typeof value !== 'number') {
        return `Expected parameter ${parameter} to be a number or null got ${JSON.stringify(value)}`;
      }
    } else {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
      }
    }
  }

  return undefined;
}