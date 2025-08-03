
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  Save,
  X
} from 'lucide-react';

interface Bond {
  id: string;
  name: string;
  issuer: string | null;
  interest_rate: string | null;
  maturity_date: string | null;
  minimum_investment: string | null;
  bond_type: string | null;
  credit_rating: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const BondsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    interest_rate: '',
    maturity_date: '',
    minimum_investment: '',
    bond_type: '',
    credit_rating: '',
    status: 'Active'
  });

  const fetchBonds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bonds')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBonds(data || []);
    } catch (error) {
      console.error('Error fetching bonds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonds();
  }, []);

  const filteredBonds = bonds.filter(bond =>
    bond.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Matured': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (bond: Bond) => {
    setEditingId(bond.id);
    setFormData({
      name: bond.name,
      issuer: bond.issuer || '',
      interest_rate: bond.interest_rate || '',
      maturity_date: bond.maturity_date || '',
      minimum_investment: bond.minimum_investment || '',
      bond_type: bond.bond_type || '',
      credit_rating: bond.credit_rating || '',
      status: bond.status
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bond?')) {
      try {
        const { error } = await supabase
          .from('bonds')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setBonds(prev => prev.filter(bond => bond.id !== id));
        console.log('Bond deleted successfully');
      } catch (error) {
        console.error('Error deleting bond:', error);
        alert('Failed to delete bond');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing bond
        const { error } = await supabase
          .from('bonds')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        console.log('Bond updated successfully');
      } else {
        // Create new bond
        const { error } = await supabase
          .from('bonds')
          .insert(formData);

        if (error) throw error;
        
        console.log('Bond created successfully');
      }

      await fetchBonds();
      handleCancel();
    } catch (error) {
      console.error('Error saving bond:', error);
      alert('Failed to save bond');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      issuer: '',
      interest_rate: '',
      maturity_date: '',
      minimum_investment: '',
      bond_type: '',
      credit_rating: '',
      status: 'Active'
    });
  };

  if (loading) {
    return <div className="p-6">Loading bonds...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Bonds Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Bond
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">All Bonds</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Bonds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredBonds.map((bond) => (
              <div key={bond.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{bond.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                      <span>Issuer: {bond.issuer}</span>
                      <span>Interest: {bond.interest_rate}</span>
                      <span>Rating: {bond.credit_rating}</span>
                      <span>Min Investment: {bond.minimum_investment}</span>
                    </div>
                    {bond.maturity_date && (
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Maturity: {bond.maturity_date}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge className={getStatusColor(bond.status)}>
                      {bond.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(bond)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(bond.id)}
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

      {showAddForm && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-gray-800">{editingId ? 'Edit Bond' : 'Add New Bond'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">Bond Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter bond name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="issuer" className="text-gray-700">Issuer</Label>
                <Input 
                  id="issuer" 
                  placeholder="Enter issuer name" 
                  value={formData.issuer}
                  onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="interest_rate" className="text-gray-700">Interest Rate</Label>
                <Input 
                  id="interest_rate" 
                  placeholder="7.5%" 
                  value={formData.interest_rate}
                  onChange={(e) => setFormData({...formData, interest_rate: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="maturity_date" className="text-gray-700">Maturity Date</Label>
                <Input 
                  id="maturity_date" 
                  type="date" 
                  value={formData.maturity_date}
                  onChange={(e) => setFormData({...formData, maturity_date: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="minimum_investment" className="text-gray-700">Minimum Investment</Label>
                <Input 
                  id="minimum_investment" 
                  placeholder="₹10,000" 
                  value={formData.minimum_investment}
                  onChange={(e) => setFormData({...formData, minimum_investment: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="bond_type" className="text-gray-700">Bond Type</Label>
                <Input 
                  id="bond_type" 
                  placeholder="Corporate Bond" 
                  value={formData.bond_type}
                  onChange={(e) => setFormData({...formData, bond_type: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="credit_rating" className="text-gray-700">Credit Rating</Label>
                <Input 
                  id="credit_rating" 
                  placeholder="AAA" 
                  value={formData.credit_rating}
                  onChange={(e) => setFormData({...formData, credit_rating: e.target.value})}
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
                  <option value="Matured">Matured</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Update Bond' : 'Save Bond'}
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

export default BondsManagement;
