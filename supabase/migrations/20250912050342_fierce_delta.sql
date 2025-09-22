/*
  # Fix Stripe-Supabase Sync Issues

  1. Verify RLS Policies
    - Ensure service role can manage all tables
    - Fix any restrictive policies that might block webhook operations
  
  2. Add Missing Indexes
    - Optimize webhook processing with proper indexes
    
  3. Add Debug Functions
    - Helper functions for troubleshooting sync issues
*/

-- Ensure service role has full access to stripe tables
DROP POLICY IF EXISTS "Service role can manage customers" ON stripe_customers;
CREATE POLICY "Service role can manage customers" 
  ON stripe_customers 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage subscriptions" ON stripe_subscriptions;
CREATE POLICY "Service role can manage subscriptions" 
  ON stripe_subscriptions 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage orders" ON stripe_orders;
CREATE POLICY "Service role can manage orders" 
  ON stripe_orders 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Add indexes for better webhook performance
CREATE INDEX IF NOT EXISTS idx_stripe_customers_customer_id_active 
  ON stripe_customers (customer_id) 
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer_id_active 
  ON stripe_subscriptions (customer_id) 
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_stripe_orders_customer_id_active 
  ON stripe_orders (customer_id) 
  WHERE deleted_at IS NULL;

-- Add webhook processing log table for debugging
CREATE TABLE IF NOT EXISTS stripe_webhook_logs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_id text NOT NULL,
  event_type text NOT NULL,
  customer_id text,
  processing_status text NOT NULL DEFAULT 'pending',
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on webhook logs
ALTER TABLE stripe_webhook_logs ENABLE ROW LEVEL SECURITY;

-- Service role can manage webhook logs
CREATE POLICY "Service role can manage webhook logs" 
  ON stripe_webhook_logs 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Authenticated users can view their own webhook logs
CREATE POLICY "Users can view their own webhook logs" 
  ON stripe_webhook_logs 
  FOR SELECT 
  TO authenticated 
  USING (customer_id IN (
    SELECT customer_id 
    FROM stripe_customers 
    WHERE user_id = auth.uid() AND deleted_at IS NULL
  ));

-- Add function to check sync status
CREATE OR REPLACE FUNCTION check_stripe_sync_status(customer_id_param text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  customer_record stripe_customers%ROWTYPE;
  subscription_record stripe_subscriptions%ROWTYPE;
  order_count integer;
  result json;
BEGIN
  -- Get customer record
  SELECT * INTO customer_record 
  FROM stripe_customers 
  WHERE customer_id = customer_id_param AND deleted_at IS NULL;
  
  -- Get subscription record
  SELECT * INTO subscription_record 
  FROM stripe_subscriptions 
  WHERE customer_id = customer_id_param AND deleted_at IS NULL;
  
  -- Get order count
  SELECT COUNT(*) INTO order_count 
  FROM stripe_orders 
  WHERE customer_id = customer_id_param AND deleted_at IS NULL;
  
  -- Build result
  SELECT json_build_object(
    'customer_exists', customer_record.customer_id IS NOT NULL,
    'customer_created_at', customer_record.created_at,
    'subscription_exists', subscription_record.customer_id IS NOT NULL,
    'subscription_status', subscription_record.status,
    'subscription_updated_at', subscription_record.updated_at,
    'order_count', order_count,
    'sync_status', CASE 
      WHEN customer_record.customer_id IS NULL THEN 'missing_customer'
      WHEN subscription_record.customer_id IS NULL AND order_count = 0 THEN 'no_transactions'
      ELSE 'synced'
    END
  ) INTO result;
  
  RETURN result;
END;
$$;