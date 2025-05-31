
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock IPO data for the calendar
  const ipoEvents = [
    {
      date: '2024-01-15',
      name: 'Tech Corp Limited',
      type: 'Opening',
      status: 'upcoming'
    },
    {
      date: '2024-01-17',
      name: 'Green Energy Solutions',
      type: 'Closing',
      status: 'open'
    },
    {
      date: '2024-01-20',
      name: 'FinTech Innovations',
      type: 'Listing',
      status: 'closed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">IPO Calendar</h1>
          <p className="text-lg text-gray-600">
            Track important IPO dates including opening, closing, and listing dates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ipoEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{event.name}</h4>
                      <Badge 
                        variant={event.status === 'open' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">IPO Opening</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">IPO Closing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Listing Date</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Calendar;
