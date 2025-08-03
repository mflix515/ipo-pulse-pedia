
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Image,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X
} from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  position: string;
  size: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdsManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    position: 'header',
    size: 'banner',
    is_active: true
  });

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleEdit = (ad: Ad) => {
    setEditingId(ad.id);
    setFormData({
      title: ad.title,
      description: ad.description || '',
      image_url: ad.image_url || '',
      link_url: ad.link_url || '',
      position: ad.position,
      size: ad.size,
      is_active: ad.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        const { error } = await supabase
          .from('ads')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setAds(prev => prev.filter(ad => ad.id !== id));
        console.log('Ad deleted successfully');
      } catch (error) {
        console.error('Error deleting ad:', error);
        alert('Failed to delete ad');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing ad
        const { error } = await supabase
          .from('ads')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        console.log('Ad updated successfully');
      } else {
        // Create new ad
        const { error } = await supabase
          .from('ads')
          .insert(formData);

        if (error) throw error;
        
        console.log('Ad created successfully');
      }

      await fetchAds();
      handleCancel();
    } catch (error) {
      console.error('Error saving ad:', error);
      alert('Failed to save ad');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link_url: '',
      position: 'header',
      size: 'banner',
      is_active: true
    });
  };

  if (loading) {
    return <div className="p-6">Loading ads...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Ads Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <Plus className="h-4 w-4" />
          Add New Ad
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{ads.length}</p>
                <p className="text-sm text-gray-600">Total Ads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{ads.filter(ad => ad.is_active).length}</p>
                <p className="text-sm text-gray-600">Active Ads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">45K</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">2.3%</p>
                <p className="text-sm text-gray-600">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <CardTitle className="text-gray-800">All Advertisements</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={ad.image_url || '/placeholder.svg'} 
                      alt={ad.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{ad.title}</h3>
                      <p className="text-sm text-gray-600">{ad.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                        <span>Position: {ad.position}</span>
                        <span>Size: {ad.size}</span>
                        <span>Link: {ad.link_url}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={ad.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {ad.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(ad)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(ad.id)}
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
            <CardTitle className="text-gray-800">{editingId ? 'Edit Advertisement' : 'Add New Advertisement'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-gray-700">Ad Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter ad title" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="link_url" className="text-gray-700">Link URL</Label>
                <Input 
                  id="link_url" 
                  placeholder="https://example.com" 
                  value={formData.link_url}
                  onChange={(e) => setFormData({...formData, link_url: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="position" className="text-gray-700">Position</Label>
                <select 
                  id="position" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                >
                  <option value="header">Header</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="footer">Footer</option>
                  <option value="inline">Inline</option>
                </select>
              </div>
              <div>
                <Label htmlFor="size" className="text-gray-700">Size</Label>
                <select 
                  id="size" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                >
                  <option value="banner">Banner</option>
                  <option value="square">Square</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="skyscraper">Skyscraper</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-gray-700">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the ad" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="image_url" className="text-gray-700">Image URL</Label>
                <Input 
                  id="image_url" 
                  placeholder="https://example.com/image.jpg" 
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
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
                {editingId ? 'Update Advertisement' : 'Save Advertisement'}
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

export default AdsManagement;
