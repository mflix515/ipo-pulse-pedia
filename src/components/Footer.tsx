
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">IPO-Pedia</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Your comprehensive guide to IPO, NFO, and Bond investments. Track upcoming opportunities, 
              analyze performance, and make informed investment decisions with our advanced tools and insights.
            </p>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@ipopedia.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mainboard-ipo" className="text-gray-300 hover:text-white transition-colors">Mainboard IPO</Link></li>
              <li><Link to="/sme-ipo" className="text-gray-300 hover:text-white transition-colors">SME IPO</Link></li>
              <li><Link to="/nfo" className="text-gray-300 hover:text-white transition-colors">NFO</Link></li>
              <li><Link to="/bonds" className="text-gray-300 hover:text-white transition-colors">Bonds</Link></li>
              <li><Link to="/calendar" className="text-gray-300 hover:text-white transition-colors">IPO Calendar</Link></li>
              <li><Link to="/calculator" className="text-gray-300 hover:text-white transition-colors">P&L Calculator</Link></li>
              <li><Link to="/broker-comparison" className="text-gray-300 hover:text-white transition-colors">Broker Comparison</Link></li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog & News</Link></li>
              <li><Link to="/analysis" className="text-gray-300 hover:text-white transition-colors">Market Analysis</Link></li>
              <li><Link to="/performance" className="text-gray-300 hover:text-white transition-colors">IPO Performance</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 sm:pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 IPO-Pedia. All rights reserved. | Investment in securities market are subject to market risks.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
