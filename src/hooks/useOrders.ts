import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Order {
  customer_id: string;
  order_id: number;
  order_number: string;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        console.log('Fetching orders for user:', user.id);
        const { data, error } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
        } else {
          console.log('Raw order data:', data);
          // Filter out null order entries (from LEFT JOIN when no orders exist)
          const validOrders = (data || []).filter(order => order.order_id !== null);
          console.log('Valid orders:', validOrders);
          setOrders(validOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return { orders, loading };
}