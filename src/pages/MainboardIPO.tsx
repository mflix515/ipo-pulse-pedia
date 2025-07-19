
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import EnhancedIPOCard from '@/components/EnhancedIPOCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Filter, SortAsc } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type IPO = Tables<'ipos'>;

const MainboardIPO = () => {
  const [searchParams] = useSearchParams();
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const status = searchParams.get('status');
    
    if (status && ['upcoming', 'open', 'closed', 'listed'].includes(status)) {
      setActiveTab(status);
    }

    fetchMainboardIPOs();
  }, [searchParams]);

  const fetchMainboardIPOs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ipos')
        .select('*')
        .eq('type', 'mainboard')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIpos(data || []);
    } catch (error) {
      console.error('Error fetching Mainboard IPOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIPOs = ipos.filter(ipo => ipo.status === activeTab);

  const handleTabChange = (value: string) => {
    setPageLoading(true);
    setTimeout(() => {
      setActiveTab(value);
      setPageLoading(false);
    }, 500);
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
            <AdPlacement size="sidebar" position="mainboard-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Mainboard IPOs
              </h1>
              <p className="text-gray-600 mb-6">
                Comprehensive information about Mainboard IPO listings, analysis, and investment opportunities.
                Track large-cap IPOs with detailed insights and real-time updates.
              </p>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="mainboard-hero-banner" className="mb-6" />

              {/* IPO Tabs */}
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                  <TabsTrigger value="listed">Listed</TabsTrigger>
                </TabsList>

                {['upcoming', 'open', 'closed', 'listed'].map((status) => (
                  <TabsContent key={status} value={status} className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold capitalize">
                        {status} Mainboard IPOs
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

                    {filteredIPOs.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No {status} Mainboard IPOs found.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredIPOs.map((ipo) => (
                          <EnhancedIPOCard
                            key={ipo.id}
                            ipo={{
                              id: parseInt(ipo.id),
                              company: ipo.name,
                              openDate: ipo.open_date || undefined,
                              closeDate: ipo.close_date || undefined,
                              priceRange: ipo.price_range || undefined,
                              lotSize: ipo.lot_size || undefined,
                              minInvestment: ipo.min_investment || undefined,
                              issueSize: ipo.issue_size || undefined,
                              gmp: ipo.gmp || undefined,
                              profitPerLot: ipo.profit_per_lot || undefined,
                              category: ipo.category || ipo.type,
                              subscriptionRate: ipo.subscription_rate || undefined,
                              listingPrice: ipo.listing_price || undefined,
                              currentPrice: ipo.current_price || undefined,
                              change: ipo.change_percentage || undefined,
                              listingDate: ipo.listing_date || undefined,
                            }}
                            type={status as 'upcoming' | 'open' | 'closed' | 'listed'}
                          />
                        ))}
                      </div>
                    )}

                    {/* Ad after every 6 IPOs */}
                    {filteredIPOs.length > 6 && (
                      <div className="mt-8">
                        <AdPlacement size="banner" position={`mainboard-${status}-content`} />
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Mobile Banner Ad */}
            <div className="lg:hidden mb-6">
              <AdPlacement size="mobile" position="mainboard-mobile-banner" />
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="mainboard-right-sidebar-1" />
              <AdPlacement size="square" position="mainboard-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainboardIPO;
