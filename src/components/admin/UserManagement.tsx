import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Bell,
  Save,
  X
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    isAdmin: false,
    status: 'Active',
    password: ''
  });

  // Mock data - this would come from your database
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '9876543210',
      city: 'Mumbai',
      isAdmin: false,
      status: 'Active',
      lastNotification: '2024-01-10T10:00:00.000Z'
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      mobile: '9999988888',
      city: 'Delhi',
      isAdmin: true,
      status: 'Active',
      lastNotification: '2024-01-12T14:30:00.000Z'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      isAdmin: user.isAdmin,
      status: user.status,
      password: ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const sendNotification = async (userId: string) => {
    try {
      console.log(`Sending notification to user: ${userId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Notification sent successfully!');
      
      // Update user's notification count or status
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, lastNotification: new Date().toISOString() }
          : user
      ));
      
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  const handleSave = () => {
    const newUser = {
      id: editingId || Date.now().toString(),
      ...formData
    };

    if (editingId) {
      setUsers(prev => prev.map(user => user.id === editingId ? newUser : user));
    } else {
      setUsers(prev => [...prev, newUser]);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      city: '',
      isAdmin: false,
      status: 'Active',
      password: ''
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          User Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <PlusCircle className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">All Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mobile</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-green-50/30">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.city}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                    <td className="py-3 px-4 text-gray-700">{user.mobile}</td>
                    <td className="py-3 px-4">
                      <Badge className={user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                        {user.isAdmin ? 'Admin' : 'User'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(user)}
                          className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => sendNotification(user.id)}
                          className="border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-gray-800">{editingId ? 'Edit User' : 'Add New User'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="text-gray-700">Mobile</Label>
                <Input 
                  id="mobile" 
                  placeholder="Enter mobile" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-700">City</Label>
                <Input 
                  id="city" 
                  placeholder="Enter city" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-700">Status</Label>
                <select 
                  id="status" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isAdmin"
                    checked={formData.isAdmin}
                    onCheckedChange={(checked) => setFormData({...formData, isAdmin: checked as boolean})}
                  />
                  <Label htmlFor="isAdmin" className="text-gray-700">Is Admin</Label>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Update User' : 'Save User'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;
