import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Video, Code, ArrowRight } from 'lucide-react';

const resources = [
  {
    type: 'Documentation',
    title: 'Getting Started Guide',
    description: 'Complete setup and configuration documentation for all Vision2X products.',
    icon: Book,
    link: '/guide'
  },
  {
    type: 'Video Tutorial',
    title: 'Integration Walkthrough',
    description: 'Step-by-step video guide for integrating Vision2X into your workflow.',
    icon: Video,
    link: 'https://www.youtube.com/watch?v=5_t5bN0x3M8&list=PLvbwzjJul9fORlqJWk1TWKYXZxhpTpR7u'
  },
  {
    type: 'Open Source',
    title: 'AutoVision Platform',
    description: 'Access our complete open-source perception stack on GitHub.',
    icon: Code,
    link: '/resources/github'
  }
];

const ResourcesPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            Developer Resources
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
            Everything you need to get started with Vision2X, from documentation 
            to open-source code and community support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div 
                key={index}
                className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-2xl hover:shadow-teal-400/10 transition-all duration-500 hover:-translate-y-2 group border border-gray-200 dark:border-slate-700/50 hover:border-teal-400/30"
              >
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg text-white dark:text-slate-900 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed transition-colors duration-300">
                    {resource.description}
                  </p>
                  
                  <Link
                    to={resource.link}
                    target={resource.link.startsWith('http') ? '_blank' : '_self'}
                    rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors font-medium group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/resources"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
          >
            View All Resources
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;