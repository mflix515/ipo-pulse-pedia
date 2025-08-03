
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import IPOManagement from '@/components/admin/IPOManagement';
import GMPManagement from '@/components/admin/GMPManagement';
import NFOManagement from '@/components/admin/NFOManagement';
import BondsManagement from '@/components/admin/BondsManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import NotificationCenter from '@/components/admin/NotificationCenter';
import ChatbotConfiguration from '@/components/admin/ChatbotConfiguration';
import CityManagement from '@/components/admin/CityManagement';
import AdsManagement from '@/components/admin/AdsManagement';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';

const Admin = () => {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <div className="bg-gradient-to-r from-white to-blue-50 shadow-sm border-b border-blue-100 sticky top-0 z-30">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Wealth-Prism Admin Panel
              </h1>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/ipos" element={<IPOManagement />} />
              <Route path="/gmp" element={<GMPManagement />} />
              <Route path="/nfos" element={<NFOManagement />} />
              <Route path="/bonds" element={<BondsManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/content" element={<ContentManagement />} />
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="/chatbot" element={<ChatbotConfiguration />} />
              <Route path="/cities" element={<CityManagement />} />
              <Route path="/ads" element={<AdsManagement />} />
              <Route path="/analytics" element={<AnalyticsPanel />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
