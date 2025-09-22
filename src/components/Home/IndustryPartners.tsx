import React from 'react';

const partners = [
  { name: 'NVIDIA', logo: 'NV', image: '/nvidia-logo.png' },
  { name: 'CUTR', logo: 'CUTR', image: '/cutr.png' },
  { name: 'CARMA', logo: 'CARMA', image: '/carma.png' },
  { name: 'UW Madison', logo: 'UWM', image: '/uwm-logo.png' },
  { name: 'ADASTEC', logo: 'ADA', image: '/adastec.png' },
  { name: 'Brandmotion', logo: 'BM', image: '/brandmotion.png' }
];

const IndustryPartners = () => {
  return (
    <section className="py-16 bg-white dark:bg-dark-navy transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
            Trusted by Leading Organizations
          </h2>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
            Research institutions and companies worldwide rely on Vision2X
          </p>
        </div>

        {/* Mobile: Single partner display */}
        <div className="md:hidden relative overflow-hidden">
          <div className="flex animate-scroll-seamless-mobile" style={{ width: `${partners.length * 2 * 100}%` }}>
            {/* First set - mobile optimized */}
            {partners.map((partner, index) => (
              <div
                key={`mobile-set1-${index}`}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 h-32 flex-shrink-0 mx-2"
                style={{ width: `${100 / (partners.length * 2)}%` }}
              >
                <div className="relative h-24 w-full max-w-48">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="h-full w-full object-contain filter grayscale-[0.3] opacity-80 dark:opacity-70 contrast-90 dark:contrast-110"
                  />
                  {/* Enhanced theme filter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-slate-900/20 dark:from-white/15 dark:via-white/8 dark:to-white/15 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
            ))}
            {/* Second set - mobile optimized */}
            {partners.map((partner, index) => (
              <div
                key={`mobile-set2-${index}`}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 h-32 flex-shrink-0 mx-2"
                style={{ width: `${100 / (partners.length * 2)}%` }}
              >
                <div className="relative h-24 w-full max-w-48">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="h-full w-full object-contain filter grayscale-[0.3] opacity-80 dark:opacity-70 contrast-90 dark:contrast-110"
                  />
                  {/* Enhanced theme filter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-slate-900/20 dark:from-white/15 dark:via-white/8 dark:to-white/15 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: All partners display */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="flex animate-scroll-seamless" style={{ width: '200%' }}>
            {/* First set - desktop */}
            {partners.map((partner, index) => (
              <div
                key={`desktop-set1-${index}`}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 h-24 flex-shrink-0 mx-3"
                style={{ width: `${100 / (partners.length * 2)}%` }}
              >
                <div className="relative h-20 w-64">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="h-full w-full object-contain filter grayscale-[0.3] opacity-80 dark:opacity-70 contrast-90 dark:contrast-110"
                  />
                  {/* Enhanced theme filter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-slate-900/20 dark:from-white/15 dark:via-white/8 dark:to-white/15 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
            ))}
            {/* Second set - desktop */}
            {partners.map((partner, index) => (
              <div
                key={`desktop-set2-${index}`}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 h-24 flex-shrink-0 mx-3"
                style={{ width: `${100 / (partners.length * 2)}%` }}
              >
                <div className="relative h-20 w-64">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="h-full w-full object-contain filter grayscale-[0.3] opacity-80 dark:opacity-70 contrast-90 dark:contrast-110"
                  />
                  {/* Enhanced theme filter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-slate-900/20 dark:from-white/15 dark:via-white/8 dark:to-white/15 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryPartners;