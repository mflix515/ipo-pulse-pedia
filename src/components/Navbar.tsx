
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, Search, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'IPO', 
      href: '/mainboard-ipo',
      dropdown: [
        { name: 'Mainboard IPO', href: '/mainboard-ipo' },
        { name: 'SME IPO', href: '/sme-ipo' }
      ]
    },
    { name: 'NFO', href: '/nfo' },
    { name: 'Bonds', href: '/bonds' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Analysis', href: '/analysis' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
    { name: 'News', href: '/news' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2" onClick={closeAllDropdowns}>
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Investo-Pedia</span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">Investo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-1 ${
                        item.dropdown.some(sub => isActive(sub.href))
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onMouseEnter={() => handleDropdownToggle(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 mt-1 w-48 bg-white border shadow-lg rounded-md transition-all duration-200 z-50 dropdown-menu ${
                        openDropdown === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={closeAllDropdowns}
                          className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            isActive(subItem.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={closeAllDropdowns}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Search and Mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search IPOs, NFOs, Bonds..."
                  className="pl-10 pr-4 py-2 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Login/Register */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search IPOs, NFOs, Bonds..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">
                      {item.name}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-6 py-2 text-sm ${
                          isActive(subItem.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Login/Register */}
            <div className="pt-4 border-t">
              <div className="flex space-x-2">
                <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
