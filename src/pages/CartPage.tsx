import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Shield, Truck, Clock, User, UserPlus, Tag, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { createCheckoutSession } from '../lib/stripe';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeItem, getSubtotal, getSavings, discountCode, discountAmount, applyDiscountCode, removeDiscountCode, getFinalTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [discountInput, setDiscountInput] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Add Google Ads conversion tracking
  useEffect(() => {
    // Load Google tag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17505570368';
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17505570368');
    `;
    document.head.appendChild(script2);

    // Cleanup function
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const subtotal = getSubtotal();
  const savings = getSavings();
  const shipping = 0; // Free shipping
  const total = getFinalTotal() + shipping;

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) return;
    
    setDiscountLoading(true);
    setDiscountError(null);
    
    const success = await applyDiscountCode(discountInput.trim());
    
    if (success) {
      setDiscountInput('');
      setMessage({ type: 'success', text: 'Discount code applied successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setDiscountError('Invalid discount code or minimum order not met');
    }
    
    setDiscountLoading(false);
  };

  const handleRemoveDiscount = () => {
    removeDiscountCode();
    setMessage({ type: 'success', text: 'Discount code removed' });
    setTimeout(() => setMessage(null), 3000);
  };
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage({ type: 'error', text: 'Your cart is empty' });
      return;
    }

    if (!user) {
      setShowAuthOptions(true);
      return;
    }

    await processCheckout();
  };

  const processCheckout = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // For now, we'll handle single item checkout
      const item = cartItems[0];
      
      // Calculate final amount for Stripe
      const finalAmount = getFinalTotal();
      
      const { url } = await createCheckoutSession({
        priceId: item.priceId,
        mode: item.mode,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href,
        discountCode: discountCode?.code,
        discountAmount: discountAmount,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to start checkout' });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestCheckout = async () => {
    setShowAuthOptions(false);
    await processCheckout();
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Shopping Cart</h1>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">{cartItems.length}</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-slate-700/50 max-w-md mx-auto">
              <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Discover our innovative perception systems and add them to your cart.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 hover:border-teal-400/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-zen-dots">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Research & Development Platform
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${item.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          ${item.price.toLocaleString()}
                        </span>
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                          Save ${(item.originalPrice - item.price).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Trust Badges */}
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">Secure Payment</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">256-bit SSL encryption</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">Free Shipping</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Worldwide delivery</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">2-Year Warranty</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Full coverage included</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 sticky top-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Savings</span>
                      <span>-${savings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {/* Discount Code Section */}
                  <div className="space-y-3">
                    {discountCode ? (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                              {discountCode.code}
                            </span>
                          </div>
                          <button
                            onClick={handleRemoveDiscount}
                            className="p-1 hover:bg-green-100 dark:hover:bg-green-800/30 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </button>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                          {discountCode.description}
                        </div>
                        <div className="flex justify-between text-green-700 dark:text-green-300 font-medium mt-2">
                          <span>Discount</span>
                          <span>-${discountAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={discountInput}
                            onChange={(e) => {
                              setDiscountInput(e.target.value);
                              setDiscountError(null);
                            }}
                            placeholder="Enter discount code"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors duration-300"
                          />
                          <button
                            onClick={handleApplyDiscount}
                            disabled={discountLoading || !discountInput.trim()}
                            className="px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-medium rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            {discountLoading ? 'Applying...' : 'Apply'}
                          </button>
                        </div>
                        {discountError && (
                          <div className="text-xs text-red-600 dark:text-red-400">
                            {discountError}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
                    <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    {(savings > 0 || discountAmount > 0) && (
                      <div className="text-sm text-green-600 dark:text-green-400 text-right mt-1">
                        You save ${(savings + discountAmount).toLocaleString()}!
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages */}
                {message && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      message.type === 'error'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                        : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    } transition-colors duration-300`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Checkout Button */}
                {!showAuthOptions ? (
                  <button
                    onClick={handleCheckout}
                    disabled={loading || cartItems.length === 0}
                    className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 px-6 py-4 rounded-xl font-semibold hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-teal-400/25 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                ) : (
                  <div className="space-y-4 mb-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Complete Your Purchase</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Choose how you'd like to proceed</p>
                    </div>
                    
                    <button
                      onClick={handleGuestCheckout}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 px-6 py-4 rounded-xl font-semibold hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-teal-400/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {loading ? 'Processing...' : 'Continue as Guest'}
                    </button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">or</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleSignIn}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </button>
                      <button
                        onClick={handleCreateAccount}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setShowAuthOptions(false)}
                      className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                      ← Back to cart
                    </button>
                  </div>
                )}

                {/* Continue Shopping */}
                <Link
                  to="/"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  Continue Shopping
                </Link>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;