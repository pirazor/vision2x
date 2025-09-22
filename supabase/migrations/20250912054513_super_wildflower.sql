/*
  # Update Order Number Format

  1. Changes
     - Update order number generation function to use "v2x" + 6 digits format
     - Update existing orders to use new format
     - Ensure uniqueness with shorter format

  2. Security
     - Function runs with proper permissions
     - Maintains data integrity
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS generate_v2x_order_number();

-- Create updated function for v2x + 6 digits format
CREATE OR REPLACE FUNCTION generate_v2x_order_number()
RETURNS TEXT AS $$
DECLARE
  v2x_number TEXT;
  is_unique BOOLEAN := FALSE;
  attempt_count INTEGER := 0;
  max_attempts INTEGER := 100;
BEGIN
  WHILE NOT is_unique AND attempt_count < max_attempts LOOP
    -- Generate v2x + 6 random digits
    v2x_number := 'v2x' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    -- Check if this number is unique in stripe_orders table
    SELECT NOT EXISTS(
      SELECT 1 FROM stripe_orders WHERE stripe_orders.order_number = v2x_number
    ) INTO is_unique;
    
    attempt_count := attempt_count + 1;
  END LOOP;
  
  IF NOT is_unique THEN
    RAISE EXCEPTION 'Could not generate unique order number after % attempts', max_attempts;
  END IF;
  
  RETURN v2x_number;
END;
$$ LANGUAGE plpgsql;

-- Update existing orders that don't have order numbers or have old format
UPDATE stripe_orders 
SET order_number = generate_v2x_order_number()
WHERE order_number IS NULL 
   OR order_number NOT LIKE 'v2x%'
   OR LENGTH(order_number) != 9; -- v2x + 6 digits = 9 characters

-- Ensure the view includes the order_number from stripe_orders
DROP VIEW IF EXISTS stripe_user_orders;

CREATE VIEW stripe_user_orders AS
SELECT 
  sc.customer_id,
  so.id as order_id,
  so.order_number,
  so.checkout_session_id,
  so.payment_intent_id,
  so.amount_subtotal,
  so.amount_total,
  so.currency,
  so.payment_status,
  so.status as order_status,
  so.created_at as order_date
FROM stripe_customers sc
LEFT JOIN stripe_orders so ON sc.customer_id = so.customer_id
WHERE sc.deleted_at IS NULL 
  AND (so.deleted_at IS NULL OR so.deleted_at IS NULL);