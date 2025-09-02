import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
              NextShop
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              The future of e-commerce is here. Experience seamless shopping with AI-powered recommendations and premium customer service.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for amazing shopping experiences</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About Us', 'Contact', 'FAQ', 'Shipping Info'].map(link => (
                <a key={link} href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <div className="space-y-2">
              {['Electronics', 'Fashion', 'Food & Beverage', 'Home & Garden'].map(category => (
                <a key={category} href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NextShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};