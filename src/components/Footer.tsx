
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Calculator, Users, MessageSquare, Globe, Smartphone, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-2 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-300 bg-clip-text text-transparent">
                Wealth-Prism
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted platform for IPO insights, market analysis, and investment opportunities. 
              Make informed decisions with our comprehensive financial tools and expert guidance.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-900 p-2 rounded-full transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mainboard-ipo" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  Mainboard IPO
                </Link>
              </li>
              <li>
                <Link to="/sme-ipo" className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  SME IPO
                </Link>
              </li>
              <li>
                <Link to="/nfo" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  NFO
                </Link>
              </li>
              <li>
                <Link to="/bonds" className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  Bonds
                </Link>
              </li>
              <li>
                <Link to="/performance" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  Performance
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  IPO Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tools & Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-400" />
                  Financial Calculators
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-400" />
                  Market News
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-green-400" />
                  Investment Blog
                </Link>
              </li>
              <li>
                <Link to="/broker-comparison" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  Broker Comparison
                </Link>
              </li>
              <li>
                <Link to="/market-analysis" className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  Market Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                  <p className="text-gray-400 text-xs">Mon-Fri 9AM-6PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">support@wealthprism.com</p>
                  <p className="text-gray-400 text-xs">24/7 Email Support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Mumbai, Maharashtra</p>
                  <p className="text-gray-400 text-xs">India</p>
                </div>
              </div>
            </div>

            {/* Quick Connect */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-800/30 to-green-800/30 rounded-lg border border-blue-700/30">
              <h4 className="text-sm font-semibold text-white mb-2">Quick Connect</h4>
              <div className="flex space-x-2">
                <a href="tel:+919876543210" className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded text-center transition-colors">
                  <Smartphone className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-xs">Call</span>
                </a>
                <a href="mailto:support@wealthprism.com" className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded text-center transition-colors">
                  <Send className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-xs">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © 2024 Wealth-Prism. All rights reserved. | Empowering Smart Investments
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link to="/terms" className="text-gray-300 hover:text-blue-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-gray-300 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-blue-400 transition-colors">
                Disclaimer
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
