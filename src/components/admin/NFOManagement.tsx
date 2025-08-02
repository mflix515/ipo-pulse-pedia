
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
  Building,
  Save,
  X
} from 'lucide-react';

const NFOManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'equity',
    fundHouse: '',
    minInvestment: '',
    maxInvestment: '',
    openDate: '',
    closeDate: '',
    expenseRatio: '',
    exitLoad: '',
    taxImplications: '',
    contactDetails: '',
    fundManager: '',
    investmentObjective: '',
    peerComparison: ''
  });

  // Mock data with enhanced fields
  const [nfos, setNfos] = useState([
    {
      id: '1',
      name: 'HDFC Equity Growth Fund',
      type: 'Equity',
      status: 'Open',
      fundHouse: 'HDFC AMC',
      minInvestment: '₹1,000',
      maxInvestment: '₹10,00,000',
      openDate: '2024-01-15',
      closeDate: '2024-01-30',
      expenseRatio: '1.25%',
      exitLoad: '1% if redeemed before 1 year',
      taxImplications: 'LTCG: 10% above ₹1L, STCG: 15%',
      contactDetails: 'customer.care@hdfcfund.com, 1800-180-8000',
      fundManager: 'Rahul Singh, Priya Sharma',
      investmentObjective: 'Long-term capital appreciation through equity investments',
      peerComparison: 'Top quartile performer in large-cap equity category'
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
      closeDate: '2024-02-15',
      expenseRatio: '0.95%',
      exitLoad: 'Nil',
      taxImplications: 'As per income tax slab rates',
      contactDetails: 'care@sbimf.com, 1800-123-1963',
      fundManager: 'Amit Kumar',
      investmentObjective: 'Generate stable income through debt securities',
      peerComparison: 'Consistent performer in debt fund category'
    }
  ]);

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

  const handleEdit = (nfo: any) => {
    setEditingId(nfo.id);
    setFormData({
      name: nfo.name,
      type: nfo.type.toLowerCase(),
      fundHouse: nfo.fundHouse,
      minInvestment: nfo.minInvestment,
      maxInvestment: nfo.maxInvestment,
      openDate: nfo.openDate,
      closeDate: nfo.closeDate,
      expenseRatio: nfo.expenseRatio,
      exitLoad: nfo.exitLoad,
      taxImplications: nfo.taxImplications,
      contactDetails: nfo.contactDetails,
      fundManager: nfo.fundManager,
      investmentObjective: nfo.investmentObjective,
      peerComparison: nfo.peerComparison
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this NFO?')) {
      setNfos(prev => prev.filter(nfo => nfo.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing NFO
      setNfos(prev => prev.map(nfo => 
        nfo.id === editingId 
          ? { 
              ...nfo, 
              ...formData,
              type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
            }
          : nfo
      ));
    } else {
      // Add new NFO
      const newNfo = {
        id: Date.now().toString(),
        ...formData,
        type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
        status: 'Upcoming'
      };
      setNfos(prev => [...prev, newNfo]);
    }
    
    // Reset form
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'equity',
      fundHouse: '',
      minInvestment: '',
      maxInvestment: '',
      openDate: '',
      closeDate: '',
      expenseRatio: '',
      exitLoad: '',
      taxImplications: '',
      contactDetails: '',
      fundManager: '',
      investmentObjective: '',
      peerComparison: ''
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'equity',
      fundHouse: '',
      minInvestment: '',
      maxInvestment: '',
      openDate: '',
      closeDate: '',
      expenseRatio: '',
      exitLoad: '',
      taxImplications: '',
      contactDetails: '',
      fundManager: '',
      investmentObjective: '',
      peerComparison: ''
    });
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
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{nfo.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Type: {nfo.type}</span>
                      <span>Fund House: {nfo.fundHouse}</span>
                      <span>Min: {nfo.minInvestment}</span>
                      <span>Expense Ratio: {nfo.expenseRatio}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Building className="h-4 w-4" />
                      <span className="text-sm">{nfo.openDate} to {nfo.closeDate}</span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Fund Manager:</span> {nfo.fundManager}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(nfo.status)}>
                      {nfo.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(nfo)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(nfo.id)}
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
            <CardTitle>{editingId ? 'Edit NFO' : 'Add New NFO'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">NFO Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter NFO name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select 
                  id="type" 
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="equity">Equity</option>
                  <option value="debt">Debt</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fundHouse">Fund House</Label>
                <Input 
                  id="fundHouse" 
                  placeholder="Enter fund house name" 
                  value={formData.fundHouse}
                  onChange={(e) => setFormData({...formData, fundHouse: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="minInvestment">Minimum Investment</Label>
                <Input 
                  id="minInvestment" 
                  placeholder="₹1,000" 
                  value={formData.minInvestment}
                  onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="maxInvestment">Maximum Investment</Label>
                <Input 
                  id="maxInvestment" 
                  placeholder="₹10,00,000" 
                  value={formData.maxInvestment}
                  onChange={(e) => setFormData({...formData, maxInvestment: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="expenseRatio">Expense Ratio</Label>
                <Input 
                  id="expenseRatio" 
                  placeholder="1.25%" 
                  value={formData.expenseRatio}
                  onChange={(e) => setFormData({...formData, expenseRatio: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="openDate">Open Date</Label>
                <Input 
                  id="openDate" 
                  type="date" 
                  value={formData.openDate}
                  onChange={(e) => setFormData({...formData, openDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="closeDate">Close Date</Label>
                <Input 
                  id="closeDate" 
                  type="date" 
                  value={formData.closeDate}
                  onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="exitLoad">Exit Load</Label>
                <Input 
                  id="exitLoad" 
                  placeholder="1% if redeemed before 1 year" 
                  value={formData.exitLoad}
                  onChange={(e) => setFormData({...formData, exitLoad: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="taxImplications">Tax Implications</Label>
                <Textarea 
                  id="taxImplications" 
                  placeholder="Enter tax implications" 
                  value={formData.taxImplications}
                  onChange={(e) => setFormData({...formData, taxImplications: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contactDetails">Fund House Contact Details</Label>
                <Textarea 
                  id="contactDetails" 
                  placeholder="Email, Phone, Address" 
                  value={formData.contactDetails}
                  onChange={(e) => setFormData({...formData, contactDetails: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="fundManager">Fund Manager (Multiple)</Label>
                <Input 
                  id="fundManager" 
                  placeholder="Manager 1, Manager 2, Manager 3" 
                  value={formData.fundManager}
                  onChange={(e) => setFormData({...formData, fundManager: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="investmentObjective">Investment Objective</Label>
                <Textarea 
                  id="investmentObjective" 
                  placeholder="Enter investment objective" 
                  value={formData.investmentObjective}
                  onChange={(e) => setFormData({...formData, investmentObjective: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="peerComparison">Peer Comparison</Label>
                <Textarea 
                  id="peerComparison" 
                  placeholder="Comparison with similar funds" 
                  value={formData.peerComparison}
                  onChange={(e) => setFormData({...formData, peerComparison: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingId ? 'Update NFO' : 'Save NFO'}
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
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

export default NFOManagement;
