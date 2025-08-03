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

  // Enhanced mock data with peer comparison
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
      peerComparison: 'Top quartile performer in large-cap equity category with 12% average returns vs 9% category average'
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
      peerComparison: 'Consistent performer in debt fund category with 7.5% returns vs 6.8% category average'
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

  const handleSave = () => {
    const newNFO = {
      id: editingId || Date.now().toString(),
      ...formData,
      type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
      status: 'Upcoming'
    };

    if (editingId) {
      setNfos(prev => prev.map(nfo => nfo.id === editingId ? newNFO : nfo));
      console.log('NFO updated successfully');
    } else {
      setNfos(prev => [...prev, newNFO]);
      console.log('NFO created successfully');
    }
    
    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this NFO?')) {
      setNfos(prev => prev.filter(nfo => nfo.id !== id));
      console.log('NFO deleted successfully');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          NFO Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <PlusCircle className="h-4 w-4" />
          Add New NFO
        </Button>
      </div>

      {/* NFO List Card with peer comparison display */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">All NFOs</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search NFOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredNFOs.map((nfo) => (
              <div key={nfo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{nfo.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
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
                      <span className="font-medium text-gray-700">Fund Manager:</span> {nfo.fundManager}
                    </div>
                    {nfo.peerComparison && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                        <span className="font-medium text-green-800">Peer Comparison:</span>
                        <span className="text-green-700"> {nfo.peerComparison}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(nfo.status)}>
                      {nfo.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(nfo)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(nfo.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
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

      {/* Enhanced Form with new fields */}
      {showAddForm && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-gray-800">{editingId ? 'Edit NFO' : 'Add New NFO'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">NFO Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter NFO name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-gray-700">Type</Label>
                <select 
                  id="type" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="equity">Equity</option>
                  <option value="debt">Debt</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fundHouse" className="text-gray-700">Fund House</Label>
                <Input 
                  id="fundHouse" 
                  placeholder="Enter fund house name" 
                  value={formData.fundHouse}
                  onChange={(e) => setFormData({...formData, fundHouse: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="minInvestment" className="text-gray-700">Minimum Investment</Label>
                <Input 
                  id="minInvestment" 
                  placeholder="₹1,000" 
                  value={formData.minInvestment}
                  onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="maxInvestment" className="text-gray-700">Maximum Investment</Label>
                <Input 
                  id="maxInvestment" 
                  placeholder="₹10,00,000" 
                  value={formData.maxInvestment}
                  onChange={(e) => setFormData({...formData, maxInvestment: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="expenseRatio" className="text-gray-700">Expense Ratio</Label>
                <Input 
                  id="expenseRatio" 
                  placeholder="1.25%" 
                  value={formData.expenseRatio}
                  onChange={(e) => setFormData({...formData, expenseRatio: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="exitLoad" className="text-gray-700">Exit Load</Label>
                <Input 
                  id="exitLoad" 
                  placeholder="1% if redeemed before 1 year" 
                  value={formData.exitLoad}
                  onChange={(e) => setFormData({...formData, exitLoad: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="taxImplications" className="text-gray-700">Tax Implications</Label>
                <Textarea 
                  id="taxImplications" 
                  placeholder="Enter tax implications" 
                  value={formData.taxImplications}
                  onChange={(e) => setFormData({...formData, taxImplications: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="contactDetails" className="text-gray-700">Fund House Contact Details</Label>
                <Textarea 
                  id="contactDetails" 
                  placeholder="Email, Phone, Address" 
                  value={formData.contactDetails}
                  onChange={(e) => setFormData({...formData, contactDetails: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="peerComparison" className="text-gray-700">Peer Comparison</Label>
                <Textarea 
                  id="peerComparison" 
                  placeholder="Comparison with similar funds, performance metrics, category rankings" 
                  value={formData.peerComparison}
                  onChange={(e) => setFormData({...formData, peerComparison: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                <Save className="h-4 w-4" />
                {editingId ? 'Update NFO' : 'Save NFO'}
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
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
