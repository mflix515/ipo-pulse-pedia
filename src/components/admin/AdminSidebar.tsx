
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
  Bot
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/crm-admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/crm-admin/ipos', label: 'IPO Management', icon: TrendingUp },
    { path: '/crm-admin/nfos', label: 'NFO Management', icon: Building },
    { path: '/crm-admin/users', label: 'User Management', icon: Users },
    { path: '/crm-admin/content', label: 'Content Management', icon: FileText },
    { path: '/crm-admin/notifications', label: 'Notifications', icon: Bell },
    { path: '/crm-admin/chatbot', label: 'Chatbot Config', icon: Bot },
    { path: '/crm-admin/cities', label: 'City Management', icon: MapPin },
    { path: '/crm-admin/ads', label: 'Ads Management', icon: Image },
    { path: '/crm-admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r z-50">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">IPOpedia Admin</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
