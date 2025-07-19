
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Building2, TrendingUp } from 'lucide-react';
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
}

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch IPO events
      const { data: ipoData, error: ipoError } = await supabase
        .from('ipos')
        .select('*')
        .not('open_date', 'is', null)
        .order('open_date', { ascending: true });

      if (ipoError) throw ipoError;

      // Fetch NFO events
      const { data: nfoData, error: nfoError } = await supabase
        .from('nfos')
        .select('*')
        .not('open_date', 'is', null)
        .order('open_date', { ascending: true });

      if (nfoError) throw nfoError;

      // Process IPO events
      const ipoEvents: CalendarEvent[] = [];
      
      ipoData?.forEach((ipo) => {
        if (ipo.open_date) {
          ipoEvents.push({
            id: `ipo-open-${ipo.id}`,
            title: `${ipo.name} Opens`,
            date: ipo.open_date,
            type: 'ipo',
            status: ipo.status,
            category: ipo.type,
            eventType: 'open'
          });
        }
        
        if (ipo.close_date) {
          ipoEvents.push({
            id: `ipo-close-${ipo.id}`,
            title: `${ipo.name} Closes`,
            date: ipo.close_date,
            type: 'ipo',
            status: ipo.status,
            category: ipo.type,
            eventType: 'close'
          });
        }
        
        if (ipo.listing_date) {
          ipoEvents.push({
            id: `ipo-listing-${ipo.id}`,
            title: `${ipo.name} Listing`,
            date: ipo.listing_date,
            type: 'ipo',
            status: ipo.status,
            category: ipo.type,
            eventType: 'listing'
          });
        }
      });

      // Process NFO events
      const nfoEvents: CalendarEvent[] = [];
      
      nfoData?.forEach((nfo) => {
        if (nfo.open_date) {
          nfoEvents.push({
            id: `nfo-open-${nfo.id}`,
            title: `${nfo.name} Opens`,
            date: nfo.open_date,
            type: 'nfo',
            status: nfo.status,
            category: nfo.type,
            eventType: 'open'
          });
        }
        
        if (nfo.close_date) {
          nfoEvents.push({
            id: `nfo-close-${nfo.id}`,
            title: `${nfo.name} Closes`,
            date: nfo.close_date,
            type: 'nfo',
            status: nfo.status,
            category: nfo.type,
            eventType: 'close'
          });
        }
        
        if (nfo.allotment_date) {
          nfoEvents.push({
            id: `nfo-allotment-${nfo.id}`,
            title: `${nfo.name} Allotment`,
            date: nfo.allotment_date,
            type: 'nfo',
            status: nfo.status,
            category: nfo.type,
            eventType: 'allotment'
          });
        }
      });

      setEvents([...ipoEvents, ...nfoEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
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

  // Filter events for current view
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    if (selectedView === 'week') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return eventDate >= weekStart && eventDate <= weekEnd;
    } else {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      return eventDate >= monthStart && eventDate <= monthEnd;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="calendar-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">IPO & NFO Calendar</h1>
                  <p className="text-gray-600">
                    Stay updated with upcoming IPO and NFO dates, openings, closings, and listings
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={selectedView === 'week' ? 'default' : 'outline'}
                    onClick={() => setSelectedView('week')}
                  >
                    Week View
                  </Button>
                  <Button
                    variant={selectedView === 'month' ? 'default' : 'outline'}
                    onClick={() => setSelectedView('month')}
                  >
                    Month View
                  </Button>
                </div>
              </div>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="calendar-hero-banner" className="mb-6" />

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading calendar events...</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No events found for the selected period.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(event.type)}
                              <Badge variant="outline" className={getEventTypeColor(event.eventType)}>
                                {event.eventType.toUpperCase()}
                              </Badge>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{formatDate(event.date)}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {event.type.toUpperCase()}
                                </Badge>
                                {event.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {event.category.toUpperCase()}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Banner Ad */}
              <AdPlacement size="banner" position="calendar-middle" className="mt-8" />
            </div>

            {/* Mobile Banner Ad */}
            <div className="lg:hidden mb-6">
              <AdPlacement size="mobile" position="calendar-mobile-banner" />
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="calendar-right-sidebar-1" />
              <AdPlacement size="square" position="calendar-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Calendar;
