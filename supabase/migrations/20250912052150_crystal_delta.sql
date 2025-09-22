/*
  # Add order_number column to stripe_orders table
  
  1. Database Schema
    - Add order_number column to stripe_orders table
    - Create function to generate unique v2x order numbers
    - Populate existing records with order numbers
    - Add constraints and indexes
    - Update the stripe_user_orders view
*/

-- Step 1: Add the order_number column (nullable initially)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'stripe_orders' 
        AND column_name = 'order_number'
    ) THEN
        ALTER TABLE stripe_orders ADD COLUMN order_number TEXT;
    END IF;
END $$;

-- Step 2: Create the function to generate v2x order numbers
CREATE OR REPLACE FUNCTION generate_v2x_order_number()
RETURNS TEXT AS $$
DECLARE
    v2x_number TEXT;
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    i INTEGER;
    is_unique BOOLEAN := FALSE;
BEGIN
    WHILE NOT is_unique LOOP
        -- Start with 'v2x'
        v2x_number := 'v2x';
        
        -- Add 8 random characters
        FOR i IN 1..8 LOOP
            v2x_number := v2x_number || substr(chars, floor(random() * length(chars) + 1)::int, 1);
        END LOOP;
        
        -- Check if this order number already exists
        SELECT NOT EXISTS(
            SELECT 1 FROM stripe_orders WHERE stripe_orders.order_number = v2x_number
        ) INTO is_unique;
    END LOOP;
    
    RETURN v2x_number;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Update existing records that don't have order numbers
UPDATE stripe_orders 
SET order_number = generate_v2x_order_number() 
WHERE order_number IS NULL OR order_number = '';

-- Step 4: Add NOT NULL constraint
ALTER TABLE stripe_orders ALTER COLUMN order_number SET NOT NULL;

-- Step 5: Add unique constraint
ALTER TABLE stripe_orders ADD CONSTRAINT stripe_orders_order_number_unique UNIQUE (order_number);

-- Step 6: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_stripe_orders_order_number ON stripe_orders (order_number);

-- Step 7: Update the stripe_user_orders view to include order_number
DROP VIEW IF EXISTS stripe_user_orders;

CREATE VIEW stripe_user_orders
WITH (security_invoker = on) AS
SELECT
    c.customer_id,
    o.id AS order_id,
    o.order_number,
    o.checkout_session_id,
    o.payment_intent_id,
    o.amount_subtotal,
    o.amount_total,
    o.currency,
    o.payment_status,
    o.status AS order_status,
    o.created_at AS order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.user_id = auth.uid() AND c.deleted_at IS NULL;