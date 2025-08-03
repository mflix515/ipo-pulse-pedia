
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search,
  Users,
  Mail,
  Phone,
  Eye,
  Bell,
  Send,
  X
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
    sendEmail: false,
    sendSMS: false
  });

  // Mock data
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '+91 9876543210',
      panCard: 'ABCDE1234F',
      city: 'Mumbai',
      status: 'Active',
      joinedDate: '2024-01-15',
      totalApplications: 5
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      mobile: '+91 8765432109',
      panCard: 'FGHIJ5678K',
      city: 'Delhi',
      status: 'Active',
      joinedDate: '2024-01-10',
      totalApplications: 3
    },
    {
      id: '3',
      name: 'Raj Patel',
      email: 'raj@example.com',
      mobile: '+91 7654321098',
      panCard: 'KLMNO9876P',
      city: 'Bangalore',
      status: 'Active',
      joinedDate: '2024-01-20',
      totalApplications: 8
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendNotification = () => {
    setSelectedUsers(filteredUsers.map(user => user.id));
    setShowNotificationModal(true);
  };

  const handleNotificationSubmit = () => {
    // Simulate sending notification
    console.log('Sending notification to users:', selectedUsers);
    console.log('Notification details:', notificationForm);
    
    // Show success message
    alert(`Notification "${notificationForm.title}" sent successfully to ${selectedUsers.length} users!`);
    
    // Reset form and close modal
    setNotificationForm({
      title: '',
      message: '',
      type: 'info',
      sendEmail: false,
      sendSMS: false
    });
    setShowNotificationModal(false);
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button 
          onClick={handleSendNotification}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Bell className="h-4 w-4" />
          Send Notification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">2,350</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">180</p>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">1,240</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">85</p>
                <p className="text-sm text-muted-foreground">Join Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>All Users</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{user.mobile}</span>
                      </div>
                      <span>PAN: {user.panCard}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                      <span>City: {user.city}</span>
                      <span>Joined: {user.joinedDate}</span>
                      <span>Applications: {user.totalApplications}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">
                      {user.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Modal */}
      <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Send Notification
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="notifTitle">Notification Title</Label>
              <Input
                id="notifTitle"
                placeholder="Enter notification title"
                value={notificationForm.title}
                onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="notifMessage">Message</Label>
              <Textarea
                id="notifMessage"
                placeholder="Enter your message"
                rows={4}
                value={notificationForm.message}
                onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="notifType">Type</Label>
              <select 
                id="notifType" 
                className="w-full px-3 py-2 border rounded-md"
                value={notificationForm.type}
                onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value})}
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notificationForm.sendEmail}
                  onChange={(e) => setNotificationForm({...notificationForm, sendEmail: e.target.checked})}
                />
                <Mail className="h-4 w-4" />
                Send Email
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notificationForm.sendSMS}
                  onChange={(e) => setNotificationForm({...notificationForm, sendSMS: e.target.checked})}
                />
                <Phone className="h-4 w-4" />
                Send SMS
              </label>
            </div>
            
            <div className="text-sm text-muted-foreground">
              This notification will be sent to {selectedUsers.length} users
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleNotificationSubmit} 
                className="flex-1 flex items-center gap-2"
                disabled={!notificationForm.title || !notificationForm.message}
              >
                <Send className="h-4 w-4" />
                Send Notification
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNotificationModal(false)}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
