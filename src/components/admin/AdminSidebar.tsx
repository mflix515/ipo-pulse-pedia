
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar,
  Settings,
  MessageSquare,
  MapPin,
  Image,
  TrendingUp,
  Building,
  Bell,
  Bot,
  Landmark,
  DollarSign
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/crm-admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/crm-admin/ipos', label: 'IPO Management', icon: TrendingUp },
    { path: '/crm-admin/gmp', label: 'GMP Management', icon: DollarSign },
    { path: '/crm-admin/nfos', label: 'NFO Management', icon: Building },
    { path: '/crm-admin/bonds', label: 'Bonds Management', icon: Landmark },
    { path: '/crm-admin/users', label: 'User Management', icon: Users },
    { path: '/crm-admin/content', label: 'Content Management', icon: FileText },
    { path: '/crm-admin/notifications', label: 'Notifications', icon: Bell },
    { path: '/crm-admin/chatbot', label: 'Chatbot Config', icon: Bot },
    { path: '/crm-admin/cities', label: 'City Management', icon: MapPin },
    { path: '/crm-admin/ads', label: 'Ads Management', icon: Image },
    { path: '/crm-admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white to-blue-50 shadow-lg border-r border-blue-100 z-40 overflow-y-auto">
      <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-green-50">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Wealth-Prism Admin
        </h2>
      </div>
      
      <nav className="mt-6 pb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-r-3 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
