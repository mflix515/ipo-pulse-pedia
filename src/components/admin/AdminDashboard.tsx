
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar,
  TrendingUp,
  Building,
  MessageSquare,
  Bell,
  PlusCircle,
  Landmark
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-ipo':
        navigate('/crm-admin/ipos');
        break;
      case 'add-nfo':
        navigate('/crm-admin/nfos');
        break;
      case 'add-bond':
        navigate('/crm-admin/bonds');
        break;
      case 'send-notification':
        navigate('/crm-admin/notifications');
        break;
      case 'view-analytics':
        navigate('/crm-admin/analytics');
        break;
      case 'manage-users':
        navigate('/crm-admin/users');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IPOs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 new users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFOs Listed</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New IPO Added: Tech Solutions Ltd</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User Registration: 25 new users</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Support Ticket: Payment Issue</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Bond Listed: Government Bond 7.5%</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => handleQuickAction('add-ipo')}
                className="p-4 h-auto bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 hover:border-blue-300 transition-all flex flex-col items-center space-y-2"
                variant="outline"
              >
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm font-medium">Add New IPO</span>
              </Button>
              
              <Button 
                onClick={() => handleQuickAction('add-nfo')}
                className="p-4 h-auto bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 hover:border-green-300 transition-all flex flex-col items-center space-y-2"
                variant="outline"
              >
                <Building className="h-6 w-6" />
                <span className="text-sm font-medium">Add New NFO</span>
              </Button>
              
              <Button 
                onClick={() => handleQuickAction('add-bond')}
                className="p-4 h-auto bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 hover:border-purple-300 transition-all flex flex-col items-center space-y-2"
                variant="outline"
              >
                <Landmark className="h-6 w-6" />
                <span className="text-sm font-medium">Add New Bond</span>
              </Button>
              
              <Button 
                onClick={() => handleQuickAction('send-notification')}
                className="p-4 h-auto bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 hover:border-orange-300 transition-all flex flex-col items-center space-y-2"
                variant="outline"
              >
                <Bell className="h-6 w-6" />
                <span className="text-sm font-medium">Send Notification</span>
              </Button>
              
              <Button 
                onClick={() => handleQuickAction('view-analytics')}
                className="p-4 h-auto bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 hover:border-yellow-300 transition-all flex flex-col items-center space-y-2"
                variant="outline"
              >
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
              
              <Button 
                onClick={() => handleQuickAction('manage-users')}
                className="p-4 h-auto bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 hover:border-indigo-300 transition-all flex flex-col items-center space-y-2"
                variant="outline"
              >
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">Manage Users</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">IPO Applications</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">NFO Subscriptions</span>
                <span className="font-medium">567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bond Investments</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Gateway</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Page Load Time</span>
                <span className="font-medium">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="font-medium">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Sessions</span>
                <span className="font-medium">1,456</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
