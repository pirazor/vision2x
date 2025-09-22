import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Search, ChevronDown, ChevronUp, HelpCircle, Clock, Users, X, Send, Paperclip, Smile, User } from 'lucide-react';

const faqs = [
  {
    question: 'What hardware is included with VisionSense?',
    answer: 'VisionSense includes the Jetson Orin Nano development board, stereo camera module, mono camera, all necessary cables, mounting hardware, and a comprehensive getting started guide.'
  },
  {
    question: 'Is the AutoVision software open source?',
    answer: 'Yes, AutoVision is completely open source and available on GitHub. You have full access to the source code, can modify it for your needs, and contribute back to the community.'
  },
  {
    question: 'What programming languages are supported?',
    answer: 'Vision2X supports Python, C++, and MATLAB. We provide comprehensive SDKs and examples for each language, along with ROS2 native integration.'
  },
  {
    question: 'Do you offer educational discounts?',
    answer: 'Yes, we offer significant discounts for educational institutions and students. Contact our sales team with your .edu email address for pricing information.'
  },
  {
    question: 'What is the warranty policy?',
    answer: 'All Vision2X products come with a 2-year warranty covering manufacturing defects. We also offer extended warranty options and dedicated support for commercial deployments.'
  }
];

const SupportPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m here to help you with any questions about Vision2X products. How can I assist you today?',
      timestamp: new Date(),
      avatar: '/Logo_Symbol_Light.png'
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: chatMessage,
      timestamp: new Date(),
      avatar: null
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        message: 'Thank you for your message! Our support team will respond shortly. In the meantime, you can check our FAQ section above for quick answers.',
        timestamp: new Date(),
        avatar: '/Logo_Symbol_Light.png'
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-navy dark:via-slate-800 dark:to-dark-navy transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-400/20 to-emerald-500/20 border border-teal-400/30 rounded-full text-teal-700 dark:text-teal-300 text-sm font-medium backdrop-blur-sm mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            24/7 Expert Support
          </div>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            How can we help you?
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
          Get help with Vision2X products, find answers to common questions, or contact our expert support team.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-teal-400/10 border border-gray-200 dark:border-slate-700/50 hover:border-teal-400/30 text-center transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white dark:text-slate-900" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">Live Chat</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed transition-colors duration-300">Get instant help from our support team</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <Clock className="w-4 h-4" />
            <span>Avg. response: 2 minutes</span>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25 hover:scale-105">
            <span>Start Chat</span>
          </button>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-slate-900/20 border border-gray-200 dark:border-slate-700/50 hover:border-slate-800/30 text-center transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
            <Phone className="w-8 h-8 text-white dark:text-slate-900" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors duration-300">Phone Support</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed transition-colors duration-300">Speak directly with our engineers</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <Clock className="w-4 h-4" />
            <span>Mon-Fri 9AM-6PM EST</span>
          </div>
          <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-slate-900/25 hover:scale-105">
            Call Now
          </button>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-red-500/20 border border-gray-200 dark:border-slate-700/50 hover:border-red-500/30 text-center transition-all duration-500 hover:-translate-y-2 group">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
            <Mail className="w-8 h-8 text-white dark:text-slate-900" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">Email Support</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed transition-colors duration-300">Detailed technical assistance</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <Clock className="w-4 h-4" />
            <span>Response within 24 hours</span>
          </div>
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-400 hover:to-pink-400 transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105">
            Send Email
          </button>
        </div>
      </div>

      {/* Knowledge Base Search */}
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700/50 p-8 mb-16 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/5 dark:from-teal-400/10 to-emerald-500/5 dark:to-emerald-500/10"></div>
        <div className="relative">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center transition-colors duration-300">Search Knowledge Base</h2>
          <p className="text-slate-600 dark:text-slate-300 text-center mb-8 transition-colors duration-300">Find instant answers to your questions</p>
          <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for help articles, guides, and tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent text-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-lg transition-all duration-300 hover:shadow-xl"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700/50 p-8 mb-16 transition-colors duration-300">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">Quick answers to the most common questions</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden hover:border-teal-400/30 transition-all duration-300 hover:shadow-lg">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-teal-500 transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-teal-500 transition-colors" />
                )}
              </button>
              
              {expandedFaq === index && (
                <div className="px-6 pb-5 bg-gray-50/50 dark:bg-slate-700/30">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-12 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-emerald-500/10"></div>
        <div className="relative">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Users className="w-6 h-6 text-teal-400" />
            <span className="text-teal-400 font-semibold">Community Support</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
          <p className="text-slate-300 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-lg transition-colors duration-300">
            Check out our comprehensive documentation, video tutorials, and join our active developer community.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/resources"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white dark:text-slate-900 font-semibold rounded-xl hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/25 hover:scale-105"
            >
              View Documentation
            </a>
            <a
            href="#"
            className="inline-flex items-center px-8 py-4 border border-slate-600 dark:border-slate-500 text-white font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
          >
            Community Forum
          </a>
          </div>
        </div>
      </div>

      {/* Chat Window Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden border border-gray-200 dark:border-slate-700 transition-colors duration-300">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Vision2X Support</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/90">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <img src={msg.avatar} alt="Bot" className="w-5 h-5" />
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white'
                          : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-600'
                      } shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <span className={`text-xs mt-1 block ${
                        msg.type === 'user' ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300"
                  />
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="p-3 bg-gradient-to-r from-teal-400 to-emerald-500 text-white rounded-xl hover:from-teal-300 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teal-400/25"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default SupportPage;