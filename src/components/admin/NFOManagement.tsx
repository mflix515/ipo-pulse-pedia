
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
  Building
} from 'lucide-react';

const NFOManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data
  const nfos = [
    {
      id: '1',
      name: 'HDFC Equity Growth Fund',
      type: 'Equity',
      status: 'Open',
      fundHouse: 'HDFC AMC',
      minInvestment: '₹1,000',
      maxInvestment: '₹10,00,000',
      openDate: '2024-01-15',
      closeDate: '2024-01-30'
    },
    {
      id: '2',
      name: 'SBI Debt Fund Plus',
      type: 'Debt',
      status: 'Upcoming',
      fundHouse: 'SBI AMC',
      minInvestment: '₹500',
      maxInvestment: '₹5,00,000',
      openDate: '2024-02-01',
      closeDate: '2024-02-15'
    }
  ];

  const filteredNFOs = nfos.filter(nfo =>
    nfo.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold">NFO Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New NFO
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All NFOs</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NFOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNFOs.map((nfo) => (
              <div key={nfo.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{nfo.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Type: {nfo.type}</span>
                      <span>Fund House: {nfo.fundHouse}</span>
                      <span>Min: {nfo.minInvestment}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Building className="h-4 w-4" />
                      <span className="text-sm">{nfo.openDate} to {nfo.closeDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(nfo.status)}>
                      {nfo.status}
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
            <CardTitle>Add New NFO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">NFO Name</Label>
                <Input id="name" placeholder="Enter NFO name" />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select id="type" className="w-full px-3 py-2 border rounded-md">
                  <option value="Equity">Equity</option>
                  <option value="Debt">Debt</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fundHouse">Fund House</Label>
                <Input id="fundHouse" placeholder="Enter fund house name" />
              </div>
              <div>
                <Label htmlFor="minInvestment">Minimum Investment</Label>
                <Input id="minInvestment" placeholder="₹1,000" />
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
              <Button>Save NFO</Button>
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

export default NFOManagement;
