
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar
} from 'lucide-react';

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [contentType, setContentType] = useState('blog');

  // Mock data
  const content = [
    {
      id: '1',
      title: 'IPO Investment Guide for Beginners',
      type: 'blog',
      author: 'Admin',
      category: 'Education',
      publishedAt: '2024-01-15',
      status: 'published'
    },
    {
      id: '2',
      title: 'Tech Solutions IPO Opens Today',
      type: 'news',
      author: 'News Team',
      category: 'IPO News',
      publishedAt: '2024-01-14',
      status: 'published'
    }
  ];

  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Content
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Button 
          variant={contentType === 'blog' ? 'default' : 'outline'}
          onClick={() => setContentType('blog')}
        >
          Blog Posts
        </Button>
        <Button 
          variant={contentType === 'news' ? 'default' : 'outline'}
          onClick={() => setContentType('news')}
        >
          News Articles
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All {contentType === 'blog' ? 'Blog Posts' : 'News Articles'}</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContent
              .filter(item => item.type === contentType)
              .map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Author: {item.author}</span>
                      <span>Category: {item.category}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{item.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">
                      {item.status}
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
            <CardTitle>Add New {contentType === 'blog' ? 'Blog Post' : 'News Article'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter title" />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder="Enter author name" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select id="category" className="w-full px-3 py-2 border rounded-md">
                  <option value="Education">Education</option>
                  <option value="IPO News">IPO News</option>
                  <option value="Market Analysis">Market Analysis</option>
                  <option value="Tips">Tips</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" placeholder="Brief excerpt or summary" rows={3} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Full content" rows={10} />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Publish</Button>
              <Button variant="outline">Save as Draft</Button>
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

export default ContentManagement;
