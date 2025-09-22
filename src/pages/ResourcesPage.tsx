import React from 'react';
import { Book, Video, Code, Download, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Documentation',
    icon: Book,
    items: [
      { title: 'Getting Started Guide', description: 'Complete setup and installation guide', link: '/guide#getting-started' },
      { title: 'API Reference', description: 'Comprehensive API documentation', link: '/guide#api-reference' },
      { title: 'Hardware Specifications', description: 'Detailed hardware documentation', link: '/guide#hardware-specs' }
    ]
  },
  {
    category: 'Video Tutorials',
    icon: Video,
    items: [
      { title: 'VisionSense Setup', description: '15-minute setup walkthrough', link: 'https://www.youtube.com/watch?v=5_t5bN0x3M8&list=PLvbwzjJul9fORlqJWk1TWKYXZxhpTpR7u' },
      { title: 'Fleet Integration', description: 'VisionConnect fleet deployment', link: 'https://www.youtube.com/watch?v=5_t5bN0x3M8&list=PLvbwzjJul9fORlqJWk1TWKYXZxhpTpR7u' },
      { title: 'AutoVision SDK', description: 'Using the open-source platform', link: 'https://www.youtube.com/watch?v=5_t5bN0x3M8&list=PLvbwzjJul9fORlqJWk1TWKYXZxhpTpR7u' }
    ]
  },
  {
    category: 'Code Examples',
    icon: Code,
    items: [
      { title: 'Python SDK', description: 'Python integration examples', link: 'https://github.com/connected-wise/VisionSense' },
      { title: 'ROS2 Packages', description: 'Ready-to-use ROS2 packages', link: 'https://github.com/connected-wise/VisionSense' },
      { title: 'C++ API', description: 'C++ development examples', link: 'https://github.com/connected-wise/VisionSense' }
    ]
  },
  {
    category: 'Downloads',
    icon: Download,
    items: [
      { title: 'AutoVision SDK', description: 'Latest SDK release v2.1.0', link: '/login' },
      { title: 'Firmware Updates', description: 'Latest firmware packages', link: '/login' },
      { title: 'Simulation Tools', description: 'Testing and simulation utilities', link: '/login' }
    ]
  }
];

const ResourcesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-dark-navy transition-colors duration-300 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Resources & Documentation</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
          Everything you need to get started with Vision2X, from setup guides to advanced development resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {resources.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <div key={categoryIndex} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
                  <IconComponent className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                   target={item.link.startsWith('http') ? '_blank' : '_self'}
                   rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors group"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">{item.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Developer Portal CTA */}
      <div className="mt-16 bg-slate-900 dark:bg-slate-800 text-white rounded-xl p-8 text-center transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-4 text-white">Join the Developer Community</h2>
        <p className="text-xl text-slate-300 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Connect with other developers, contribute to open-source projects, and get support from our engineering team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/connected-wise/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
          >
            <Code className="w-5 h-5 mr-2" />
            GitHub Repository
          </a>
          <a
            href="https://discord.gg/GBv5GMPD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-slate-600 dark:border-slate-500 text-white font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Community Forum
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;