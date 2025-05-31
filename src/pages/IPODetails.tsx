
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const IPODetails = () => {
  const { id } = useParams();

  // Mock IPO data - will be replaced with real data from backend
  const ipoData = {
    id,
    name: 'Tech Corp Limited',
    status: 'Open',
    gmp: '₹150',
    priceRange: '₹200 - ₹250',
    lotSize: 100,
    minInvestment: '₹20,000',
    issueSize: '₹5,000 Cr',
    biddingDates: '15 Jan - 17 Jan 2024',
    listingDate: '25 Jan 2024',
    subscriptionRate: '2.5x'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to IPOs
          </Link>
        </Button>

        {/* IPO Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{ipoData.name}</h1>
              <Badge variant={ipoData.status === 'Open' ? 'default' : 'secondary'}>
                {ipoData.status}
              </Badge>
            </div>
            {ipoData.status === 'Open' && (
              <div className="mt-4 md:mt-0">
                <div className="text-sm text-gray-600">Current GMP</div>
                <div className="text-2xl font-bold text-green-600">{ipoData.gmp}</div>
              </div>
            )}
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Range</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ipoData.priceRange}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lot Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ipoData.lotSize} shares</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Min Investment</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ipoData.minInvestment}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issue Size</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ipoData.issueSize}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bidding Dates</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{ipoData.biddingDates}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ipoData.subscriptionRate}</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>About the Company</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detailed company information will be displayed here. This section will include 
                company overview, business model, recent developments, and key metrics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Financial data and charts will be displayed here showing revenue, 
                profit/loss, and assets over the past 3 years.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IPODetails;
