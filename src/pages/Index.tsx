import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Calendar, Calculator, BarChart3, ArrowRight, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopHeaderSlider from '@/components/TopHeaderSlider';
import EnhancedIPOCard from '@/components/EnhancedIPOCard';
import JoinUsSection from '@/components/JoinUsSection';
import AdPlacement from '@/components/AdPlacement';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data for IPOs
  const ipoData = {
    upcoming: [
      {
        id: 1,
        company: 'TechCorp Limited',
        openDate: '2024-06-15',
        closeDate: '2024-06-17',
        priceRange: '₹250-280',
        lotSize: 50,
        minInvestment: '₹12,500',
        issueSize: '₹2,500 Cr',
        gmp: '+₹45',
        profitPerLot: '₹2,250',
        category: 'Technology'
      },
      {
        id: 2,
        company: 'Green Energy Solutions',
        openDate: '2024-06-20',
        closeDate: '2024-06-22',
        priceRange: '₹180-200',
        lotSize: 75,
        minInvestment: '₹13,500',
        issueSize: '₹1,800 Cr',
        gmp: '+₹25',
        profitPerLot: '₹1,875',
        category: 'Energy'
      }
    ],
    open: [
      {
        id: 3,
        company: 'FinServ Bank',
        openDate: '2024-06-01',
        closeDate: '2024-06-03',
        priceRange: '₹350-380',
        lotSize: 40,
        minInvestment: '₹14,000',
        issueSize: '₹5,200 Cr',
        gmp: '+₹65',
        profitPerLot: '₹2,600',
        category: 'Banking',
        subscriptionRate: '4.2x'
      }
    ],
    closed: [
      {
        id: 4,
        company: 'Pharma Innovations',
        openDate: '2024-05-25',
        closeDate: '2024-05-27',
        priceRange: '₹220-240',
        lotSize: 60,
        minInvestment: '₹13,200',
        issueSize: '₹1,500 Cr',
        listingDate: '2024-06-05',
        category: 'Healthcare'
      }
    ],
    listed: [
      {
        id: 5,
        company: 'RetailMart Corp',
        listingPrice: '₹185',
        currentPrice: '₹245',
        change: '+32.4%',
        category: 'Retail'
      }
    ]
  };

  const features = [
    {
      icon: Calendar,
      title: 'IPO Calendar',
      description: 'Track all upcoming and ongoing IPOs with detailed timelines',
      link: '/calendar'
    },
    {
      icon: Calculator,
      title: 'P&L Calculator',
      description: 'Calculate your potential profits and losses with GMP data',
      link: '/calculator'
    },
    {
      icon: BarChart3,
      title: 'Broker Comparison',
      description: 'Compare features and ratings of top stock brokers',
      link: '/broker-comparison'
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Get insights and analysis on IPO performance',
      link: '/blog'
    }
  ];

  const renderIPOCard = (ipo: any, type: string) => (
    <Card key={ipo.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{ipo.company}</CardTitle>
            <Badge variant="secondary" className="mt-1">{ipo.category}</Badge>
          </div>
          {ipo.gmp && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              GMP {ipo.gmp}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {type === 'upcoming' || type === 'open' ? (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Dates:</span>
                <span>{ipo.openDate} to {ipo.closeDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Range:</span>
                <span className="font-medium">{ipo.priceRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Min Investment:</span>
                <span>{ipo.minInvestment}</span>
              </div>
              {ipo.gmp && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit/Lot:</span>
                  <span className="text-green-600 font-medium">{ipo.profitPerLot}</span>
                </div>
              )}
              {ipo.subscriptionRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscription:</span>
                  <span className="font-medium">{ipo.subscriptionRate}</span>
                </div>
              )}
            </>
          ) : type === 'closed' ? (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Issue Dates:</span>
                <span>{ipo.openDate} to {ipo.closeDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Listing Date:</span>
                <span>{ipo.listingDate}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Check Allotment Status
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Listing Price:</span>
                <span>{ipo.listingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-medium">{ipo.currentPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Change:</span>
                <span className="text-green-600 font-medium">{ipo.change}</span>
              </div>
            </>
          )}
        </div>
        <Link to={`/ipo/${ipo.id}`}>
          <Button className="w-full mt-4" variant="outline">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeaderSlider />
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to IPO-Pedia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Your Complete Guide to IPO Investments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button size="lg" variant="secondary" className="text-green-600 hover:bg-white">
                  Try P&L Calculator
                </Button>
              </Link>
              <Link to="/calendar">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  View IPO Calendar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdPlacement size="banner" position="hero-bottom" />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful IPO Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="mx-auto bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-green-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IPO Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">IPO Market Overview</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Upcoming</TabsTrigger>
              <TabsTrigger value="open" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Open</TabsTrigger>
              <TabsTrigger value="closed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Closed</TabsTrigger>
              <TabsTrigger value="listed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Listed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ipoData.upcoming.map(ipo => (
                  <EnhancedIPOCard key={ipo.id} ipo={ipo} type="upcoming" />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="open" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ipoData.open.map(ipo => (
                  <EnhancedIPOCard key={ipo.id} ipo={ipo} type="open" />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="closed" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ipoData.closed.map(ipo => (
                  <EnhancedIPOCard key={ipo.id} ipo={ipo} type="closed" />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="listed" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ipoData.listed.map(ipo => (
                  <EnhancedIPOCard key={ipo.id} ipo={ipo} type="listed" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Ad Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AdPlacement size="banner" position="mid-content" />
        </div>
      </div>

      {/* Join Us Section */}
      <JoinUsSection />

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-800">Stay Updated with IPO Alerts</h2>
          <p className="text-gray-600 mb-8">Get the latest IPO news and updates directly in your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
