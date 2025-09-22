import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, User, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { useOrders } from '../hooks/useOrders';
import { supabase } from '../lib/supabase';

const AccountPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading: subLoading, productName } = useSubscription();
  const { orders, loading: ordersLoading } = useOrders();
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 text-center transition-colors duration-300">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Sign In Required</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">
            Please sign in to access your account
          </p>
          
          <div className="space-y-4">
            <Link
              to="/login"
              className="w-full inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">My Account</h1>
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Welcome back, {user.user_metadata?.full_name || user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>

      {/* Subscription Status */}
      {!subLoading && subscription && subscription.subscription_status && subscription.subscription_status !== 'not_started' && (
        <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                {productName || 'Active Plan'} - {subscription.subscription_status}
              </p>
            </div>
            {subscription.subscription_status === 'active' && (
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Order History</h2>
              
              {ordersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
                </div>
              ) : orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.order_id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                          {order.order_number ? `Order ${order.order_number}` : `Order #${order.order_id}`}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                          {order.order_date ? `Placed on ${new Date(order.order_date).toLocaleDateString()}` : 'Date unavailable'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                          ${order.amount_total ? (order.amount_total / 100).toFixed(2) : '0.00'}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.order_status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                        }`}>
                          {(order.order_status || 'Unknown').charAt(0).toUpperCase() + (order.order_status || 'Unknown').slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                      Payment Status: {order.payment_status || 'Unknown'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">No orders yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Profile Information</h2>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user.user_metadata?.full_name || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Payment Methods</h2>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 text-center transition-colors duration-300">
                {subscription?.payment_method_brand ? (
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Default Payment Method</h3>
                    <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                      {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">No payment methods saved</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 transition-colors duration-300">
                      Payment methods are added during checkout
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Account Settings</h2>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-teal-400 focus:ring-teal-400" defaultChecked />
                    <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">Order updates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-teal-400 focus:ring-teal-400" defaultChecked />
                    <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">Product announcements</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-teal-400 focus:ring-teal-400" />
                    <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">Marketing emails</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;