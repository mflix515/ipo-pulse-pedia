
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopHeaderSlider from '@/components/TopHeaderSlider';
import JoinUsSection from '@/components/JoinUsSection';
import AdPlacement from '@/components/AdPlacement';
import SuccessStoriesSlider from '@/components/SuccessStoriesSlider';
import EnhancedIPOCard from '@/components/EnhancedIPOCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Filter, SortAsc } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface IPO {
  id: string;
  name: string;
  type: 'mainboard' | 'sme';
  status: 'upcoming' | 'open' | 'closed' | 'listed';
  price_range: string | null;
  lot_size: number | null;
  min_investment: string | null;
  issue_size: string | null;
  open_date: string | null;
  close_date: string | null;
  listing_date: string | null;
  gmp: string | null;
  profit_per_lot: string | null;
  category: string | null;
  subscription_rate: string | null;
  listing_price: string | null;
  current_price: string | null;
  change_percentage: string | null;
  created_at: string;
  updated_at: string;
  company_description: string | null;
  financial_highlights: string | null;
  shareholding_pattern: any | null;
  subscription_details: any | null;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedType, setSelectedType] = useState<'all' | 'mainboard' | 'sme'>('all');
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    
    if (type && ['mainboard', 'sme'].includes(type)) {
      setSelectedType(type as 'mainboard' | 'sme');
    }
    
    if (status && ['upcoming', 'open', 'closed', 'listed'].includes(status)) {
      setActiveTab(status);
    }

    fetchIPOs();
  }, [searchParams]);

  const fetchIPOs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ipos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIpos(data || []);
    } catch (error) {
      console.error('Error fetching IPOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIPOs = ipos.filter(ipo => {
    const matchesStatus = ipo.status === activeTab;
    const matchesType = selectedType === 'all' || ipo.type === selectedType;
    return matchesStatus && matchesType;
  });

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
      <TopHeaderSlider />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Ads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to IPO-Pedia
              </h1>
              <p className="text-gray-600 mb-6">
                Your comprehensive platform for IPO information, analysis, and investment guidance.
                Track Mainboard and SME IPOs with real-time updates and expert insights.
              </p>
              
              {/* Type Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  All IPOs
                </Button>
                <Button
                  variant={selectedType === 'mainboard' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('mainboard')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Mainboard IPO
                </Button>
                <Button
                  variant={selectedType === 'sme' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('sme')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  SME IPO
                </Button>
              </div>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="hero-banner" className="mb-6" />

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
                        {status} IPOs {selectedType !== 'all' && `(${selectedType.toUpperCase()})`}
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
                        <p className="text-gray-500">No {status} IPOs found.</p>
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
                        <AdPlacement size="banner" position={`${status}-content`} />
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Success Stories Section */}
            <div className="mb-8">
              <SuccessStoriesSlider />
            </div>

            {/* Mobile Banner Ad */}
            <div className="lg:hidden mb-6">
              <AdPlacement size="mobile" position="mobile-banner" />
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="right-sidebar-1" />
              <AdPlacement size="square" position="right-sidebar-2" />
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <JoinUsSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
