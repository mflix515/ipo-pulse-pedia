
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Save,
  X
} from 'lucide-react';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contentPages, setContentPages] = useState<ContentPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    is_published: false
  });

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContentPages(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const filteredContent = contentPages.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (content: ContentPage) => {
    setEditingId(content.id);
    setFormData({
      title: content.title,
      slug: content.slug,
      content: content.content || '',
      meta_description: content.meta_description || '',
      is_published: content.is_published
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        const { error } = await supabase
          .from('content_pages')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setContentPages(prev => prev.filter(content => content.id !== id));
        console.log('Content deleted successfully');
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('Failed to delete content');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing content
        const { error } = await supabase
          .from('content_pages')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        console.log('Content updated successfully');
      } else {
        // Create new content
        const { error } = await supabase
          .from('content_pages')
          .insert(formData);

        if (error) throw error;
        
        console.log('Content created successfully');
      }

      await fetchContent();
      handleCancel();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      meta_description: '',
      is_published: false
    });
  };

  if (loading) {
    return <div className="p-6">Loading content...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Content Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <Plus className="h-4 w-4" />
          Add New Content
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">All Content</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Slug: {item.slug}</span>
                      <span>Updated: {new Date(item.updated_at).toLocaleDateString()}</span>
                    </div>
                    {item.meta_description && (
                      <p className="text-sm text-gray-600 mt-1">{item.meta_description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={item.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
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
            <CardTitle className="text-gray-800">{editingId ? 'Edit Content' : 'Add New Content'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-gray-700">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter title" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-gray-700">Slug</Label>
                <Input 
                  id="slug" 
                  placeholder="Enter slug" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="meta_description" className="text-gray-700">Meta Description</Label>
                <Textarea 
                  id="meta_description" 
                  placeholder="Brief meta description" 
                  rows={2}
                  value={formData.meta_description}
                  onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="content" className="text-gray-700">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Full content" 
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={() => {
                  setFormData({...formData, is_published: true});
                  setTimeout(handleSave, 100);
                }}
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                Publish
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setFormData({...formData, is_published: false});
                  setTimeout(handleSave, 100);
                }}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Save as Draft
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

export default ContentManagement;
