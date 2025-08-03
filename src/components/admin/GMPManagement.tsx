
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
  DollarSign,
  TrendingUp,
  Calculator
} from 'lucide-react';

const GMPManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    ipoName: '',
    priceRangeLow: '',
    priceRangeHigh: '',
    gmpAmount: ''
  });

  // Mock data for GMP
  const [gmpData, setGmpData] = useState([
    {
      id: '1',
      ipoName: 'Tech Solutions Ltd',
      priceRangeLow: 100,
      priceRangeHigh: 120,
      gmpAmount: 25,
      gmpPercentage: 20.8, // Auto calculated with higher price
      status: 'Active',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      ipoName: 'Green Energy Corp',
      priceRangeLow: 50,
      priceRangeHigh: 60,
      gmpAmount: 15,
      gmpPercentage: 25.0,
      status: 'Active',
      lastUpdated: '2024-01-14'
    }
  ]);

  const calculateGMPPercentage = (gmpAmount: number, priceRangeHigh: number) => {
    return ((gmpAmount / priceRangeHigh) * 100).toFixed(1);
  };

  const filteredGMPData = gmpData.filter(gmp =>
    gmp.ipoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (gmp: any) => {
    setEditingId(gmp.id);
    setFormData({
      ipoName: gmp.ipoName,
      priceRangeLow: gmp.priceRangeLow.toString(),
      priceRangeHigh: gmp.priceRangeHigh.toString(),
      gmpAmount: gmp.gmpAmount.toString()
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this GMP data?')) {
      setGmpData(prev => prev.filter(gmp => gmp.id !== id));
    }
  };

  const handleSave = () => {
    const newGMPData = {
      id: editingId || Date.now().toString(),
      ipoName: formData.ipoName,
      priceRangeLow: parseFloat(formData.priceRangeLow),
      priceRangeHigh: parseFloat(formData.priceRangeHigh),
      gmpAmount: parseFloat(formData.gmpAmount),
      gmpPercentage: parseFloat(calculateGMPPercentage(parseFloat(formData.gmpAmount), parseFloat(formData.priceRangeHigh))),
      status: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingId) {
      setGmpData(prev => prev.map(gmp => gmp.id === editingId ? newGMPData : gmp));
    } else {
      setGmpData(prev => [...prev, newGMPData]);
    }

    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      ipoName: '',
      priceRangeLow: '',
      priceRangeHigh: '',
      gmpAmount: ''
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      ipoName: '',
      priceRangeLow: '',
      priceRangeHigh: '',
      gmpAmount: ''
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          GMP Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <PlusCircle className="h-4 w-4" />
          Add New GMP
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <DollarSign className="h-5 w-5" />
              All GMP Data
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search IPOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredGMPData.map((gmp) => (
              <div key={gmp.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{gmp.ipoName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 text-sm text-gray-600">
                      <span>Price Range: ₹{gmp.priceRangeLow}-{gmp.priceRangeHigh}</span>
                      <span>GMP: ₹{gmp.gmpAmount}</span>
                      <span className="font-semibold text-green-600">GMP%: {gmp.gmpPercentage}%</span>
                      <span>Updated: {gmp.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        Premium: ₹{gmp.gmpAmount} ({gmp.gmpPercentage}% above higher price)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(gmp.status)}>
                      {gmp.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(gmp)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(gmp.id)}
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
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Calculator className="h-5 w-5" />
              {editingId ? 'Edit GMP Data' : 'Add New GMP Data'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ipoName" className="text-gray-700">IPO Name</Label>
                <Input 
                  id="ipoName" 
                  placeholder="Enter IPO name" 
                  value={formData.ipoName}
                  onChange={(e) => setFormData({...formData, ipoName: e.target.value})}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="priceRangeLow" className="text-gray-700">Price Range Low (₹)</Label>
                <Input 
                  id="priceRangeLow" 
                  type="number" 
                  placeholder="100" 
                  value={formData.priceRangeLow}
                  onChange={(e) => setFormData({...formData, priceRangeLow: e.target.value})}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="priceRangeHigh" className="text-gray-700">Price Range High (₹)</Label>
                <Input 
                  id="priceRangeHigh" 
                  type="number" 
                  placeholder="120" 
                  value={formData.priceRangeHigh}
                  onChange={(e) => setFormData({...formData, priceRangeHigh: e.target.value})}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="gmpAmount" className="text-gray-700">GMP Amount (₹)</Label>
                <Input 
                  id="gmpAmount" 
                  type="number" 
                  placeholder="25" 
                  value={formData.gmpAmount}
                  onChange={(e) => setFormData({...formData, gmpAmount: e.target.value})}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {formData.gmpAmount && formData.priceRangeHigh && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Auto Calculated GMP Percentage: {calculateGMPPercentage(parseFloat(formData.gmpAmount), parseFloat(formData.priceRangeHigh))}%
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Based on higher price range of ₹{formData.priceRangeHigh}
                </p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
              >
                {editingId ? 'Update GMP' : 'Save GMP'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GMPManagement;
