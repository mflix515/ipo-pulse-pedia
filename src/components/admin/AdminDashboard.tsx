import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Reduced loading time to 1 second
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalIpos}</p>
                <p className="text-sm text-muted-foreground">Total IPOs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{totalNfos}</p>
                <p className="text-sm text-muted-foreground">Total NFOs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Landmark className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{totalBonds}</p>
                <p className="text-sm text-muted-foreground">Total Bonds</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Manage Users
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
            <Button className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Manage Content
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
            <Button className="w-full justify-start gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
            <Button className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              View Messages
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Total Articles</span>
                <span className="font-bold">{totalArticles}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Published Articles</span>
                <span className="font-bold">{totalArticles - 10}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Draft Articles</span>
                <span className="font-bold">10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
