import { supabase } from './supabase';

export async function createCheckoutSession({
  priceId,
  mode,
  successUrl,
  cancelUrl,
  discountCode,
  discountAmount,
}: {
  priceId: string;
  mode: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
  discountCode?: string;
  discountAmount?: number;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  
  // For guest checkout, we'll use the anon key instead of user token
  const authHeader = session?.access_token 
    ? `Bearer ${session.access_token}`
    : `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: JSON.stringify({
      price_id: priceId,
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      guest_checkout: !session?.access_token,
      discount_code: discountCode,
      discount_amount: discountAmount,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  return response.json();
}