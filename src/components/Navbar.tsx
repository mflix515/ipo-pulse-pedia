
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-2 rounded-lg shadow-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Wealth-Prism
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <span>IPOs</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/mainboard-ipo" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg">
                  Mainboard IPO
                </Link>
                <Link to="/sme-ipo" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 last:rounded-b-lg">
                  SME IPO
                </Link>
              </div>
            </div>

            <Link to="/nfo" className={`font-medium transition-colors ${isActive('/nfo') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              NFO
            </Link>
            <Link to="/bonds" className={`font-medium transition-colors ${isActive('/bonds') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Bonds
            </Link>
            <Link to="/performance" className={`font-medium transition-colors ${isActive('/performance') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Performance
            </Link>
            <Link to="/calendar" className={`font-medium transition-colors ${isActive('/calendar') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Calendar
            </Link>
            <Link to="/news" className={`font-medium transition-colors ${isActive('/news') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              News
            </Link>
            <Link to="/calculator" className={`font-medium transition-colors ${isActive('/calculator') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Calculators
            </Link>
            <Link to="/community" className={`font-medium transition-colors ${isActive('/community') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Community
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg">
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link to="/crm-admin" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 last:rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2 bg-white">
            <Link to="/mainboard-ipo" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Mainboard IPO
            </Link>
            <Link to="/sme-ipo" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              SME IPO
            </Link>
            <Link to="/nfo" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              NFO
            </Link>
            <Link to="/bonds" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Bonds
            </Link>
            <Link to="/performance" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Performance
            </Link>
            <Link to="/calendar" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Calendar
            </Link>
            <Link to="/news" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              News
            </Link>
            <Link to="/calculator" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Calculators
            </Link>
            <Link to="/community" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Community
            </Link>
            
            {user ? (
              <div className="border-t border-gray-200 pt-2 space-y-2">
                <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Profile
                </Link>
                {user.isAdmin && (
                  <Link to="/crm-admin" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                    Admin Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-2 space-y-2">
                <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
