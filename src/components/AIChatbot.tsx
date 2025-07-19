
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your IPO assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedQueries = [
    'What is an IPO?',
    'How to apply for IPO?',
    'Check IPO allotment status',
    'IPO listing process',
    'NFO vs IPO difference',
    'Bond investment guide'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your query about "${inputMessage}". Our team will get back to you shortly with detailed information.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handlePredefinedQuery = (query: string) => {
    setInputMessage(query);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-0'
        }`}
      >
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <Card className="w-80 sm:w-96 h-96 shadow-2xl border-0 bg-white">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">IPO Assistant</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-80">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Predefined Queries */}
                {messages.length === 1 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600 font-medium">Quick Questions:</p>
                    {predefinedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePredefinedQuery(query)}
                        className="w-full text-left justify-start text-xs h-8"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AIChatbot;
