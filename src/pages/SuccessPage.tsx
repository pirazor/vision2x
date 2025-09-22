import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Payment Successful!
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">
            Thank you for your purchase. Your order has been confirmed and you'll receive an email confirmation shortly.
          </p>

          {sessionId && (
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-6 transition-colors duration-300">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Order Reference:</p>
              <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">
                {sessionId}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/account"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
            >
              <Package className="w-5 h-5 mr-2" />
              View Order Details
            </Link>
            
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@vision2x.com" className="text-teal-600 dark:text-teal-400 hover:underline">
                support@vision2x.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;