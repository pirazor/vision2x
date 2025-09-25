import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-white dark:bg-dark-navy text-slate-900 dark:text-white border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src={theme === 'light' ? 'https://connectedwise.store/vision2.com/media/Logo_Symbol_Light.png' : 'https://connectedwise.store/vision2.com/media/Logo_Symbol_Dark.png'}
                alt="Vision2x Logo"
                className="w-12 h-12"
              />
              <span className="text-xl font-zen-dots bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Vision2x</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
              Advanced AI-powered perception systems for autonomous vehicles, fleet safety, and micromobility solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/connected-wise" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#333"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/connected-wise/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>
                </svg>
              </a>
              <a href="https://x.com/ConnectedWise" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">Products</h3>
            <div className="space-y-2">
              <Link to="/products/visionsense" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                <span className="font-zen-dots">VisionSense™</span>
                <div className="text-sm text-slate-500 dark:text-slate-500">Research & Development</div>
              </Link>
              <Link to="/products/visionconnect" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                <span className="font-zen-dots">VisionConnect™</span>
                <div className="text-sm text-slate-500 dark:text-slate-500">Fleet Management</div>
              </Link>
              <Link to="/products/visionride" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                <span className="font-zen-dots">VisionRide™</span>
                <div className="text-sm text-slate-500 dark:text-slate-500">Micromobility</div>
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">Resources</h3>
            <div className="space-y-2">
              <Link to="/resources" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                Documentation
              </Link>
              <Link to="#" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                Getting Started
              </Link>
              <Link to="#" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                API Reference
              </Link>
              <Link to="#" className="block text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm">
                Case Studies
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span>info@vision2x.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span>+1 (407) 477-6742</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                <MapPin className="w-4 h-4" />
                <span>Orlando, FL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-8 text-center transition-colors duration-300">
          <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
            © 2025 Connected Wise LLC. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;