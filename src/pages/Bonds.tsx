
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import AIChatbot from '@/components/AIChatbot';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, SortAsc, Calendar, DollarSign, TrendingUp, FileText } from 'lucide-react';

const Bonds = () => {
  const [searchParams] = useSearchParams();
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pageLoading, setPageLoading] = useState(false);

  // Mock bond data
  const mockBonds = [
    {
      id: '1',
      name: 'HDFC Bank Bond Series 1',
      status: 'upcoming',
      interest: '7.5%',
      tenure: '5 years',
      interestPayout: 'Annual',
      rating: 'AAA',
      faceValue: '₹1,000',
      minInvestment: '₹10,000',
      ipoSize: '₹2,500 Cr',
      openDate: '2024-02-01',
      closeDate: '2024-02-10',
      allotmentDate: '2024-02-15',
      listingDate: '2024-02-20'
    },
    {
      id: '2',
      name: 'ICICI Bank Green Bond',
      status: 'open',
      interest: '8.2%',
      tenure: '3 years 6 months',
      interestPayout: 'Semi-Annual',
      rating: 'AA+',
      faceValue: '₹1,000',
      minInvestment: '₹5,000',
      ipoSize: '₹1,800 Cr',
      openDate: '2024-01-20',
      closeDate: '2024-01-25',
      allotmentDate: '2024-01-30',
      listingDate: '2024-02-05'
    }
  ];

  useEffect(() => {
    const status = searchParams.get('status');
    if (status && ['upcoming', 'open', 'closed', 'listed'].includes(status)) {
      setActiveTab(status);
    }
    // Simulate data loading
    setTimeout(() => {
      setBonds(mockBonds);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const filteredBonds = bonds.filter(bond => bond.status === activeTab);

  const handleTabChange = (value: string) => {
    setPageLoading(true);
    setTimeout(() => {
      setActiveTab(value);
      setPageLoading(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'listed': return 'bg-purple-100 text-purple-800';
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="bonds-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Bond IPOs
              </h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Explore Bond IPO opportunities with detailed analysis and insights.
                Invest in government and corporate bonds with attractive interest rates.
              </p>

              {/* Banner Ad */}
              <div className="mb-6">
                <AdPlacement size="banner" position="bonds-hero-banner" />
              </div>

              {/* Bond Tabs */}
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="upcoming" className="text-xs sm:text-sm">Upcoming</TabsTrigger>
                  <TabsTrigger value="open" className="text-xs sm:text-sm">Open</TabsTrigger>
                  <TabsTrigger value="closed" className="text-xs sm:text-sm">Closed</TabsTrigger>
                  <TabsTrigger value="listed" className="text-xs sm:text-sm">Listed</TabsTrigger>
                </TabsList>

                {['upcoming', 'open', 'closed', 'listed'].map((status) => (
                  <TabsContent key={status} value={status} className="mt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <h2 className="text-lg sm:text-xl font-semibold capitalize">
                        {status} Bond IPOs
                      </h2>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Filter</span>
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <SortAsc className="h-4 w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Sort</span>
                        </Button>
                      </div>
                    </div>

                    {filteredBonds.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No {status} Bond IPOs found.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {filteredBonds.map((bond) => (
                          <Card key={bond.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start mb-2">
                                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                                  {bond.name}
                                </CardTitle>
                                <Badge className={getStatusColor(bond.status)}>
                                  {bond.status.charAt(0).toUpperCase() + bond.status.slice(1)}
                                </Badge>
                              </div>
                              
                              {/* Key Metrics */}
                              <div className="grid grid-cols-2 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="text-xs text-gray-600">Interest Rate</div>
                                  <div className="text-lg font-bold text-green-600">{bond.interest}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-600">Tenure</div>
                                  <div className="text-sm font-semibold">{bond.tenure}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-600">Payout</div>
                                  <div className="text-sm font-semibold">{bond.interestPayout}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-600">Rating</div>
                                  <div className="text-sm font-bold text-blue-600">{bond.rating}</div>
                                </div>
                              </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Face Value:</span>
                                  <span className="font-semibold">{bond.faceValue}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Min Investment:</span>
                                  <span className="font-semibold">{bond.minInvestment}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Issue Size:</span>
                                  <span className="font-semibold">{bond.ipoSize}</span>
                                </div>
                                
                                <div className="flex items-center mt-3 text-xs text-gray-600">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{bond.openDate} to {bond.closeDate}</span>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 mt-4">
                                <Button size="sm" className="flex-1 text-xs">
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Docs
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Ad after content */}
                    {filteredBonds.length > 6 && (
                      <div className="mt-8">
                        <AdPlacement size="banner" position={`bonds-${status}-content`} />
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Mobile Banner Ad */}
            <div className="lg:hidden mb-6">
              <AdPlacement size="mobile" position="bonds-mobile-banner" />
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="bonds-right-sidebar-1" />
              <AdPlacement size="square" position="bonds-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Bonds;
