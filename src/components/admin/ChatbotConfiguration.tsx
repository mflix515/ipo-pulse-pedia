
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { 
  Bot,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Save,
  X
} from 'lucide-react';

interface ChatbotResponse {
  id: string;
  trigger_keywords: string;
  response_message: string;
  category: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ChatbotConfiguration = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    trigger_keywords: '',
    response_message: '',
    category: 'General',
    is_active: true
  });

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chatbot_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleEdit = (response: ChatbotResponse) => {
    setEditingId(response.id);
    setFormData({
      trigger_keywords: response.trigger_keywords,
      response_message: response.response_message,
      category: response.category || 'General',
      is_active: response.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      try {
        const { error } = await supabase
          .from('chatbot_responses')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setResponses(prev => prev.filter(response => response.id !== id));
        console.log('Response deleted successfully');
      } catch (error) {
        console.error('Error deleting response:', error);
        alert('Failed to delete response');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing response
        const { error } = await supabase
          .from('chatbot_responses')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        console.log('Response updated successfully');
      } else {
        // Create new response
        const { error } = await supabase
          .from('chatbot_responses')
          .insert(formData);

        if (error) throw error;
        
        console.log('Response created successfully');
      }

      await fetchResponses();
      handleCancel();
    } catch (error) {
      console.error('Error saving response:', error);
      alert('Failed to save response');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      trigger_keywords: '',
      response_message: '',
      category: 'General',
      is_active: true
    });
  };

  if (loading) {
    return <div className="p-6">Loading chatbot responses...</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Chatbot Configuration
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <Plus className="h-4 w-4" />
          Add Response
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Total Queries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-gray-600">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{responses.filter(r => r.is_active).length}</p>
                <p className="text-sm text-gray-600">Active Responses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <CardTitle className="text-gray-800">Predefined Responses</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-800">{response.trigger_keywords}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {response.category}
                      </span>
                      {!response.is_active && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{response.response_message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(response)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(response.id)}
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
            <CardTitle className="text-gray-800">{editingId ? 'Edit Response' : 'Add New Response'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="trigger_keywords" className="text-gray-700">Trigger Keywords</Label>
              <Input 
                id="trigger_keywords" 
                placeholder="e.g., IPO application, check status" 
                value={formData.trigger_keywords}
                onChange={(e) => setFormData({...formData, trigger_keywords: e.target.value})}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-700">Category</Label>
              <select 
                id="category" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="IPO Help">IPO Help</option>
                <option value="NFO Help">NFO Help</option>
                <option value="Allotment">Allotment</option>
                <option value="Technical">Technical Support</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <Label htmlFor="response_message" className="text-gray-700">Response Message</Label>
              <Textarea
                id="response_message"
                placeholder="Enter the bot response message"
                rows={4}
                value={formData.response_message}
                onChange={(e) => setFormData({...formData, response_message: e.target.value})}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Update Response' : 'Save Response'}
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

export default ChatbotConfiguration;
