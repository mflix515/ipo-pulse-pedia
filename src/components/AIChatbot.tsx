
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, RotateCcw, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sessionId: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const predefinedQueries = [
    'What is an IPO?',
    'How to apply for IPO?',
    'Check IPO allotment status',
    'IPO listing process',
    'NFO vs IPO difference',
    'Bond investment guide',
    'Best IPO to invest now',
    'IPO GMP meaning'
  ];

  // Create new session when chatbot opens
  useEffect(() => {
    if (isOpen && !currentSessionId) {
      startNewSession();
    }
  }, [isOpen]);

  const startNewSession = () => {
    const newSessionId = `session_${Date.now()}`;
    setCurrentSessionId(newSessionId);
    
    const welcomeMessage: Message = {
      id: `${newSessionId}_welcome`,
      text: 'Hello! I\'m your IPO assistant. How can I help you today? 💰',
      isUser: false,
      timestamp: new Date(),
      sessionId: newSessionId
    };

    setMessages([welcomeMessage]);
    
    // Save to localStorage
    const storedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Chat Session',
      timestamp: new Date(),
      messages: [welcomeMessage]
    };
    
    storedSessions.unshift(newSession);
    localStorage.setItem('chatSessions', JSON.stringify(storedSessions.slice(0, 10))); // Keep last 10 sessions
    setSessions(storedSessions);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !currentSessionId) return;

    const userMessage: Message = {
      id: `${currentSessionId}_${Date.now()}`,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      sessionId: currentSessionId
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');

    // Simulate AI response with more contextual responses
    setTimeout(() => {
      let responseText = '';
      const query = inputMessage.toLowerCase();
      
      if (query.includes('ipo') && query.includes('what')) {
        responseText = 'An IPO (Initial Public Offering) is when a private company offers shares to the public for the first time. It allows companies to raise capital and gives investors a chance to own part of the company. Would you like to know about upcoming IPOs?';
      } else if (query.includes('apply') || query.includes('how')) {
        responseText = 'To apply for an IPO: 1) Open a demat account 2) Check eligibility criteria 3) Apply through ASBA (Applications Supported by Blocked Amount) 4) Submit your application before the closing date. Need help with any specific step?';
      } else if (query.includes('allotment')) {
        responseText = 'You can check IPO allotment status on the registrar\'s website using your PAN number or application number. Most IPO allotments are announced within 7-10 days after the issue closes. Which IPO allotment are you checking?';
      } else if (query.includes('gmp')) {
        responseText = 'GMP (Grey Market Premium) is the price at which IPO shares trade in the unofficial grey market before listing. It indicates market sentiment but doesn\'t guarantee listing performance. Current trending IPOs have varying GMPs.';
      } else if (query.includes('nfo')) {
        responseText = 'NFO (New Fund Offer) is the first-time subscription offer for a mutual fund scheme. Unlike IPOs, NFOs are priced at ₹10 per unit. They\'re good for diversification but research the fund house and strategy first.';
      } else if (query.includes('bond')) {
        responseText = 'Bonds are debt securities that provide fixed returns. Government bonds are safer, while corporate bonds offer higher yields but more risk. Current interest rates affect bond prices inversely. What type of bonds interest you?';
      } else {
        responseText = `Thank you for your query about "${inputMessage}". Based on current market trends and our analysis, I\'d recommend checking our latest IPO updates and expert insights. Is there a specific investment area you\'d like to explore further?`;
      }

      const aiResponse: Message = {
        id: `${currentSessionId}_${Date.now() + 1}`,
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        sessionId: currentSessionId
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      
      // Update session in localStorage
      const storedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
      const updatedSessions = storedSessions.map((session: ChatSession) => 
        session.id === currentSessionId 
          ? { ...session, messages: finalMessages, title: inputMessage.slice(0, 30) + '...' }
          : session
      );
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
      setSessions(updatedSessions);
      
    }, 1000);
  };

  const handlePredefinedQuery = (query: string) => {
    setInputMessage(query);
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const handleNewSession = () => {
    setCurrentSessionId('');
    startNewSession();
    setShowHistory(false);
  };

  useEffect(() => {
    // Load sessions from localStorage on component mount
    const storedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
    setSessions(storedSessions);
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-pulse"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              ●
            </span>
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <Card className="w-80 sm:w-96 h-[500px] shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold">IPO Assistant</CardTitle>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewSession}
                    className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-[420px]">
              {showHistory ? (
                <div className="flex-1 p-4">
                  <h3 className="font-semibold mb-3">Chat History</h3>
                  <ScrollArea className="h-full">
                    <div className="space-y-2">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          onClick={() => loadSession(session)}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-sm">{session.title}</div>
                          <div className="text-xs text-gray-500">
                            {session.timestamp.toLocaleDateString()} - {session.messages.length} messages
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <>
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
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-gray-100 text-gray-800 border'
                            }`}
                          >
                            {message.text}
                            <div className={`text-xs mt-1 opacity-70 ${
                              message.isUser ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString().slice(0, -3)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Predefined Queries */}
                    {messages.length === 1 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600 font-medium">Popular Questions:</p>
                        {predefinedQueries.map((query, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePredefinedQuery(query)}
                            className="w-full text-left justify-start text-xs h-8 hover:bg-blue-50"
                          >
                            {query}
                          </Button>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about IPOs, NFOs, Bonds..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-white"
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Session: {currentSessionId.split('_')[1] || 'New'}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AIChatbot;
