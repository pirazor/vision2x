import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X, Sun, Moon, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  return (
    <header className="bg-white dark:bg-dark-navy text-slate-900 dark:text-white shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={theme === 'light' ? 'https://connectedwise.store/vision2.com/media/Logo_Symbol_Light.png' : 'https://connectedwise.store/vision2.com/media/Logo_Symbol_Dark.png'}
              alt="Vision2x Logo"
              className="w-12 h-12"
            />
            <span className="text-xl font-zen-dots bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Vision2x</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home</Link>
            <div className="relative group">
              <button className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Products</button>
              <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 border border-gray-200 dark:border-slate-700">
                <div className="p-4 space-y-2">
                  <Link to="/products/visionsense" className="block p-2 hover:bg-teal-50 dark:hover:bg-slate-700 rounded">
                    <div className="font-zen-dots">VisionSense™</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Research & Development</div>
                  </Link>
                  <Link to="/products/visionconnect" className="block p-2 hover:bg-teal-50 dark:hover:bg-slate-700 rounded">
                    <div className="font-zen-dots">VisionConnect™</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fleet Management</div>
                  </Link>
                  <Link to="/products/visionride" className="block p-2 hover:bg-teal-50 dark:hover:bg-slate-700 rounded">
                    <div className="font-zen-dots">VisionRide™</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Micromobility</div>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/resources" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Resources</Link>
            <Link to="/support" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Support</Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-400 to-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            
            <Link to="/account" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-slate-700">
            <nav className="space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">Home</Link>
              <Link to="/products/visionsense" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"><span className="font-zen-dots">VisionSense™</span></Link>
              <Link to="/products/visionconnect" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"><span className="font-zen-dots">VisionConnect™</span></Link>
              <Link to="/products/visionride" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"><span className="font-zen-dots">VisionRide™</span></Link>
              <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">Resources</Link>
              <Link to="/support" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">Support</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">Cart</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;