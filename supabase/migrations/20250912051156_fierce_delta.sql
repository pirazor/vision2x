/*
  # Fix payment_intent_id null constraint

  1. Changes
    - Make payment_intent_id nullable in stripe_orders table
    - This allows orders without payment intents (free transactions, etc.)

  2. Reasoning
    - Some Stripe checkout sessions don't have payment intents
    - Free transactions or certain payment methods can have null payment_intent
    - The webhook should be able to handle these cases
*/

-- Make payment_intent_id nullable
ALTER TABLE stripe_orders 
ALTER COLUMN payment_intent_id DROP NOT NULL;

-- Update any existing records that might have issues
UPDATE stripe_orders 
SET payment_intent_id = NULL 
WHERE payment_intent_id = '';