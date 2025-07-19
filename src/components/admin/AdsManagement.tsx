
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Image,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const AdsManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data
  const ads = [
    {
      id: '1',
      title: 'Zerodha Brokerage',
      description: 'India\'s largest discount broker',
      position: 'header',
      size: 'banner',
      imageUrl: '/placeholder.svg',
      linkUrl: 'https://zerodha.com',
      isActive: true
    },
    {
      id: '2',
      title: 'HDFC Bank IPO Services',
      description: 'Apply for IPOs with HDFC Bank',
      position: 'sidebar',
      size: 'square',
      imageUrl: '/placeholder.svg',
      linkUrl: 'https://hdfcbank.com',
      isActive: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ads Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Ad
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Ads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Active Ads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">45K</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">2.3%</p>
                <p className="text-sm text-muted-foreground">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Advertisements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">{ad.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Position: {ad.position}</span>
                        <span>Size: {ad.size}</span>
                        <span>Link: {ad.linkUrl}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={ad.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {ad.isActive ? 'Active' : 'Inactive'}
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
            <CardTitle>Add New Advertisement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Ad Title</Label>
                <Input id="title" placeholder="Enter ad title" />
              </div>
              <div>
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input id="linkUrl" placeholder="https://example.com" />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <select id="position" className="w-full px-3 py-2 border rounded-md">
                  <option value="header">Header</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="footer">Footer</option>
                  <option value="inline">Inline</option>
                </select>
              </div>
              <div>
                <Label htmlFor="size">Size</Label>
                <select id="size" className="w-full px-3 py-2 border rounded-md">
                  <option value="banner">Banner</option>
                  <option value="square">Square</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="skyscraper">Skyscraper</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the ad" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" placeholder="https://example.com/image.jpg" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save Advertisement</Button>
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

export default AdsManagement;
