/*
  # Update stripe_user_orders view to include order_number

  1. View Updates
    - Drop and recreate the stripe_user_orders view to include order_number field
    - Ensure proper column ordering and data types
  
  2. Security
    - Maintain existing RLS policies
    - Keep security definer for proper access control
*/

-- Drop the existing view
DROP VIEW IF EXISTS stripe_user_orders;

-- Recreate the view with order_number included
CREATE VIEW stripe_user_orders
WITH (security_invoker = false) AS
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

-- Grant necessary permissions
GRANT SELECT ON stripe_user_orders TO authenticated;