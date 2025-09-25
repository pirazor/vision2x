import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Car, X } from 'lucide-react';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleWatchDemo = () => {
    setIsVideoPlaying(true);
  };

  const closeVideoPopup = () => {
    setIsVideoPlaying(false);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy overflow-hidden transition-colors duration-300">
      {/* Background Video */}
      <div className="absolute top-8 w-full h-1/3 mb-8 md:top-32 md:right-16 md:w-1/2 md:h-2/3 md:mb-0 z-10">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-60 md:opacity-80"
        >
          <source src="https://connectedwise.store/vision2.com/media/visionsense-narrow.webm" type="video/webm" />
        </video>
        
        {/* Modern Price Badge - positioned over video */}
        <div className="absolute top-4 md:-top-8 left-2 md:left-4 z-30 animate-drop-in delay-700">
          <div className="relative group cursor-pointer">
            <div className="animate-gentle-bounce scale-75 md:scale-100">
            
              {/* SALE badge in corner - positioned outside the main container */}
              <div className="absolute -top-3 md:-top-3 -right-2 md:-right-3 z-40">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs md:text-sm font-bold px-2 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
                  SALE
                </span>
              </div>
              
              {/* Glow rings - very subtle */}
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/40 to-emerald-500/40 rounded-2xl blur-sm opacity-85 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/30 to-emerald-500/30 rounded-3xl blur-md opacity-70 group-hover:opacity-90 transition-all duration-300 animate-pulse delay-200"></div>
              
              {/* Main badge container */}
              <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl md:rounded-2xl p-2 md:p-3 shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden">
                {/* Shine animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent -translate-x-full shine-effect"></div>
                
                {/* Content */}
                <div className="relative space-y-1">
                  {/* Pricing */}
                  <div className="text-center pt-2 md:pt-4 px-1 md:px-2 pb-1 md:pb-2">
                    <div className="text-s text-slate-500 dark:text-slate-400 line-through font-medium">$999</div>
                    <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white drop-shadow-sm">
                      $795
                    </div>
                    <div className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-bold">Save $204</div>
                  </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-6 md:w-8 h-6 md:h-8 bg-gradient-to-bl from-teal-400/20 to-transparent rounded-bl-xl md:rounded-bl-2xl"></div>
              </div>
            
            </div>
          </div>
        </div>
        
        {/* Product Name Badge - positioned at bottom left of video */}
        <div className="absolute bottom-4 md:bottom-4 right-4 md:right-40 z-30 animate-drop-in delay-500">
          <div className="bg-black/40 backdrop-blur-sm rounded-md md:rounded-lg px-2 md:px-4 py-1 md:py-2 shadow-2xl border border-white/20">
            <span className="text-xs md:text-sm font-zen-dots text-white drop-shadow-lg">VisionSense™</span>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 dark:bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-400/5 to-emerald-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-20 z-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%2314B8A6%27 fill-opacity=%270.1%27%3E%3Ccircle cx=%2730%27 cy=%2730%27 r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-up order-2 lg:order-1 mt-48 md:mt-0">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-2 md:px-4 bg-gradient-to-r from-teal-400/20 to-emerald-500/20 border border-teal-400/30 rounded-full text-teal-700 dark:text-teal-300 text-xs md:text-sm font-medium backdrop-blur-sm hover:from-teal-400/30 hover:to-emerald-500/30 transition-all duration-300">
                <Car className="w-4 h-4 mr-2" />
                Empowering Tomorrow's Mobility
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight relative z-25">
                <span className="text-slate-900 dark:text-white">AI-Powered</span>
                <span className="block bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Perception Systems</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Advanced computer vision solutions for autonomous vehicles, fleet safety, and micromobility. 
                Built with cutting-edge AI and optimized for real-world deployment.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-600 dark:text-slate-300">Open-source platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-600 dark:text-slate-300">ROS2 native</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-600 dark:text-slate-300">TensorRT optimized</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-600 dark:text-slate-300">Production ready</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                to="/products/visionsense"
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 group shadow-lg hover:shadow-teal-400/25"
              >
                Shop Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={handleWatchDemo}
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border border-gray-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-500 transition-all duration-300 group backdrop-blur-sm">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column - Product Visual */}
          <div className="relative animate-fade-in-up delay-300 flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Video placeholder or content can go here */}
          </div>
        </div>

      </div>

      {/* Video Popup Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Close Button */}
            <button
              onClick={closeVideoPopup}
              className="absolute -top-12 right-0 p-3 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Video Container */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                src="https://connectedwise.store/vision2.com/media/machine-vision.webm"
                className="w-full h-auto"
                controls
                autoPlay
                ref={(videoRef) => {
                  if (videoRef) {
                    videoRef.volume = 0.1; // Set volume to 10%
                  }
                }}
                onEnded={closeVideoPopup}
              />
            </div>
            
            {/* Video Title */}
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-semibold mb-2">Autonomous Vehicle Driving Demo</h3>
              <p className="text-gray-300 text-sm">Advanced AI-powered perception in action</p>
            </div>
          </div>
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeVideoPopup}
          />
        </div>
      )}
    </section>
  );
};

export default Hero;