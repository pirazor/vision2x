import React, { useState, useRef, useEffect } from 'react';
import { X, GraduationCap, Mail, Send, Building, User, FileText } from 'lucide-react';

const EducationalDiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    role: '',
    useCase: '',
    product: 'VisionSense™'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Refs to store timer IDs for cleanup
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetFormTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers on unmount or HMR
  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
      if (resetFormTimeoutRef.current) {
        clearTimeout(resetFormTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Validate educational email
    if (!formData.email.endsWith('.edu') && !formData.email.includes('edu')) {
      setSubmitMessage({ type: 'error', text: 'Please use your educational institution email address (.edu)' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission with proper timeout management
      await new Promise<void>((resolve) => {
        submitTimeoutRef.current = window.setTimeout(() => {
          resolve();
        }, 2000);
      });
      
      setSubmitMessage({ 
        type: 'success', 
        text: 'Application submitted successfully! We\'ll review your request and contact you within 2 business days.' 
      });
      
      // Reset form after successful submission
      resetFormTimeoutRef.current = window.setTimeout(() => {
        setShowForm(false);
        setFormData({
          fullName: '',
          email: '',
          institution: '',
          role: '',
          useCase: '',
          product: 'VisionSense™'
        });
        setSubmitMessage(null);
      }, 3000);
      
    } catch (_error) {
      setSubmitMessage({ type: 'error', text: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isVisible) return null;

  return (
    <>
      <div className="bg-slate-900 dark:bg-slate-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3 flex-1 justify-center">
              <div className="text-center">
                <span className="text-sm sm:text-base font-bold text-white">
                  Students & Educators Save Extra 10% on VisionSense™
                </span>
              </div>
              
              <button 
                onClick={() => setShowForm(true)}
                className="relative flex items-center bg-white/95 hover:bg-white rounded-full pl-2 pr-10 sm:px-6 py-1 sm:py-1.5 transition-all duration-300 text-xs sm:text-sm font-semibold text-slate-900 shadow-md hover:shadow-lg border border-white/30 backdrop-blur-sm group overflow-hidden hover:scale-105 whitespace-nowrap"
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full"></div>
                
                <GraduationCap className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 text-teal-500 group-hover:text-teal-600 transition-colors duration-300 flex-shrink-0 mr-0.5" />
                <span className="relative z-10 group-hover:text-slate-800 transition-colors duration-300">Apply Now</span>
              </button>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
             className="ml-2 p-1 hover:bg-slate-700 dark:hover:bg-slate-600 rounded-full transition-colors duration-200"
              aria-label="Close banner"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Educational Discount Application Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start sm:items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[calc(100vh-5rem)] sm:max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700 transition-colors duration-300 my-4 sm:my-0">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-4 sm:p-6 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Educational Discount Application</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Save 10% on VisionSense™</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {submitMessage && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitMessage.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                  } transition-colors duration-300`}
                >
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Educational Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300"
                        placeholder="your.name@university.edu"
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Must be a valid .edu email address</p>
                  </div>
                </div>

                {/* Institution Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Institution *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        required
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300"
                        placeholder="University or Institution Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
                    >
                      <option value="">Select your role</option>
                      <option value="undergraduate">Undergraduate Student</option>
                      <option value="graduate">Graduate Student</option>
                      <option value="phd">PhD Student</option>
                      <option value="postdoc">Postdoctoral Researcher</option>
                      <option value="faculty">Faculty Member</option>
                      <option value="researcher">Research Staff</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Product Selection */}
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Product Interest
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
                  >
                    <option value="VisionSense™">VisionSense™ - Research & Development</option>
                    <option value="VisionConnect™">VisionConnect™ - Fleet Management</option>
                    <option value="VisionRide™">VisionRide™ - Micromobility</option>
                    <option value="Multiple">Multiple Products</option>
                  </select>
                </div>

                {/* Use Case */}
                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Research/Educational Use Case *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <textarea
                      id="useCase"
                      name="useCase"
                      required
                      rows={4}
                      value={formData.useCase}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300 resize-none"
                      placeholder="Please describe your research project, course curriculum, or educational use case for Vision2X products. Include details about your autonomous vehicle research, computer vision studies, or related academic work."
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Minimum 50 characters required</p>
                </div>

                {/* Discount Information */}
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-teal-200 dark:border-teal-800/30">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">Educational Discount Benefits</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• 10% discount on VisionSense™ ($945 → $850.50)</li>
                    <li>• Free shipping and handling</li>
                    <li>• Extended 3-year warranty</li>
                    <li>• Priority technical support</li>
                    <li>• Access to educational resources and tutorials</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || formData.useCase.length < 50}
                    className="flex-1 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-teal-300 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-teal-400/25 flex items-center justify-center text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 sm:px-6 py-3 border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationalDiscountBanner;