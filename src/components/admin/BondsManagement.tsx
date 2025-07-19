
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react';

const BondsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data
  const bonds = [
    {
      id: '1',
      name: 'HDFC Bank Bond Series 1',
      status: 'Open',
      interest: '7.5%',
      tenure: '5 years',
      interestPayout: 'Annual',
      rating: 'AAA',
      faceValue: '₹1,000',
      minInvestment: '₹10,000',
      ipoSize: '₹2,500 Cr',
      openDate: '2024-02-01',
      closeDate: '2024-02-10'
    },
    {
      id: '2',
      name: 'ICICI Bank Green Bond',
      status: 'Upcoming',
      interest: '8.2%',
      tenure: '3 years 6 months',
      interestPayout: 'Semi-Annual',
      rating: 'AA+',
      faceValue: '₹1,000',
      minInvestment: '₹5,000',
      ipoSize: '₹1,800 Cr',
      openDate: '2024-02-20',
      closeDate: '2024-02-25'
    }
  ];

  const filteredBonds = bonds.filter(bond =>
    bond.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (id: string) => {
    console.log('Edit bond:', id);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log('Delete bond:', id);
    // Implement delete functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bonds Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Bond
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Bonds</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Bonds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBonds.map((bond) => (
              <div key={bond.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{bond.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Interest: {bond.interest}</span>
                      <span>Tenure: {bond.tenure}</span>
                      <span>Rating: {bond.rating}</span>
                      <span>Min Investment: {bond.minInvestment}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{bond.openDate} to {bond.closeDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge className={getStatusColor(bond.status)}>
                      {bond.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(bond.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(bond.id)}
                    >
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
            <CardTitle>Add New Bond</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Bond Name</Label>
                <Input id="name" placeholder="Enter bond name" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" className="w-full px-3 py-2 border rounded-md">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Listed">Listed</option>
                </select>
              </div>
              <div>
                <Label htmlFor="interest">Interest Rate</Label>
                <Input id="interest" placeholder="7.5%" />
              </div>
              <div>
                <Label htmlFor="tenure">Tenure</Label>
                <Input id="tenure" placeholder="5 years" />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" placeholder="AAA" />
              </div>
              <div>
                <Label htmlFor="faceValue">Face Value</Label>
                <Input id="faceValue" placeholder="₹1,000" />
              </div>
              <div>
                <Label htmlFor="minInvestment">Minimum Investment</Label>
                <Input id="minInvestment" placeholder="₹10,000" />
              </div>
              <div>
                <Label htmlFor="ipoSize">IPO Size</Label>
                <Input id="ipoSize" placeholder="₹2,500 Cr" />
              </div>
              <div>
                <Label htmlFor="openDate">Open Date</Label>
                <Input id="openDate" type="date" />
              </div>
              <div>
                <Label htmlFor="closeDate">Close Date</Label>
                <Input id="closeDate" type="date" />
              </div>
              <div>
                <Label htmlFor="allotmentDate">Allotment Date</Label>
                <Input id="allotmentDate" type="date" />
              </div>
              <div>
                <Label htmlFor="listingDate">Listing Date</Label>
                <Input id="listingDate" type="date" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">About Bond</Label>
                <Textarea id="description" placeholder="Enter bond description" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="pros">Pros (one per line)</Label>
                <Textarea id="pros" placeholder="Enter pros, one per line" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cons">Cons (one per line)</Label>
                <Textarea id="cons" placeholder="Enter cons, one per line" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save Bond</Button>
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

export default BondsManagement;
