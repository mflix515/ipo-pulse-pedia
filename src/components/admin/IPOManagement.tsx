
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  TrendingUp
} from 'lucide-react';

const IPOManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data - this would come from your database
  const ipos = [
    {
      id: '1',
      name: 'Tech Solutions Ltd',
      type: 'Mainboard',
      status: 'Open',
      priceRange: '₹100-120',
      openDate: '2024-01-15',
      closeDate: '2024-01-17',
      issueSize: '₹500 Cr'
    },
    {
      id: '2',
      name: 'Green Energy Corp',
      type: 'SME',
      status: 'Upcoming',
      priceRange: '₹50-60',
      openDate: '2024-01-20',
      closeDate: '2024-01-22',
      issueSize: '₹100 Cr'
    }
  ];

  const filteredIPOs = ipos.filter(ipo =>
    ipo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">IPO Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New IPO
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All IPOs</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search IPOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredIPOs.map((ipo) => (
              <div key={ipo.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{ipo.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Type: {ipo.type}</span>
                      <span>Price: {ipo.priceRange}</span>
                      <span>Size: {ipo.issueSize}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{ipo.openDate} to {ipo.closeDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(ipo.status)}>
                      {ipo.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New IPO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">IPO Name</Label>
                <Input id="name" placeholder="Enter IPO name" />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select id="type" className="w-full px-3 py-2 border rounded-md">
                  <option value="Mainboard">Mainboard</option>
                  <option value="SME">SME</option>
                </select>
              </div>
              <div>
                <Label htmlFor="priceRange">Price Range</Label>
                <Input id="priceRange" placeholder="₹100-120" />
              </div>
              <div>
                <Label htmlFor="issueSize">Issue Size</Label>
                <Input id="issueSize" placeholder="₹500 Cr" />
              </div>
              <div>
                <Label htmlFor="openDate">Open Date</Label>
                <Input id="openDate" type="date" />
              </div>
              <div>
                <Label htmlFor="closeDate">Close Date</Label>
                <Input id="closeDate" type="date" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save IPO</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IPOManagement;
