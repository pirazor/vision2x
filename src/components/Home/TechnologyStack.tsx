import React from 'react';
import { Cpu, Zap, Shield, Code, Globe, Database } from 'lucide-react';

const technologies = [
  { name: 'NVIDIA Jetson', icon: Cpu, description: 'High-performance edge AI computing' },
  { name: 'TensorRT', icon: Zap, description: 'Optimized deep learning inference' },
  { name: 'ROS2', icon: Shield, description: 'Robot Operating System 2.0' },
  { name: 'AutoVision', icon: Code, description: 'Open-source perception stack' },
  { name: 'V2X Protocol', icon: Globe, description: 'Vehicle-to-everything communication' },
  { name: 'Edge Processing', icon: Database, description: 'Real-time local computation' }
];

const TechnologyStack = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-800 dark:via-dark-navy dark:to-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-400/20 dark:bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Built on Proven Technology
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
            Our perception systems leverage industry-leading hardware and software components 
            to deliver unmatched performance and reliability.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-400/10 transition-all duration-500 group border border-gray-200 dark:border-slate-700 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg text-white dark:text-slate-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {tech.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-slate-700 relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 dark:from-teal-400/5 to-emerald-500/10 dark:to-emerald-500/5"></div>
          <div className="text-center mb-8 relative">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
              Performance Benchmarks
            </h3>
            <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
              Real-world performance metrics from our production deployments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2 animate-pulse">30 FPS</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Processing Speed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2 animate-pulse delay-200">{"< 100ms"}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Detection Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 animate-pulse delay-500">99.9%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2 animate-pulse delay-700">5W</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Power Consumption</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;