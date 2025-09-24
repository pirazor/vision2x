import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  priceId: string;
  mode: 'payment' | 'subscription';
}

interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minAmount?: number;
  maxDiscount?: number;
}
interface CartContextType {
  items: CartItem[];
  discountCode: DiscountCode | null;
  discountAmount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyDiscountCode: (code: string) => Promise<boolean>;
  removeDiscountCode: () => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getSavings: () => number;
  getFinalTotal: () => number;
}

// Available discount codes
const availableDiscounts: Record<string, DiscountCode> = {
  'WELCOME10': {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% off your first order',
    minAmount: 100
  },
  'SAVE50': {
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    description: '$50 off orders over $500',
    minAmount: 500
  },
  'STUDENT25': {
    code: 'STUDENT25',
    type: 'percentage',
    value: 25,
    description: '25% off for students',
    minAmount: 200,
    maxDiscount: 300
  },
  'RESEARCH20': {
    code: 'RESEARCH20',
    type: 'percentage',
    value: 20,
    description: '20% off for research institutions',
    minAmount: 300
  },
  'FREE4YOU': {
    code: 'FREE4YOU',
    type: 'percentage',
    value: 100,
    description: '100% off - Free product!',
    minAmount: 0
  }
};
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<DiscountCode | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vision2x-cart');
    const savedDiscount = localStorage.getItem('vision2x-discount');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    if (savedDiscount) {
      try {
        setDiscountCode(JSON.parse(savedDiscount));
      } catch (error) {
        console.error('Failed to load discount from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('vision2x-cart', JSON.stringify(items));
  }, [items]);

  // Save discount to localStorage whenever it changes
  useEffect(() => {
    if (discountCode) {
      localStorage.setItem('vision2x-discount', JSON.stringify(discountCode));
    } else {
      localStorage.removeItem('vision2x-discount');
    }
  }, [discountCode]);
  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add with quantity 1
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const applyDiscountCode = async (code: string): Promise<boolean> => {
    const upperCode = code.toUpperCase();
    const discount = availableDiscounts[upperCode];
    
    if (!discount) {
      return false;
    }
    
    const subtotal = getSubtotal();
    if (discount.minAmount && subtotal < discount.minAmount) {
      return false;
    }
    
    setDiscountCode(discount);
    return true;
  };

  const removeDiscountCode = () => {
    setDiscountCode(null);
  };
  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSavings = () => {
    const originalTotal = items.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    return originalTotal - getSubtotal();
  };

  const calculateDiscountAmount = () => {
    if (!discountCode) return 0;
    
    const subtotal = getSubtotal();
    let discount = 0;
    
    if (discountCode.type === 'percentage') {
      discount = subtotal * (discountCode.value / 100);
      if (discountCode.maxDiscount) {
        discount = Math.min(discount, discountCode.maxDiscount);
      }
    } else {
      discount = discountCode.value;
    }
    
    return Math.min(discount, subtotal);
  };

  const discountAmount = calculateDiscountAmount();

  const getFinalTotal = () => {
    return Math.max(0, getSubtotal() - discountAmount);
  };
  return (
    <CartContext.Provider value={{
      items,
      discountCode,
      discountAmount,
      addItem,
      removeItem,
      updateQuantity,
      applyDiscountCode,
      removeDiscountCode,
      clearCart,
      getTotalItems,
      getSubtotal,
      getSavings,
      getFinalTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}