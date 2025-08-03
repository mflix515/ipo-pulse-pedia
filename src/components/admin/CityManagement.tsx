
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Search,
  Save,
  X
} from 'lucide-react';

interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  population: string | null;
  area: string | null;
  description: string | null;
  economic_overview: string | null;
  investment_opportunities: string | null;
  major_companies: string | null;
  stock_exchanges: string | null;
  brokers_available: string[] | null;
  local_investment_tips: string | null;
  cost_of_living: string | null;
  business_environment: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CityManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    country: 'India',
    population: '',
    area: '',
    description: '',
    economic_overview: '',
    investment_opportunities: '',
    major_companies: '',
    stock_exchanges: '',
    local_investment_tips: '',
    cost_of_living: '',
    business_environment: '',
    image_url: '',
    is_active: true
  });

  const fetchCities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCities(data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (city: City) => {
    setEditingId(city.id);
    setFormData({
      name: city.name,
      state: city.state,
      country: city.country,
      population: city.population || '',
      area: city.area || '',
      description: city.description || '',
      economic_overview: city.economic_overview || '',
      investment_opportunities: city.investment_opportunities || '',
      major_companies: city.major_companies || '',
      stock_exchanges: city.stock_exchanges || '',
      local_investment_tips: city.local_investment_tips || '',
      cost_of_living: city.cost_of_living || '',
      business_environment: city.business_environment || '',
      image_url: city.image_url || '',
      is_active: city.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        const { error } = await supabase
          .from('cities')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setCities(prev => prev.filter(city => city.id !== id));
        console.log('City deleted successfully');
      } catch (error) {
        console.error('Error deleting city:', error);
        alert('Failed to delete city');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing city
        const { error } = await supabase
          .from('cities')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        console.log('City updated successfully');
      } else {
        // Create new city
        const { error } = await supabase
          .from('cities')
          .insert(formData);

        if (error) throw error;
        
        console.log('City created successfully');
      }

      await fetchCities();
      handleCancel();
    } catch (error) {
      console.error('Error saving city:', error);
      alert('Failed to save city');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      state: '',
      country: 'India',
      population: '',
      area: '',
      description: '',
      economic_overview: '',
      investment_opportunities: '',
      major_companies: '',
      stock_exchanges: '',
      local_investment_tips: '',
      cost_of_living: '',
      business_environment: '',
      image_url: '',
      is_active: true
    });
  };

  if (loading) {
    return <div className="p-6">Loading cities...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          City Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <Plus className="h-4 w-4" />
          Add New City
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">All Cities</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredCities.map((city) => (
              <div key={city.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{city.name}, {city.state}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                      <span>Population: {city.population}</span>
                      <span>Stock Exchanges: {city.stock_exchanges}</span>
                      <span>Major Companies: {city.major_companies}</span>
                      <span>Economic: {city.economic_overview}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={city.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {city.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(city)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(city.id)}
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
            <CardTitle className="text-gray-800">{editingId ? 'Edit City' : 'Add New City'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">City Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter city name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-700">State</Label>
                <Input 
                  id="state" 
                  placeholder="Enter state name" 
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="population" className="text-gray-700">Population</Label>
                <Input 
                  id="population" 
                  placeholder="e.g., 20.4 million" 
                  value={formData.population}
                  onChange={(e) => setFormData({...formData, population: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="stock_exchanges" className="text-gray-700">Stock Exchanges</Label>
                <Input 
                  id="stock_exchanges" 
                  placeholder="e.g., BSE, NSE" 
                  value={formData.stock_exchanges}
                  onChange={(e) => setFormData({...formData, stock_exchanges: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="economic_overview" className="text-gray-700">Economic Overview</Label>
                <Textarea 
                  id="economic_overview" 
                  placeholder="Brief economic overview" 
                  value={formData.economic_overview}
                  onChange={(e) => setFormData({...formData, economic_overview: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="major_companies" className="text-gray-700">Major Companies</Label>
                <Input 
                  id="major_companies" 
                  placeholder="e.g., Reliance, Tata Group" 
                  value={formData.major_companies}
                  onChange={(e) => setFormData({...formData, major_companies: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Update City' : 'Save City'}
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

export default CityManagement;
