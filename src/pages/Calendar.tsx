
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import AdPlacement from '@/components/AdPlacement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, Building2, TrendingUp, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type IPO = Tables<'ipos'>;
type NFO = Tables<'nfos'>;

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'ipo' | 'nfo';
  status: string;
  category?: string;
  eventType: 'open' | 'close' | 'listing' | 'allotment';
  priceRange?: string;
  issueSize?: string;
}

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateStr);
      setSelectedEvents(dayEvents);
    }
  }, [selectedDate, events]);

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration - in real app this would come from Supabase
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Tech Solutions IPO Opens',
          date: '2024-01-15',
          type: 'ipo',
          status: 'upcoming',
          eventType: 'open',
          priceRange: '₹100-120',
          issueSize: '₹500 Cr'
        },
        {
          id: '2',
          title: 'Green Energy IPO Closes',
          date: '2024-01-17',
          type: 'ipo',
          status: 'open',
          eventType: 'close',
          priceRange: '₹80-95',
          issueSize: '₹300 Cr'
        },
        {
          id: '3',
          title: 'Tech Solutions IPO Listing',
          date: '2024-01-20',
          type: 'ipo',
          status: 'upcoming',
          eventType: 'listing',
          priceRange: '₹100-120',
          issueSize: '₹500 Cr'
        },
        {
          id: '4',
          title: 'Blue Chip Fund NFO Opens',
          date: '2024-01-18',
          type: 'nfo',
          status: 'upcoming',
          eventType: 'open',
          issueSize: '₹200 Cr'
        }
      ];

      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'close': return 'bg-red-100 text-red-800';
      case 'listing': return 'bg-blue-100 text-blue-800';
      case 'allotment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'ipo' ? <TrendingUp className="h-4 w-4" /> : <Building2 className="h-4 w-4" />;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get dates that have events for calendar marking
  const eventDates = events.map(event => new Date(event.date));

  // Custom day renderer for calendar
  const modifiers = {
    hasEvent: eventDates
  };

  const modifiersStyles = {
    hasEvent: { 
      backgroundColor: '#3b82f6', 
      color: 'white',
      borderRadius: '50%'
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <AIChatbot />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IPO & NFO Calendar</h1>
          <p className="text-gray-600">
            Track important dates for IPOs, NFOs, and investment opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-8">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Investment Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Calendar Component */}
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                      className="rounded-md border w-full"
                    />
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <span>Days with events</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Date Events */}
                  <div className="lg:w-80">
                    <h3 className="font-semibold mb-4">
                      {selectedDate ? formatDate(selectedDate.toISOString()) : 'Select a date'}
                    </h3>
                    
                    {selectedEvents.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No events on this date</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedEvents.map((event) => (
                          <Card key={event.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {getTypeIcon(event.type)}
                                  <Badge variant="outline" className={getEventTypeColor(event.eventType)}>
                                    {event.eventType.toUpperCase()}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {event.type.toUpperCase()}
                                  </Badge>
                                </div>
                                
                                <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                                
                                {event.priceRange && (
                                  <div className="text-xs text-gray-600">
                                    Price: {event.priceRange}
                                  </div>
                                )}
                                
                                {event.issueSize && (
                                  <div className="text-xs text-gray-600">
                                    Size: {event.issueSize}
                                  </div>
                                )}
                              </div>
                              
                              <Button variant="outline" size="sm" className="ml-2">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Banner Ad */}
            <div className="mt-6">
              <AdPlacement size="banner" position="calendar-middle" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{event.title}</div>
                          <div className="text-xs text-gray-500">{formatDate(event.date)}</div>
                        </div>
                        <Badge variant="outline" className={getEventTypeColor(event.eventType)}>
                          {event.eventType}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All Events
                  </Button>
                </CardContent>
              </Card>

              {/* Sidebar Ads */}
              <AdPlacement size="sidebar" position="calendar-sidebar" />
            </div>
          </div>
        </div>
      </div>

      <AIChatbot />
      <Footer />
    </div>
  );
};

export default CalendarPage;
