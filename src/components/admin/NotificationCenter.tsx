
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send,
  Mail,
  MessageSquare,
  Users,
  Bell
} from 'lucide-react';

const NotificationCenter = () => {
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
    targetUsers: 'all',
    sendEmail: false,
    sendSMS: false
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notification Center</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Send New Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Notification title"
                value={notificationForm.title}
                onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Notification message"
                rows={4}
                value={notificationForm.message}
                onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <select 
                id="type" 
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

            <div>
              <Label htmlFor="targetUsers">Target Users</Label>
              <select 
                id="targetUsers" 
                className="w-full px-3 py-2 border rounded-md"
                value={notificationForm.targetUsers}
                onChange={(e) => setNotificationForm({...notificationForm, targetUsers: e.target.value})}
              >
                <option value="all">All Users</option>
                <option value="active">Active Users Only</option>
                <option value="new">New Users (This Month)</option>
                <option value="specific">Specific Users</option>
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
                <MessageSquare className="h-4 w-4" />
                Send SMS
              </label>
            </div>

            <Button className="w-full flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Notification
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">New IPO Alert</h4>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Tech Solutions Ltd IPO is now open for subscription</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sent</span>
                  <span className="text-xs">2,350 users</span>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">System Maintenance</h4>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Scheduled maintenance on Jan 20, 2024</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Sent</span>
                  <span className="text-xs">All users</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationCenter;
