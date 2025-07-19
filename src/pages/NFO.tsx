
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, SortAsc, TrendingUp, Calendar, DollarSign, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NFO = Tables<'nfos'>;

const NFO = () => {
  const [searchParams] = useSearchParams();
  const [nfos, setNfos] = useState<NFO[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedType, setSelectedType] = useState<'all' | 'equity' | 'debt' | 'hybrid'>('all');
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    
    if (type && ['equity', 'debt', 'hybrid'].includes(type)) {
      setSelectedType(type as 'equity' | 'debt' | 'hybrid');
    }
    
    if (status && ['upcoming', 'open', 'closed', 'allotted'].includes(status)) {
      setActiveTab(status);
    }

    fetchNFOs();
  }, [searchParams]);

  const fetchNFOs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('nfos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNfos(data || []);
    } catch (error) {
      console.error('Error fetching NFOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNFOs = nfos.filter(nfo => {
    const matchesStatus = nfo.status === activeTab;
    const matchesType = selectedType === 'all' || nfo.type === selectedType;
    return matchesStatus && matchesType;
  });

  const handleTabChange = (value: string) => {
    setPageLoading(true);
    setTimeout(() => {
      setActiveTab(value);
      setPageLoading(false);
    }, 500);
  };

  const getRiskColor = (risk: string | null) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {pageLoading && <LoadingSpinner />}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="nfo-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                New Fund Offers (NFO)
              </h1>
              <p className="text-gray-600 mb-6">
                Discover new mutual fund opportunities with comprehensive NFO information, analysis, and investment guidance.
                Track equity, debt, and hybrid fund launches with expert insights.
              </p>
              
              {/* Type Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  All NFOs
                </Button>
                <Button
                  variant={selectedType === 'equity' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('equity')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Equity Funds
                </Button>
                <Button
                  variant={selectedType === 'debt' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('debt')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Debt Funds
                </Button>
                <Button
                  variant={selectedType === 'hybrid' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('hybrid')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Hybrid Funds
                </Button>
              </div>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="nfo-hero-banner" className="mb-6" />

              {/* NFO Tabs */}
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                  <TabsTrigger value="allotted">Allotted</TabsTrigger>
                </TabsList>

                {['upcoming', 'open', 'closed', 'allotted'].map((status) => (
                  <TabsContent key={status} value={status} className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold capitalize">
                        {status} NFOs {selectedType !== 'all' && `(${selectedType.toUpperCase()})`}
                      </h2>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <SortAsc className="h-4 w-4 mr-2" />
                          Sort
                        </Button>
                      </div>
                    </div>

                    {filteredNFOs.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No {status} NFOs found.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredNFOs.map((nfo) => (
                          <Card key={nfo.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold line-clamp-2">
                                  {nfo.name}
                                </CardTitle>
                                <Badge variant="outline" className={getRiskColor(nfo.risk_level)}>
                                  {nfo.risk_level || 'Moderate'}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Building className="h-4 w-4" />
                                <span>{nfo.fund_house}</span>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Type</p>
                                  <p className="font-medium capitalize">{nfo.type}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Category</p>
                                  <p className="font-medium">{nfo.category || 'N/A'}</p>
                                </div>
                              </div>

                              {(nfo.open_date || nfo.close_date) && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {nfo.open_date && new Date(nfo.open_date).toLocaleDateString()} 
                                    {nfo.open_date && nfo.close_date && ' - '}
                                    {nfo.close_date && new Date(nfo.close_date).toLocaleDateString()}
                                  </span>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Min Investment</p>
                                  <p className="font-medium">₹{nfo.minimum_investment || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Expense Ratio</p>
                                  <p className="font-medium">{nfo.expense_ratio || 'N/A'}</p>
                                </div>
                              </div>

                              {nfo.investment_objective && (
                                <div className="text-sm">
                                  <p className="text-gray-600 mb-1">Objective</p>
                                  <p className="text-gray-800 line-clamp-2">{nfo.investment_objective}</p>
                                </div>
                              )}

                              <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center space-x-1 text-sm">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  <span className="text-gray-600">
                                    {nfo.fund_manager || 'Professional Management'}
                                  </span>
                                </div>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Ad after every 6 NFOs */}
                    {filteredNFOs.length > 6 && (
                      <div className="mt-8">
                        <AdPlacement size="banner" position={`nfo-${status}-content`} />
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Mobile Banner Ad */}
            <div className="lg:hidden mb-6">
              <AdPlacement size="mobile" position="nfo-mobile-banner" />
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="nfo-right-sidebar-1" />
              <AdPlacement size="square" position="nfo-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NFO;
