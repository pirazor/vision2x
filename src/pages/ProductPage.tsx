import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, CreditCard, Heart, Share2, Check, Truck, Play, ShoppingCart, Circle, SignpostBig } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';

// Enhanced product data with AI capabilities and media
const productData = {
  visionsense: {
    id: 'visionsense',
    name: 'VisionSense',
    //tagline: 'Research & Development Platform',
    tagline: 'ADS/ADAS Researchers, Robotics Labs, Fleet Managers',
    description: 'Advanced perception system for autonomous vehicle research with stereo cameras and pre-trained AI models. Built on NVIDIA Jetson Orin Nano with comprehensive AutoVision software stack.',
    price: 945,
    originalPrice: 1249,
    rating: 4.8,
    reviews: 127,
    available: true,
    priceId: 'price_1RqnQSR7emstJdgzE2t9Ujgf',
    mode: 'payment' as const,
    image: '/VisionSense.png',
    media: [
      { type: 'image', src: 'https://connectedwise.store/vision2.com/media/VisionSense.png', alt: 'VisionSense Hardware' },
      { type: 'image', src: 'https://connectedwise.store/vision2.com/media/VisionSense2.png', alt: 'VisionSense Installation' },
      { type: 'image', src: 'https://connectedwise.store/vision2.com/media/visionsense3.jpg', alt: 'VisionSense Hardware' },
      { type: 'image', src: 'https://connectedwise.store/vision2.com/media/visionsense4.jpg', alt: 'VisionSense Hardware' },
      { type: 'video', src: 'https://connectedwise.store/vision2.com/media/visionsense-narrow.webm', alt: 'VisionSense Demo Video', thumbnail: 'https://connectedwise.store/vision2.com/media/VisionSense.png' },
      { type: 'video', src: 'https://connectedwise.store/vision2.com/media/autovision-cut.webm', alt: 'AutoVision Platform', thumbnail: 'https://connectedwise.store/vision2.com/media/autovision.png' },
      { type: 'video', src: 'https://connectedwise.store/vision2.com/media/daylight-demo.webm', alt: 'VisionSense in Action', thumbnail: 'https://connectedwise.store/vision2.com/media/object-detect.png' }
    ],
    features: [
      'NVIDIA Jetson Orin Nano (8GB)',
      'Stereo Camera Module (1080p@60fps)',
      'Mono Camera Module (4K@30fps)', 
      'AutoVision Software Stack',
      'ROS2 Native Integration',
      'TensorRT Optimized Models',
      'Open-source Platform',
      '2-Year Warranty Included'
    ],
    aiCapabilities: [
      {
        name: 'Lane Detection & Segmentation',
        description: 'Real-time lane boundary detection and drivable area segmentation using advanced computer vision algorithms.',
        icon: '🛣️',
        accuracy: '98.5%',
        latency: '<50ms'
      },
      {
        name: 'Object Detection & Tracking',
        description: 'Multi-object detection and tracking for vehicles, pedestrians, cyclists, and other road users.',
        icon: '🚗',
        accuracy: 'YOLOv13 SOTA',
        latency: '10 Classes'
      },
      {
        name: 'Traffic Sign & Light Recognition',
        description: 'Comprehensive traffic sign detection and classification including speed limits, stop signs, and regulatory signs, plus real-time traffic light state detection for intersection navigation.',
        icon: '🚦',
        accuracy: '98.5%',
        latency: '<50ms'
      },
      {
        name: 'ADAS Platform & ROS Integration',
        description: 'Stereo vision-based depth estimation for 3D scene understanding and obstacle avoidance, with native ROS2 nodes and packages for seamless integration with robotics workflows and autonomous systems.',
        icon: '🤖',
        accuracy: 'Open-source',
        latency: 'Real-time'
      }
    ],
    specifications: {
      'Compute Platform': 'NVIDIA Jetson Orin Nano 8GB',
      'AI Performance': '40 TOPS (INT8)',
      'CPU': '6-core Arm Cortex-A78AE',
      'GPU': '1024-core NVIDIA Ampere GPU',
      'Memory': '8GB 128-bit LPDDR5',
      'Storage': '64GB eUFS + microSD slot',
      'Camera Interface': 'MIPI CSI-2 (4 lanes)',
      'Stereo Resolution': '1920x1080 @ 60fps',
      'Mono Resolution': '3840x2160 @ 30fps',
      'Operating System': 'Ubuntu 20.04 LTS',
      'Power Consumption': '5W - 15W',
      'Operating Temperature': '-25°C to 80°C',
      'Dimensions': '103mm x 90mm x 31mm',
      'Weight': '398g'
    }
  },
  visionride: {
    id: 'visionride',
    name: 'VisionRide',
    tagline: 'Micromobility Safety Platform',
    description: 'Advanced safety and navigation system for e-bikes, scooters, and personal mobility devices. Real-time hazard detection, smart routing, and rider assistance for urban micromobility.',
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviews: 0,
    available: false,
    priceId: '',
    mode: 'payment' as const,
    image: '/VisionRide.png',
    media: [
      { type: 'image', src: '/VisionRide.png', alt: 'VisionRide Platform' }
    ],
    features: [
      'Real-time Collision Detection',
      'Smart Route Optimization',
      'Blind Spot Monitoring',
      'Emergency Alert System',
      'Mobile App Integration',
      'Weather-adaptive Routing',
      'Traffic Pattern Learning',
      'Battery Life Optimization',
      'Route Optimization Engine',
      'Predictive Maintenance',
      'Performance Analytics',
      'Remote Diagnostics',
      'Multi-vehicle Coordination',
      'Cloud-based Architecture',
      'Enterprise Security'
    ],
    aiCapabilities: [
      {
        name: 'Collision Avoidance',
        description: 'Real-time detection and prediction of potential collisions with vehicles, pedestrians, and obstacles using computer vision.',
        icon: '🚨',
        accuracy: '99.2%',
        latency: '<30ms'
      },
      {
        name: 'Smart Navigation',
        description: 'AI-powered route planning optimized for micromobility, considering bike lanes, traffic patterns, and safety zones.',
        icon: '🗺️',
        accuracy: 'Real-time',
        latency: '<2s'
      },
      {
        name: 'Hazard Detection',
        description: 'Advanced computer vision system that identifies road hazards, potholes, debris, and unsafe conditions.',
        icon: '⚠️',
        accuracy: '97.5%',
        latency: '<50ms'
      },
      {
        name: 'Rider Behavior Analysis',
        description: 'Machine learning algorithms that adapt to individual riding patterns and provide personalized safety recommendations.',
        icon: '👤',
        accuracy: 'Adaptive',
        latency: 'Real-time'
      },
      {
        name: 'Environmental Awareness',
        description: 'Weather and lighting condition detection with automatic adjustment of safety parameters and route suggestions.',
        icon: '🌦️',
        accuracy: '96.8%',
        latency: '<100ms'
      },
      {
        name: 'Emergency Response',
        description: 'Automatic crash detection with emergency contact notification and GPS location sharing.',
        icon: '🚑',
        accuracy: '99.7%',
        latency: 'Real-time'
      }
    ],
    specifications: {
      'Compute Platform': 'ARM Cortex-A78 Processor',
      'AI Performance': '8 TOPS (INT8)',
      'Memory': '4GB LPDDR4X',
      'Storage': '32GB eMMC + microSD slot',
      'Camera': '1080p@60fps Wide-angle',
      'Sensors': 'IMU, GPS, Magnetometer, Barometer',
      'Connectivity': '4G LTE, Wi-Fi 6, Bluetooth 5.2',
      'Battery Life': '12+ hours continuous use',
      'Operating System': 'Android Things / Linux',
      'Power Consumption': '3W - 8W',
      'Operating Temperature': '-20°C to 70°C',
      'Water Resistance': 'IP67 rated',
      'Dimensions': '95mm x 65mm x 22mm',
      'Weight': '180g',
      'Mounting': 'Universal handlebar mount'
    }
  },
  visionconnect: {
    id: 'visionconnect',
    name: 'VisionConnect',
    tagline: 'Fleet Management Platform',
    description: 'Advanced safety and navigation system for e-bikes, scooters, and personal mobility devices. Real-time hazard detection, smart routing, and rider assistance for urban micromobility.',
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviews: 0,
    available: false,
    priceId: '',
    mode: 'payment' as const,
    image: '/VisionConnect.png',
    media: [
      { type: 'image', src: 'https://connectedwise.store/vision2.com/media/VisionConnect.png', alt: 'VisionConnect Platform' }
    ],
    features: [
      'Real-time Collision Detection',
      'Smart Route Optimization',
      'Blind Spot Monitoring',
      'Emergency Alert System',
      'Mobile App Integration',
      'Weather-adaptive Routing',
      'Traffic Pattern Learning',
      'Battery Life Optimization',
      'Route Optimization Engine',
      'Predictive Maintenance',
      'Performance Analytics',
      'Remote Diagnostics',
      'Multi-vehicle Coordination',
      'Cloud-based Architecture',
      'Enterprise Security'
    ],
    aiCapabilities: [
      {
        name: 'Collision Avoidance',
        description: 'Real-time detection and prediction of potential collisions with vehicles, pedestrians, and obstacles using computer vision.',
        icon: '🚨',
        accuracy: '99.2%',
        latency: '<30ms'
      },
      {
        name: 'Smart Navigation',
        description: 'AI-powered route planning optimized for micromobility, considering bike lanes, traffic patterns, and safety zones.',
        icon: '🗺️',
        accuracy: 'Real-time',
        latency: '<2s'
      },
      {
        name: 'Hazard Detection',
        description: 'Advanced computer vision system that identifies road hazards, potholes, debris, and unsafe conditions.',
        icon: '⚠️',
        accuracy: '97.5%',
        latency: '<50ms'
      },
      {
        name: 'Rider Behavior Analysis',
        description: 'Machine learning algorithms that adapt to individual riding patterns and provide personalized safety recommendations.',
        icon: '👤',
        accuracy: 'Adaptive',
        latency: 'Real-time'
      },
      {
        name: 'Environmental Awareness',
        description: 'Weather and lighting condition detection with automatic adjustment of safety parameters and route suggestions.',
        icon: '🌦️',
        accuracy: '96.8%',
        latency: '<100ms'
      },
      {
        name: 'Emergency Response',
        description: 'Automatic crash detection with emergency contact notification and GPS location sharing.',
        icon: '🚑',
        accuracy: '99.7%',
        latency: 'Real-time'
      }
    ],
    specifications: {
      'Compute Platform': 'ARM Cortex-A78 Processor',
      'AI Performance': '8 TOPS (INT8)',
      'Memory': '4GB LPDDR4X',
      'Storage': '32GB eMMC + microSD slot',
      'Camera': '1080p@60fps Wide-angle',
      'Sensors': 'IMU, GPS, Magnetometer, Barometer',
      'Connectivity': '4G LTE, Wi-Fi 6, Bluetooth 5.2',
      'Battery Life': '12+ hours continuous use',
      'Operating System': 'Android Things / Linux',
      'Power Consumption': '3W - 8W',
      'Operating Temperature': '-20°C to 70°C',
      'Water Resistance': 'IP67 rated',
      'Dimensions': '95mm x 65mm x 22mm',
      'Weight': '180g',
      'Mounting': 'Universal handlebar mount'
    }
  }
};

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState('features');
  const [activeMedia, setActiveMedia] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [cameraConfig, setCameraConfig] = useState('standard');
  const [aiProcessor, setAiProcessor] = useState('orin-nano');
  const [addingToCart, setAddingToCart] = useState(false);

  const product = productData[productId as keyof typeof productData];
  const mediaItems = product?.media ?? [];
  const primaryMedia = mediaItems.slice(0, 5);
  const overflowMedia = mediaItems.slice(5);
  const activeMediaItem = mediaItems[activeMedia] ?? mediaItems[0];

  const renderMediaThumbnails = (items: typeof mediaItems, offset = 0) =>
    items.map((media, index) => {
      const itemIndex = offset + index;
      return (
        <button
          key={`${media.src}-${itemIndex}`}
          onClick={() => setActiveMedia(itemIndex)}
          className={`relative w-full h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
            activeMedia === itemIndex
              ? 'border-teal-400 shadow-lg'
              : 'border-gray-200 dark:border-slate-600 hover:border-teal-300'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={media.type === 'video' ? media.thumbnail : media.src}
              alt={media.alt}
              className="w-full h-full object-cover"
            />
            {media.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 rounded-full p-1">
                  <Play className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            <div className="absolute top-1 right-1 text-xs">
              {media.type === 'image' ? '📷' : '🎥'}
            </div>
          </div>
        </button>
      );
    });

  // Load favorite status on component mount
  React.useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem('vision2x-favorites') || '[]');
      setIsFavorited(favorites.includes(product.id));
    }
  }, [product?.id]);

  // Get dynamic product description based on camera configuration
  const getProductDescription = () => {
    if (product?.id === 'visionsense') {
      if (cameraConfig === 'standard') {
        return 'Advanced perception system with 3 front-facing cameras, IMU and GNSS sensors, ideal for road data collection or infrastructure inspection.';
      } else {
        return 'Advanced perception system with 2 front stereo cameras and 1 rear camera for driver monitoring, ideal for ADAS applications and autonomous driving.';
      }
    }
    return product?.description || '';
  };

  // Get dynamic pricing based on AI processor selection
  const getDynamicPricing = () => {
    if (product?.id === 'visionsense') {
      switch (aiProcessor) {
        case 'orin-nano':
          return { price: 795, originalPrice: 999 };
        case 'orin-nx-super':
          return { price: 945, originalPrice: 1249 };
        case 'orin-nx-16gb':
          return { price: 1095, originalPrice: 1499 };
        default:
          return { price: product.price, originalPrice: product.originalPrice };
      }
    }
    return { price: product?.price || 0, originalPrice: product?.originalPrice || 0 };
  };

  const dynamicPricing = getDynamicPricing();

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddingToCart(true);
    addItem({
      id: product.id,
      name: product.name,
      price: dynamicPricing.price,
      originalPrice: dynamicPricing.originalPrice,
      image: product.image,
      priceId: product.priceId,
      mode: product.mode
    });
    
    // Navigate to cart page after 1 second
    setTimeout(() => {
      navigate('/cart');
      setAddingToCart(false);
    }, 1000);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    
    // Store in localStorage for persistence
    const favorites = JSON.parse(localStorage.getItem('vision2x-favorites') || '[]');
    
    if (!isFavorited) {
      // Add to favorites
      if (!favorites.includes(product.id)) {
        favorites.push(product.id);
        localStorage.setItem('vision2x-favorites', JSON.stringify(favorites));
      }
    } else {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id: string) => id !== product.id);
      localStorage.setItem('vision2x-favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${product.name}™ - Vision2X`,
      text: product.description,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here to inform the user
        alert('Product link copied to clipboard!');
      }
    } catch (error) {
      // Handle expected browser behaviors (user cancellation or permission denied)
      if (error instanceof DOMException && (error.name === 'AbortError' || error.name === 'NotAllowedError')) {
        console.info('Share operation cancelled or not allowed by browser:', error.name);
      } else {
        console.error('Error sharing:', error);
      }
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        alert('Unable to share. Please copy the URL manually.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Enhanced Media Gallery */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700/50 transition-colors duration-300 flex-1 flex flex-col">
              {/* Main Media Display */}
              <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-xl mb-6 overflow-hidden relative">
                {activeMediaItem && activeMediaItem.type === 'image' ? (
                  <img
                    src={activeMediaItem.src}
                    alt={activeMediaItem.alt}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                ) : activeMediaItem ? (
                  <div className="relative w-full h-full">
                    <video
                      src={activeMediaItem.src}
                      className="w-full h-full object-contain"
                      controls
                      poster={activeMediaItem.thumbnail}
                     ref={(videoRef) => {
                       if (videoRef) {
                         videoRef.volume = 0.1; // Set volume to 10%
                       }
                     }}
                      onPlay={(e) => {
                        const playIcon = e.currentTarget.nextElementSibling as HTMLElement;
                        if (playIcon) {
                          playIcon.style.display = 'none';
                        }
                      }}
                      onPause={(e) => {
                        const playIcon = e.currentTarget.nextElementSibling as HTMLElement;
                        if (playIcon) {
                          playIcon.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/50 rounded-full p-4">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Media Thumbnails */}
              <div
                className={`grid gap-4 ${
                  overflowMedia.length
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                }`}
              >
                {renderMediaThumbnails(primaryMedia)}
              </div>
              {overflowMedia.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                  {renderMediaThumbnails(overflowMedia, primaryMedia.length)}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700/50 flex-1 flex flex-col justify-between">
              <h1 className="text-3xl font-zen-dots text-slate-900 dark:text-white mb-2 transition-colors duration-300">{product.name}™</h1>
              <p className="text-lg text-teal-600 dark:text-teal-400 mb-4 transition-colors duration-300">{product.tagline}</p>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 transition-colors duration-300">{getProductDescription()}</p>

              {/* Configuration Options */}
              {product.id === 'visionsense' && product.available && (
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800/50 mb-6 transition-colors duration-300">
                  {/* Configuration Section */}
                  <div className="space-y-6 mb-8">
                    {/* Camera Configuration */}
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-slate-700 rounded-lg p-4 text-center border border-gray-200 dark:border-slate-600">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-xs">🏗️</span>
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">Modular</div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">Architecture</div>
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded-lg p-4 text-center border border-gray-200 dark:border-slate-600">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-xs">⚡</span>
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">High</div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">Performance</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Introductory Offer - Only 19 Left</p>
                  </div>
                </div>
              )}

              {/* Pricing for unavailable products */}
              {!product.available && (
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-6 mb-6 border-2 border-dashed border-slate-300 dark:border-slate-600 transition-colors duration-300">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-2 transition-colors duration-300">
                      Coming Soon
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">This product is currently in development</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  {product.available ? (
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.available || addingToCart}
                      className="flex-1 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 pl-2 pr-4 sm:px-8 py-4 rounded-xl font-semibold hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-teal-400/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {addingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-1.5" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 px-8 py-4 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center transition-colors duration-300"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Coming Soon
                    </button>
                  )}
                  
                  <button 
                    onClick={handleToggleFavorite}
                    className={`p-4 border rounded-xl transition-all duration-300 ${
                      isFavorited 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                        : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                    title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-5 h-5 transition-colors duration-300 ${
                      isFavorited 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`} />
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="p-4 border border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-300"
                    title="Share this product"
                  >
                    <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
                {/* Shipping Info */}
                {product.available && (
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    <Truck className="w-4 h-4 text-green-500" />
                    <span>Free shipping included • 2-year warranty</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features and Specifications Tabs */}
        <div className="mt-16 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700/50 overflow-hidden transition-colors duration-300">
          <div className="border-b border-gray-200 dark:border-slate-600">
            <nav className="flex">
              <button 
                onClick={() => setActiveTab('features')}
                className={`py-4 px-8 font-medium transition-colors ${
                  activeTab === 'features' 
                    ? 'border-b-2 border-teal-400 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-8 font-medium transition-colors ${
                  activeTab === 'specifications' 
                    ? 'border-b-2 border-teal-400 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Specifications
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'features' && (
              <div className="space-y-8">

                {/* AI Capabilities Section */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 transition-colors duration-300">AI Perception Capabilities</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-300">
                    VisionSense™ leverages state-of-the-art deep learning models for comprehensive scene understanding and autonomous driving perception tasks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.aiCapabilities?.map((capability, index) => (
                    <div key={index} className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-slate-600/50 hover:border-teal-400/30 transition-all duration-300 group">
                      {/* Icon and Title Row */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm flex items-center justify-center flex-shrink-0">
                          {typeof capability.icon === 'string' ? (
                            <div className="text-xl">{capability.icon}</div>
                          ) : (
                            capability.icon
                          )}
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                          {capability.name}
                        </h4>
                      </div>
                      
                      {/* Description Text - Full Width */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed transition-colors duration-300">
                        {capability.description}
                      </p>
                      
                      <div>
                          {capability.name === 'Object Detection & Tracking' && (
                            <div className="space-y-4">
                              {/* Object Detection Image */}
                              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600">
                                <img 
                                  src="https://connectedwise.store/vision2.com/media/object-detect.png" 
                                  alt="Object Detection Visualization"
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <h5 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white" style={{ lineHeight: '1.65' }}>YOLOv13 SOTA Model</h5>
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto">
                                  10 Object Classes
                                </span>
                              </div>
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                Trained on 135k real-world images from urban and rural environments
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-2 border border-blue-200 dark:border-blue-800/40">
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">54%</div>
                                    <div className="text-xs font-medium text-blue-700 dark:text-blue-300">Nano</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400">mAP@50</div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-2 border border-purple-200 dark:border-purple-800/40">
                                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">65%</div>
                                    <div className="text-xs font-medium text-purple-700 dark:text-purple-300">Small</div>
                                    <div className="text-xs text-purple-600 dark:text-purple-400">mAP@50</div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-2 border border-green-200 dark:border-green-800/40">
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">71%</div>
                                    <div className="text-xs font-medium text-green-700 dark:text-green-300">Medium</div>
                                    <div className="text-xs text-green-600 dark:text-green-400">mAP@50</div>
                                  </div>
                                </div>
                              </div>

                              {/* Detection Classes */}
                              <div>
                                <div className="flex flex-wrap gap-2">
                                  {['Pedestrians', 'Cyclists', 'Cars', 'Pickups', 'Trucks', 'Vans', 'Buses', 'Trains', 'Traffic Signs', 'Traffic Lights'].map((className, idx) => (
                                    <span key={idx} className="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                                      {className}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Tracking Technology */}
                              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  <h5 className="text-sm font-semibold text-orange-800 dark:text-orange-300">Multi-Object Tracking</h5>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  BoT-SORT tracker for robust object tracking across frames with state-of-the-art accuracy
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {capability.name === 'ADAS Platform & ROS Integration' && (
                            <div className="space-y-4">
                              {/* AutoVision Platform Image */}
                              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600">
                                <img 
                                  src="https://connectedwise.store/vision2.com/media/autovision.png" 
                                  alt="AutoVision 3D ADAS Platform"
                                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <h5 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white" style={{ lineHeight: '1.65' }}>AutoVision Platform</h5>
                                <div className="flex space-x-2">
                                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                    Open Source
                                  </span>
                                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                    ROS2 Native
                                  </span>
                                </div>
                              </div>
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                Complete ADAS development environment with 3D visualization tools and native ROS2 integration for advanced autonomous vehicle research and development.
                              </div>
                              
                              {/* Platform Components */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800/30">
                                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">🏗️</div>
                                    <div className="text-xs font-medium text-purple-700 dark:text-purple-300">Modular</div>
                                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Architecture</div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800/30">
                                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-1">🚀</div>
                                    <div className="text-xs font-medium text-orange-700 dark:text-orange-300">High</div>
                                    <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Performance</div>
                                  </div>
                                </div>
                              </div>

                              {/* Platform Features */}
                              <ul className="text-slate-600 dark:text-slate-400 text-xs space-y-1">
                                <li>• Native ROS2 support (Humble and Iron)</li>
                                <li>• 3D visualization and debugging interface</li>
                                <li>• Advanced sensor fusion algorithms</li>
                                <li>• Real-time data logging and replay</li>
                                <li>• Modular perception pipeline architecture</li>
                                <li>• Custom ADAS application development framework</li>
                                <li>• Stereo vision-based depth estimation</li>
                                <li>• Seamless robotics workflow integration</li>
                                <li>• Professional development tools and APIs</li>
                                <li>• Multi-threading and GPU acceleration support</li>
                              </ul>

                              {/* GitHub Repository */}
                              <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/10 dark:to-gray-900/10 rounded-xl p-4 border border-slate-200 dark:border-slate-800/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                  <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-300">GitHub Repository</h5>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  Complete source code available on GitHub with comprehensive documentation and examples
                                </p>
                              </div>
                            </div>
                          )}
                          {capability.name === 'Lane Detection & Segmentation' && (
                            <div className="space-y-4">
                              {/* Lane Detection Image */}
                              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600">
                                <img 
                                  src="https://connectedwise.store/vision2.com/media/lane-detection.png" 
                                  alt="Lane Detection Visualization"
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <h5 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white" style={{ lineHeight: '1.65' }}>CLRerNet SOTA Model</h5>
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto">
                                  Multilane Detection
                                </span>
                              </div>
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                Pretrained CLRerNet optimized for TensorRT achieving state-of-the-art performance on CULane benchmark
                              </div>
                              
                              {/* Performance Metrics */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800/30">
                                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">81.5%</div>
                                    <div className="text-xs font-medium text-blue-700 dark:text-blue-300">CULane</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">F1 Score</div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 border border-green-200 dark:border-green-800/30">
                                    <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">95%</div>
                                    <div className="text-xs font-medium text-green-700 dark:text-green-300">TuSimple</div>
                                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">F1 Score</div>
                                  </div>
                                </div>
                              </div>

                              {/* Detection Capabilities */}
                              <div>
                                <div className="flex flex-wrap gap-2">
                                  <span className="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                                    High Inference Speed
                                  </span>
                                  <span className="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                                    Curve Lanes
                                  </span>
                                  <span className="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                                    DLA-34 Backbone
                                  </span>
                                </div>
                              </div>

                              {/* TensorRT Optimization */}
                              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  <h5 className="text-sm font-semibold text-orange-800 dark:text-orange-300">TensorRT Acceleration</h5>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  Optimized for NVIDIA hardware with significant performance improvements over baseline models
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Model Information */}
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-xl p-6 border border-teal-200 dark:border-teal-800/30 transition-colors duration-300">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Pre-trained AI Models Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-slate-700 dark:text-slate-300 mb-1">Detection Models</div>
                      <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• YOLOv8 (Optimized)</li>
                        <li>• EfficientDet</li>
                        <li>• RetinaNet</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-slate-700 dark:text-slate-300 mb-1">Segmentation Models</div>
                      <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• DeepLabV3+</li>
                        <li>• U-Net (Lane Detection)</li>
                        <li>• Mask R-CNN</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-slate-700 dark:text-slate-300 mb-1">Depth Estimation</div>
                      <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• MonoDepth2</li>
                        <li>• Stereo R-CNN</li>
                        <li>• DPT (Dense Prediction)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Technical Specifications</h3>
                  <dl className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100 dark:border-slate-600 transition-colors duration-300">
                        <dt className="font-medium text-slate-600 dark:text-slate-400">{key}</dt>
                        <dd className="text-slate-900 dark:text-white font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-slate-600/50 transition-colors duration-300">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Performance Metrics</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Processing Speed</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">30 FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Detection Latency</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{"< 100ms"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Accuracy Rate</span>
                      <span className="font-bold text-green-600 dark:text-green-400">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Power Efficiency</span>
                      <span className="font-bold text-orange-600 dark:text-orange-400">5W Typical</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;