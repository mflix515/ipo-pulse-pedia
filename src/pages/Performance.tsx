
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type IPOPerformance = Tables<'ipo_performance'>;

const Performance = () => {
  const [performances, setPerformances] = useState<IPOPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ipo_performance')
        .select('*')
        .order('issue_date', { ascending: false });

      if (error) throw error;
      setPerformances(data || []);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return `₹${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number | null) => {
    if (!value) return 'N/A';
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="performance-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">IPO Performance</h1>
              <p className="text-gray-600 mb-6">
                Track the performance of recently listed IPOs and analyze their market returns.
              </p>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="performance-hero-banner" className="mb-6" />

              {/* Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total IPOs Tracked</p>
                        <p className="text-2xl font-bold text-gray-900">{performances.length}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Positive Returns</p>
                        <p className="text-2xl font-bold text-green-600">
                          {performances.filter(p => (p.profit_loss || 0) > 0).length}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Negative Returns</p>
                        <p className="text-2xl font-bold text-red-600">
                          {performances.filter(p => (p.profit_loss || 0) < 0).length}
                        </p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Table */}
              <div className="space-y-4">
                {performances.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No performance data available yet.</p>
                  </div>
                ) : (
                  performances.map((performance) => (
                    <Card key={performance.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {performance.ipo_name}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(performance.issue_date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Issue Price</p>
                            <p className="font-semibold">{formatCurrency(performance.issue_price)}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Listing Price</p>
                            <p className="font-semibold">{formatCurrency(performance.listing_price)}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Current Price</p>
                            <p className="font-semibold">{formatCurrency(performance.current_price)}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-gray-600">P&L</p>
                            <Badge 
                              variant={
                                (performance.profit_loss || 0) > 0 ? "default" : "destructive"
                              }
                              className={
                                (performance.profit_loss || 0) > 0 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {performance.profit_loss && performance.profit_loss > 0 ? '+' : ''}
                              {formatPercentage(performance.profit_loss)}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Content Ad */}
              {performances.length > 5 && (
                <div className="mt-8">
                  <AdPlacement size="banner" position="performance-content" />
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="performance-right-sidebar-1" />
              <AdPlacement size="square" position="performance-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Performance;
