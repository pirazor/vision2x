import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Truck, Bike, Star, Zap, Clock } from 'lucide-react';

const products = [
  {
    id: 'visionsense',
    name: 'VisionSense',
    tagline: 'Research & Development',
    description: 'Advanced perception system for autonomous vehicle research with stereo cameras and pre-trained AI models.',
    price: '$795',
    originalPrice: '$999',
    icon: Cpu,
    image: '/VisionSense.png',
    features: ['Latest NVIDIA Jetson Orin Super', 'Stereo + Mono Cameras', 'IMU + GNSS Sensors', 'Open-source Autovision Stack'],
    gradient: 'from-cyan-400/20 to-blue-500/20',
    bgColor: 'bg-gradient-to-br from-slate-800 to-slate-900',
    textColor: 'text-slate-900',
    available: true
  },
  {
    id: 'visionconnect',
    name: 'VisionConnect',
    tagline: 'Fleet Management',
    description: 'Comprehensive fleet safety and monitoring solution with real-time analytics and V2X communication.',
    price: 'Coming Soon',
    originalPrice: null,
    icon: Truck,
    image: '/VisionConnect.png',
    features: ['Fleet Dashboard', 'Real-time Monitoring', 'V2X Communication', 'Safety Analytics'],
    gradient: 'from-emerald-400/20 to-green-500/20',
    bgColor: 'bg-gradient-to-br from-emerald-800 to-green-900',
    textColor: 'text-emerald-900',
    available: false
  },
  {
    id: 'visionride',
    name: 'VisionRide',
    tagline: 'Micromobility',
    description: 'Smart safety system for e-bikes and scooters with collision detection and rider assistance.',
    price: 'Coming Soon',
    originalPrice: null,
    icon: Bike,
    image: '/VisionRide.png',
    features: ['Collision Detection', 'Rider Assistance', 'Smart Alerts', 'Mobile Integration'],
    gradient: 'from-purple-400/20 to-pink-500/20',
    bgColor: 'bg-gradient-to-br from-purple-800 to-pink-900',
    textColor: 'text-purple-900',
    available: false
  }
];

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy relative overflow-hidden border-t border-gray-200 dark:border-slate-700/50 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Complete Vision Solutions
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
            From research labs to production fleets, our AI-powered perception systems 
            deliver the reliability and performance your applications demand.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.id}
                className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl hover:shadow-teal-400/10 transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden border border-gray-200 dark:border-slate-700/50 hover:border-teal-400/30"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 dark:from-teal-400/10 to-emerald-500/5 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Product Image */}
                  <div className="aspect-video bg-gray-100 dark:bg-slate-700 rounded-xl mb-6 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-slate-900/50 to-transparent"></div>
                    {product.available ? (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          On Sale
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-gray-100 dark:bg-slate-700/50 rounded-xl text-teal-500 dark:text-teal-400 group-hover:bg-gray-200 dark:group-hover:bg-slate-600/50 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {product.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">
                    <span className="font-zen-dots">{product.name}</span>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed transition-colors duration-300">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                        <Zap className="w-3 h-3 text-teal-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      {product.available && (
                        <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">
                          {product.price}
                        </span>
                      )}
                    </div>
                    {product.available ? (
                      <Link
                        to={`/products/${product.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-medium rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
                      >
                        Buy Now
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => window.location.href = `/products/${product.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-300"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;