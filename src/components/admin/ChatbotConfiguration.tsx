
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot,
  Plus,
  Edit,
  Trash2,
  MessageSquare
} from 'lucide-react';

const ChatbotConfiguration = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for predefined responses
  const responses = [
    {
      id: '1',
      trigger: 'IPO application',
      response: 'To apply for an IPO, you need to have a demat account and sufficient funds. Would you like help with the application process?',
      category: 'IPO Help'
    },
    {
      id: '2',
      trigger: 'Check allotment',
      response: 'You can check your IPO allotment status in the Profile section under "Check Allotment Status". Do you need help navigating there?',
      category: 'Allotment'
    },
    {
      id: '3',
      trigger: 'NFO information',
      response: 'NFO stands for New Fund Offer. These are newly launched mutual funds. Would you like to see the current NFO listings?',
      category: 'NFO Help'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chatbot Configuration</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Response
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Queries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Active Responses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predefined Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{response.trigger}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {response.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{response.response}</p>
                  </div>
                  <div className="flex items-center gap-2">
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
            <CardTitle>Add New Response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trigger">Trigger Keywords</Label>
              <Input id="trigger" placeholder="e.g., IPO application, check status" />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select id="category" className="w-full px-3 py-2 border rounded-md">
                <option value="IPO Help">IPO Help</option>
                <option value="NFO Help">NFO Help</option>
                <option value="Allotment">Allotment</option>
                <option value="Technical">Technical Support</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <Label htmlFor="response">Response Message</Label>
              <Textarea
                id="response"
                placeholder="Enter the bot response message"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button>Save Response</Button>
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

export default ChatbotConfiguration;
