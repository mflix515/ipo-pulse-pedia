import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              About IPOpedia
            </h3>
            <p className="text-sm text-gray-600">
              IPOpedia is your go-to source for IPO information, expert analysis, and investment tools.
              We provide comprehensive data and insights to help you make informed decisions.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>123 Tech Park, Cityville</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>info@ipopedia.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Mon - Fri: 9am - 6pm</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/mainboard-ipo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Mainboard IPO
                  </Link>
                </li>
                <li>
                  <Link to="/sme-ipo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    SME IPO
                  </Link>
                </li>
                <li>
                  <Link to="/nfo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    NFO
                  </Link>
                </li>
                <li>
                  <Link to="/bonds" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Bonds
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Tools
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/calculator" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Financial Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/performance" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Performance
                  </Link>
                </li>
                <li>
                  <Link to="/calendar" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    IPO Calendar
                  </Link>
                </li>
                <li>
                  <Link to="/broker-comparison" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Broker Comparison
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 py-4 border-t">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} IPOpedia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
