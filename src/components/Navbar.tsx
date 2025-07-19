
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Menu, 
  Share, 
  Phone, 
  Sun, 
  Moon, 
  User,
  ChevronDown,
  ChevronUp,
  Home,
  TrendingUp,
  Building2,
  Users,
  Globe,
  MapPin,
  BookOpen,
  Newspaper
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'IPO-Pedia',
        text: 'Check out this amazing IPO platform!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? '' : dropdown);
  };

  const menuItems = [
    {
      id: 'ipo',
      label: 'IPO',
      icon: TrendingUp,
      items: [
        { label: 'Mainboard IPO', link: '/mainboard-ipo' },
        { label: 'SME IPO', link: '/sme-ipo' },
        { label: 'IPO Calendar', link: '/calendar' },
        { label: 'IPO Performance', link: '/performance' }
      ]
    },
    {
      id: 'nfo',
      label: 'NFO',
      icon: Building2,
      items: [
        { label: 'Current NFOs', link: '/nfo?status=open' },
        { label: 'Upcoming NFOs', link: '/nfo?status=upcoming' },
        { label: 'NFO Performance', link: '/nfo?status=allotted' }
      ]
    },
    {
      id: 'broker',
      label: 'Broker Reviews',
      icon: Users,
      items: [
        { label: 'Compare Brokers', link: '/broker-comparison' },
        { label: 'Broker Reviews', link: '/broker-reviews' },
        { label: 'Account Opening', link: '/account-opening' }
      ]
    },
    {
      id: 'stockmarket',
      label: 'Stock Market',
      icon: Globe,
      items: [
        { label: 'Market News', link: '/news' },
        { label: 'Market Analysis', link: '/analysis' },
        { label: 'Trading Tips', link: '/tips' }
      ]
    },
    {
      id: 'tourism',
      label: 'City Info',
      icon: MapPin,
      items: [
        { label: 'Chittorgarh Tourism', link: '/tourism' },
        { label: 'Local Business', link: '/business' },
        { label: 'City Guide', link: '/city-guide' }
      ]
    }
  ];

  return (
    <nav className="bg-white shadow-md border-b-2 border-red-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-gray-900">IPO-Pedia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>

            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.label}
                  {activeDropdown === item.id ? (
                    <ChevronUp className="h-3 w-3 ml-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 ml-1" />
                  )}
                </button>

                {activeDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {item.items.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setActiveDropdown('')}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link to="/blog" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 transition-colors">
              <BookOpen className="h-4 w-4 mr-1" />
              Blog
            </Link>

            <Link to="/news" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 transition-colors">
              <Newspaper className="h-4 w-4 mr-1" />
              News
            </Link>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Always visible on mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search IPOs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 sm:w-60 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Share Button - Hidden on mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hidden sm:flex"
            >
              <Share className="h-4 w-4" />
            </Button>

            {/* Contact - Hidden on mobile */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:flex"
            >
              <Link to="/contact">
                <Phone className="h-4 w-4 mr-1" />
                Contact
              </Link>
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/crm-admin')}>
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>

                  {menuItems.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center px-3 py-2 text-gray-900 font-medium">
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </div>
                      {item.items.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.link}
                          className="block px-6 py-1 text-sm text-gray-600 hover:text-red-600"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ))}

                  <Link to="/blog" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Blog
                  </Link>

                  <Link to="/news" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600">
                    <Newspaper className="h-4 w-4 mr-2" />
                    News
                  </Link>

                  <Button onClick={handleShare} variant="ghost" className="justify-start">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  <Link to="/contact" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
