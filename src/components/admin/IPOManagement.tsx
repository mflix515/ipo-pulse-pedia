
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

const IPOManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Mock data - this would come from your database
  const [ipos, setIpos] = useState([
    {
      id: '1',
      name: 'Tech Solutions Ltd',
      type: 'Mainboard',
      status: 'Open',
      priceRange: '₹100-120',
      openDate: '2024-01-15',
      closeDate: '2024-01-17',
      allotmentDate: '2024-01-20',
      issueSize: '₹500 Cr',
      minInvestment: '₹15,000',
      lotSize: '125',
      about: 'Leading technology solutions provider',
      strengths: 'Strong market position, experienced management',
      weaknesses: 'High debt levels, intense competition',
      applicationDetails: 'Apply through ASBA, UPI payments accepted',
      faqs: 'Check allotment status on registrar website'
    },
    {
      id: '2',
      name: 'Green Energy Corp',
      type: 'SME',
      status: 'Upcoming',
      priceRange: '₹50-60',
      openDate: '2024-01-20',
      closeDate: '2024-01-22',
      allotmentDate: '2024-01-25',
      issueSize: '₹100 Cr',
      minInvestment: '₹10,000',
      lotSize: '200',
      about: 'Renewable energy solutions company',
      strengths: 'Growing market, government support',
      weaknesses: 'Capital intensive, weather dependent',
      applicationDetails: 'Online application through brokers',
      faqs: 'Minimum application is 1 lot'
    }
  ]);

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

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowAddForm(true);
    console.log('Editing IPO:', id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this IPO?')) {
      setIpos(prev => prev.filter(ipo => ipo.id !== id));
      console.log('Deleted IPO:', id);
    }
  };

  const handleSave = () => {
    // Implement save functionality
    setShowAddForm(false);
    setEditingId(null);
    console.log('IPO saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">IPO Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New IPO
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>All IPOs</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search IPOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredIPOs.map((ipo) => (
              <div key={ipo.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{ipo.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 text-sm text-muted-foreground">
                      <span>Type: {ipo.type}</span>
                      <span>Price: {ipo.priceRange}</span>
                      <span>Size: {ipo.issueSize}</span>
                      <span>Lot Size: {ipo.lotSize}</span>
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(ipo.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(ipo.id)}
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
            <CardTitle>{editingId ? 'Edit IPO' : 'Add New IPO'}</CardTitle>
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
                <Label htmlFor="minInvestment">Minimum Investment</Label>
                <Input id="minInvestment" placeholder="₹15,000" />
              </div>
              <div>
                <Label htmlFor="lotSize">Lot Size</Label>
                <Input id="lotSize" placeholder="125" />
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
                <Label htmlFor="ipoDoc">IPO Document Link</Label>
                <Input id="ipoDoc" placeholder="https://example.com/ipo-doc" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="about">About IPO</Label>
                <Textarea id="about" placeholder="Enter IPO description" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="strengths">Strengths & Financials</Label>
                <Textarea id="strengths" placeholder="Enter strengths and financial highlights" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="weaknesses">Weaknesses</Label>
                <Textarea id="weaknesses" placeholder="Enter weaknesses and risks" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="applicationDetails">Application Details</Label>
                <Textarea id="applicationDetails" placeholder="Enter application process details" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="faqs">Top FAQs</Label>
                <Textarea id="faqs" placeholder="Enter frequently asked questions" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave}>
                {editingId ? 'Update IPO' : 'Save IPO'}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}>
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
