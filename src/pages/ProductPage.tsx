import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Shield, Zap, Cpu, Camera, Globe, Code, Download, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductPage = () => {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Product data
  const productData = {
    visionsense: {
      id: 'visionsense',
      name: 'VisionSense™',
      tagline: 'Research & Development Platform',
      price: 795,
      originalPrice: 999,
      priceId: 'price_1RqnQSR7emstJdgzE2t9Ujgf',
      mode: 'payment' as const,
      images: [
        'https://connectedwise.store/vision2.com/media/VisionSense.png',
        'https://connectedwise.store/vision2.com/media/VisionSense-2.png',
        'https://connectedwise.store/vision2.com/media/VisionSense-3.png'
      ],
      video: 'https://connectedwise.store/vision2.com/media/visionsense-demo.webm',
      description: 'Advanced perception system for autonomous vehicle research with stereo cameras, IMU sensors, and pre-trained AI models. Built on the NVIDIA Jetson Orin platform for edge AI processing.',
      keyFeatures: [
        'Latest NVIDIA Jetson Orin Super',
        'Stereo + Mono Camera System', 
        'IMU + GNSS Sensors',
        'Open-source AutoVision Stack',
        'ROS2 Native Integration',
        'TensorRT Optimized Models'
      ],
      specifications: {
        'Compute Platform': 'NVIDIA Jetson Orin Nano 8GB',
        'AI Performance': '40 TOPS (INT8)',
        'CPU': '6-core Arm Cortex-A78AE',
        'GPU': '1024-core NVIDIA Ampere',
        'Memory': '8GB 128-bit LPDDR5',
        'Storage': '64GB eUFS + microSD',
        'Camera Interface': 'MIPI CSI-2 (4 lanes)',
        'Connectivity': 'USB 3.2, USB-C, Gigabit Ethernet',
        'Power': '5W - 15W',
        'Operating Temp': '-25°C to 80°C',
        'Dimensions': '103 x 90 x 31 mm',
        'Weight': '398g'
      },
      features: [
        {
          title: 'Object Detection',
          description: 'Real-time multi-class object detection with YOLO-based models optimized for automotive scenarios.',
          icon: Camera,
          image: 'https://connectedwise.store/vision2.com/media/ObjectDetection.png',
          details: [
            'Vehicle, pedestrian, cyclist, and traffic sign detection',
            'Real-time inference at 30+ FPS',
            'Confidence scores and bounding box coordinates',
            'Custom model training support',
            'Multiple detection frameworks (YOLO, SSD, RetinaNet)',
            'TensorRT optimization for edge deployment'
          ]
        },
        {
          title: 'Lane Detection',
          description: 'Robust lane marking detection and tracking for autonomous navigation and driver assistance systems.',
          icon: Globe,
          image: 'https://connectedwise.store/vision2.com/media/LaneDetection.png',
          details: [
            'Polynomial lane curve fitting',
            'Multi-lane detection and classification',
            'Lane departure warning integration',
            'Curved and straight road support',
            'Weather-resistant algorithms',
            'Real-time road boundary estimation'
          ]
        },
        {
          title: 'ADAS Platform & ROS Integration',
          description: 'Complete ADAS development environment with native ROS2 integration and 3D visualization tools for comprehensive autonomous driving research.',
          icon: Code,
          image: 'https://connectedwise.store/vision2.com/media/AutoVision.png',
          details: [
            'Native ROS2 Humble and Iron support',
            '3D visualization and debugging interface',
            'Advanced sensor fusion algorithms',
            'Real-time data logging and replay',
            'Modular perception pipeline architecture',
            'Custom ADAS application development framework',
            'Stereo vision-based depth estimation for 3D scene understanding',
            'Seamless integration with robotics workflows',
            'Professional development tools and IDE integration',
            'Multi-threading support for real-time processing'
          ]
        }
      ],
      included: [
        'VisionSense Hardware Unit',
        'Power Supply & Cables',
        'Mounting Hardware',
        'AutoVision SDK License',
        'Documentation & Guides',
        'ROS2 Sample Packages',
        '2-Year Warranty'
      ],
      useCases: [
        'Autonomous vehicle research',
        'ADAS algorithm development',
        'Computer vision prototyping',
        'Robotics perception systems',
        'Academic research projects',
        'Industrial automation'
      ]
    },
    visionconnect: {
      id: 'visionconnect',
      name: 'VisionConnect™',
      tagline: 'Fleet Management Solution',
      price: null,
      originalPrice: null,
      priceId: null,
      mode: 'payment' as const,
      images: [
        'https://connectedwise.store/vision2.com/media/VisionConnect.png'
      ],
      video: null,
      description: 'Comprehensive fleet safety and monitoring solution with real-time analytics, V2X communication, and centralized management dashboard.',
      keyFeatures: [
        'Real-time Fleet Monitoring',
        'V2X Communication',
        'Safety Analytics Dashboard',
        'Driver Behavior Analysis',
        'Route Optimization',
        'Predictive Maintenance'
      ],
      specifications: {},
      features: [],
      included: [],
      useCases: [],
      comingSoon: true
    },
    visionride: {
      id: 'visionride',
      name: 'VisionRide™',
      tagline: 'Micromobility Safety System',
      price: null,
      originalPrice: null,
      priceId: null,
      mode: 'payment' as const,
      images: [
        'https://connectedwise.store/vision2.com/media/VisionRide.png'
      ],
      video: null,
      description: 'Smart safety system for e-bikes and scooters with collision detection, rider assistance, and mobile app integration.',
      keyFeatures: [
        'Collision Detection',
        'Rider Assistance',
        'Smart Alerts',
        'Mobile Integration',
        'GPS Tracking',
        'Emergency Response'
      ],
      specifications: {},
      features: [],
      included: [],
      useCases: [],
      comingSoon: true
    }
  };

  const product = productData[productId as keyof typeof productData];

  const handleAddToCart = () => {
    if (!product || product.comingSoon) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      priceId: product.priceId,
      mode: product.mode
    });

    setMessage({ type: 'success', text: 'Added to cart successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Product not found</h1>
          <Link to="/" className="text-teal-600 dark:text-teal-400 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  if (product.comingSoon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-zen-dots">{product.name}</h1>
              <p className="text-slate-600 dark:text-slate-400">{product.tagline}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-slate-700">
            <div className="max-w-2xl mx-auto">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full max-w-md mx-auto mb-8 rounded-lg"
              />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Coming Soon</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {product.description}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center text-slate-600 dark:text-slate-400">
                        <Zap className="w-4 h-4 text-teal-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button 
                  disabled
                  className="px-8 py-4 bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 font-semibold rounded-lg cursor-not-allowed"
                >
                  Notify When Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-zen-dots">{product.name}</h1>
            <p className="text-slate-600 dark:text-slate-400">{product.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Media */}
          <div className="space-y-6">
            {/* Main Media Display */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-slate-700">
              <div className="aspect-video bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden relative">
                {product.video && !isVideoPlaying ? (
                  <>
                    <img 
                      src={product.images[currentImageIndex]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-slate-900 ml-1" />
                      </div>
                    </button>
                  </>
                ) : product.video && isVideoPlaying ? (
                  <div className="relative w-full h-full">
                    <video
                      src={product.video}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted={isMuted}
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-1 aspect-video bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-teal-400'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-slate-600 dark:text-slate-400">(4.9/5 from 127 reviews)</span>
              </div>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center space-x-4 mb-6">
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-slate-900 dark:text-white">Key Features:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center text-slate-600 dark:text-slate-400">
                      <Zap className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
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

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 px-8 py-4 rounded-lg font-semibold hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    2-Year Warranty
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Free Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Advanced Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {product.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-slate-700 group hover:-translate-y-1">
                  <div className="aspect-video bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden mb-6 relative">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-slate-500 dark:text-slate-400">
                        <Zap className="w-3 h-3 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Cpu className="w-6 h-6 mr-3 text-teal-500" />
              Technical Specifications
            </h3>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-600">
                  <span className="font-medium text-slate-900 dark:text-white">{key}</span>
                  <span className="text-slate-600 dark:text-slate-400">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-teal-500" />
              What's Included
            </h3>
            <div className="space-y-3">
              {product.included.map((item, index) => (
                <div key={index} className="flex items-center text-slate-600 dark:text-slate-400">
                  <Zap className="w-4 h-4 text-teal-400 mr-3 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800/30 text-center">
                <div className="text-slate-900 dark:text-white font-medium">{useCase}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;