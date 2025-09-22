import React, { useState } from 'react';
import { Book, Code, Cpu, ArrowLeft, ExternalLink, Download, Copy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuidePage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Handle URL hash to set active tab
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['getting-started', 'api-reference', 'hardware-specs'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.history.replaceState(null, '', `#${tabId}`);
  };
  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const tabs = [
    {
      id: 'getting-started',
      name: 'Getting Started Guide',
      icon: Book,
    },
    {
      id: 'api-reference',
      name: 'API Reference',
      icon: Code,
    },
    {
      id: 'hardware-specs',
      name: 'Hardware Specifications',
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/resources"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                Documentation Guide
              </h1>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Complete documentation for Vision2X products
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2 sticky top-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700/50 overflow-hidden transition-colors duration-300">
              
              {/* Getting Started Guide */}
              {activeTab === 'getting-started' && (
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Book className="w-6 h-6 text-teal-500" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Getting Started Guide</h2>
                  </div>

                  <div className="space-y-8">
                    {/* Quick Start */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quick Start</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Prerequisites</h4>
                          <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
                            <li>• Ubuntu 20.04 LTS or later</li>
                            <li>• ROS2 Humble or Foxy</li>
                            <li>• Python 3.8 or later</li>
                            <li>• CUDA 11.4 or later (for GPU acceleration)</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Installation */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Installation</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">1. Install AutoVision SDK</h4>
                          <div className="relative">
                            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{`curl -sSL https://install.vision2x.com | bash
source ~/.bashrc
vision2x --version`}</code>
                            </pre>
                            <button
                              onClick={() => handleCopyCode(`curl -sSL https://install.vision2x.com | bash\nsource ~/.bashrc\nvision2x --version`, 'install-sdk')}
                              className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              {copiedCode === 'install-sdk' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">2. Setup ROS2 Environment</h4>
                          <div className="relative">
                            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{`# Create workspace
mkdir -p ~/vision2x_ws/src
cd ~/vision2x_ws

# Clone Vision2X packages
git clone https://github.com/vision2x/autovision_ros2.git src/autovision
colcon build --packages-select autovision_core

# Source the workspace
source install/setup.bash`}</code>
                            </pre>
                            <button
                              onClick={() => handleCopyCode(`mkdir -p ~/vision2x_ws/src\ncd ~/vision2x_ws\ngit clone https://github.com/vision2x/autovision_ros2.git src/autovision\ncolcon build --packages-select autovision_core\nsource install/setup.bash`, 'setup-ros')}
                              className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              {copiedCode === 'setup-ros' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* First Steps */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">First Steps</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Hardware Setup</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Connect your VisionSense hardware and verify connections.</p>
                          <a href="#hardware-setup" className="text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline">
                            View Hardware Guide →
                          </a>
                        </div>
                        <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Run Demo</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Test your setup with the included demo applications.</p>
                          <a href="#demo" className="text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline">
                            Launch Demo →
                          </a>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {/* API Reference */}
              {activeTab === 'api-reference' && (
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Code className="w-6 h-6 text-teal-500" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Reference</h2>
                  </div>

                  <div className="space-y-8">
                    {/* Python API */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Python API</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">VisionSense Class</h4>
                          <div className="relative">
                            <pre className="bg-slate-900 text-blue-300 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{`from autovision import VisionSense

# Initialize VisionSense
vision = VisionSense(
    stereo_camera=True,
    mono_camera=True,
    ai_models=['detection', 'segmentation']
)

# Start perception pipeline
vision.start()

# Get latest detections
detections = vision.get_detections()
for detection in detections:
    print(f"Object: {detection.class_name}, Confidence: {detection.confidence}")

# Stop pipeline
vision.stop()`}</code>
                            </pre>
                            <button
                              onClick={() => handleCopyCode(`from autovision import VisionSense\n\n# Initialize VisionSense\nvision = VisionSense(\n    stereo_camera=True,\n    mono_camera=True,\n    ai_models=['detection', 'segmentation']\n)\n\n# Start perception pipeline\nvision.start()\n\n# Get latest detections\ndetections = vision.get_detections()\nfor detection in detections:\n    print(f"Object: {detection.class_name}, Confidence: {detection.confidence}")\n\n# Stop pipeline\nvision.stop()`, 'python-basic')}
                              className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              {copiedCode === 'python-basic' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                          <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Methods</h5>
                          <div className="space-y-2 text-sm">
                            <div><code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded">start()</code> - Initialize and start the perception pipeline</div>
                            <div><code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded">stop()</code> - Stop the perception pipeline and cleanup resources</div>
                            <div><code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded">get_detections()</code> - Get latest object detections</div>
                            <div><code className="bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded">get_lanes()</code> - Get latest lane detection results</div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* ROS2 API */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">ROS2 Topics & Services</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Published Topics</h4>
                            <div className="space-y-2 text-sm">
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/detections</code></div>
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/lanes</code></div>
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/depth</code></div>
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/image_raw</code></div>
                            </div>
                          </div>
                          <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Services</h4>
                            <div className="space-y-2 text-sm">
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/start</code></div>
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/stop</code></div>
                              <div><code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">/vision/configure</code></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* C++ API */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">C++ API</h3>
                      <div className="relative">
                        <pre className="bg-slate-900 text-purple-300 p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{`#include <autovision/vision_sense.hpp>

int main() {
    // Initialize VisionSense
    autovision::VisionSense vision;
    vision.configure({
        .stereo_enabled = true,
        .mono_enabled = true,
        .models = {"detection", "segmentation"}
    });

    // Start pipeline
    vision.start();

    // Process frames
    while (vision.is_running()) {
        auto detections = vision.getDetections();
        for (const auto& det : detections) {
            std::cout << "Detected: " << det.class_name 
                      << " (" << det.confidence << ")" << std::endl;
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(33));
    }

    return 0;
}`}</code>
                        </pre>
                        <button
                          onClick={() => handleCopyCode(`#include <autovision/vision_sense.hpp>\n\nint main() {\n    // Initialize VisionSense\n    autovision::VisionSense vision;\n    vision.configure({\n        .stereo_enabled = true,\n        .mono_enabled = true,\n        .models = {"detection", "segmentation"}\n    });\n\n    // Start pipeline\n    vision.start();\n\n    // Process frames\n    while (vision.is_running()) {\n        auto detections = vision.getDetections();\n        for (const auto& det : detections) {\n            std::cout << "Detected: " << det.class_name \n                      << " (" << det.confidence << ")" << std::endl;\n        }\n        std::this_thread::sleep_for(std::chrono::milliseconds(33));\n    }\n\n    return 0;\n}`, 'cpp-basic')}
                          className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          {copiedCode === 'cpp-basic' ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {/* Hardware Specifications */}
              {activeTab === 'hardware-specs' && (
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Cpu className="w-6 h-6 text-teal-500" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hardware Specifications</h2>
                  </div>

                  <div className="space-y-8">
                    {/* VisionSense Specs */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">VisionSense™ Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Compute Platform</h4>
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Processor</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">NVIDIA Jetson Orin Nano 8GB</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">AI Performance</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">40 TOPS (INT8)</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">CPU</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">6-core Arm Cortex-A78AE</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">GPU</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">1024-core NVIDIA Ampere</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Memory</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">8GB 128-bit LPDDR5</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Storage & Connectivity</h4>
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Storage</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">64GB eUFS + microSD</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Camera Interface</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">MIPI CSI-2 (4 lanes)</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">USB</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">3x USB 3.2, 1x USB-C</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Ethernet</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">Gigabit Ethernet</dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Camera Specifications</h4>
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Stereo Resolution</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">1920x1080 @ 60fps</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Mono Resolution</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">3840x2160 @ 30fps</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Field of View</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">120° (stereo), 95° (mono)</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Depth Range</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">0.3m - 50m</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Physical & Power</h4>
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Dimensions</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">103 x 90 x 31 mm</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Weight</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">398g</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Power Consumption</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">5W - 15W</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">Operating Temp</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">-25°C to 80°C</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-slate-600 dark:text-slate-400">IP Rating</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">IP65</dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Performance Benchmarks */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Performance Benchmarks</h3>
                      <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-slate-600/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                          <div>
                            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">30 FPS</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Processing Speed</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{"< 100ms"}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Detection Latency</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">99.9%</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy Rate</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">5W</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Typical Power</div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Compatibility Matrix */}
                    <section>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Software Compatibility</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 dark:border-slate-600 rounded-lg">
                          <thead className="bg-gray-50 dark:bg-slate-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Component</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Version</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">Ubuntu</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">20.04 LTS, 22.04 LTS</td>
                              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Supported</span></td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">ROS2</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">Humble, Iron, Jazzy</td>
                              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Supported</span></td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">CUDA</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">11.4, 12.0</td>
                              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Supported</span></td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">TensorRT</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">8.5, 8.6</td>
                              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Supported</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-slate-900 dark:bg-slate-800 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Check out our community forum or contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/support"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-lg hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25"
            >
              Get Support
            </Link>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Community Forum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;