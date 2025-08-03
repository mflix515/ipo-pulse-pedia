
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Calendar, TrendingUp, MessageSquare, Landmark, Building } from 'lucide-react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(2350);
  const [totalIpos, setTotalIpos] = useState(56);
  const [totalNfos, setTotalNfos] = useState(32);
  const [totalBonds, setTotalBonds] = useState(18);
  const [totalArticles, setTotalArticles] = useState(125);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Wealth-Prism Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Manage your investment platform efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-100" />
              <div>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-sm text-blue-100">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-100" />
              <div>
                <p className="text-2xl font-bold">{totalIpos}</p>
                <p className="text-sm text-green-100">Total IPOs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-8 w-8 text-orange-100" />
              <div>
                <p className="text-2xl font-bold">{totalNfos}</p>
                <p className="text-sm text-orange-100">Total NFOs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Landmark className="h-8 w-8 text-purple-100" />
              <div>
                <p className="text-2xl font-bold">{totalBonds}</p>
                <p className="text-sm text-purple-100">Total Bonds</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-gray-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <Button 
              onClick={() => handleQuickAction('/crm-admin/users')}
              className="w-full justify-start gap-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 border border-blue-200"
            >
              <Users className="h-4 w-4" />
              Manage Users
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleQuickAction('/crm-admin/content')}
              className="w-full justify-start gap-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 hover:from-green-100 hover:to-green-200 border border-green-200"
            >
              <FileText className="h-4 w-4" />
              Manage Content
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleQuickAction('/crm-admin/ipos')}
              className="w-full justify-start gap-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 border border-purple-200"
            >
              <TrendingUp className="h-4 w-4" />
              Manage IPOs
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleQuickAction('/crm-admin/notifications')}
              className="w-full justify-start gap-2 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 hover:from-orange-100 hover:to-orange-200 border border-orange-200"
            >
              <MessageSquare className="h-4 w-4" />
              Send Notifications
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-gray-800">Content Statistics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <span className="text-gray-700">Total Articles</span>
                <span className="font-bold text-blue-700">{totalArticles}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <span className="text-gray-700">Published Articles</span>
                <span className="font-bold text-green-700">{totalArticles - 10}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <span className="text-gray-700">Draft Articles</span>
                <span className="font-bold text-orange-700">10</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <span className="text-gray-700">Active IPOs</span>
                <span className="font-bold text-purple-700">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <CardTitle className="text-gray-800">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50/50">
              <span className="text-gray-700">New IPO "Tech Solutions Ltd" added</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50/50">
              <span className="text-gray-700">25 new users registered today</span>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border-l-4 border-orange-500 bg-orange-50/50">
              <span className="text-gray-700">NFO "Green Energy Fund" updated</span>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
