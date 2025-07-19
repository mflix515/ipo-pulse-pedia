
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

const CityManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data
  const cities = [
    {
      id: '1',
      name: 'Mumbai',
      state: 'Maharashtra',
      population: '20.4 million',
      economicOverview: 'Financial capital of India',
      majorCompanies: 'Reliance, Tata Group, HDFC',
      stockExchanges: 'BSE, NSE',
      isActive: true
    },
    {
      id: '2',
      name: 'Delhi',
      state: 'Delhi',
      population: '16.8 million',
      economicOverview: 'Political and commercial hub',
      majorCompanies: 'Bharti Airtel, Hero MotoCorp',
      stockExchanges: 'NSE Regional Office',
      isActive: true
    }
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">City Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New City
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Cities</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCities.map((city) => (
              <div key={city.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{city.name}, {city.state}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Population: {city.population}</span>
                      <span>Stock Exchanges: {city.stockExchanges}</span>
                      <span>Major Companies: {city.majorCompanies}</span>
                      <span>Economic: {city.economicOverview}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={city.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {city.isActive ? 'Active' : 'Inactive'}
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
            <CardTitle>Add New City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">City Name</Label>
                <Input id="name" placeholder="Enter city name" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Enter state name" />
              </div>
              <div>
                <Label htmlFor="population">Population</Label>
                <Input id="population" placeholder="e.g., 20.4 million" />
              </div>
              <div>
                <Label htmlFor="stockExchanges">Stock Exchanges</Label>
                <Input id="stockExchanges" placeholder="e.g., BSE, NSE" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="economicOverview">Economic Overview</Label>
                <Textarea id="economicOverview" placeholder="Brief economic overview" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="majorCompanies">Major Companies</Label>
                <Input id="majorCompanies" placeholder="e.g., Reliance, Tata Group" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save City</Button>
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

export default CityManagement;
