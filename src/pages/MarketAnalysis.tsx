
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';

const MarketAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="analysis-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Market Analysis</h1>
              <p className="text-gray-600 mb-6">
                In-depth analysis of market trends, IPO performance, and investment insights.
              </p>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="analysis-hero-banner" className="mb-6" />

              {/* Market Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Market Trend</p>
                        <p className="text-lg font-bold text-green-600">Bullish</p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">IPO Activity</p>
                        <p className="text-lg font-bold text-blue-600">High</p>
                      </div>
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Returns</p>
                        <p className="text-lg font-bold text-green-600">+15.2%</p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Risk Level</p>
                        <p className="text-lg font-bold text-yellow-600">Moderate</p>
                      </div>
                      <PieChart className="h-6 w-6 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Sections */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Current Market Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Technology Sector Leading</h3>
                        <p className="text-gray-600">
                          Technology and fintech companies are dominating the IPO space with strong investor interest 
                          and premium valuations.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">SME Segment Growth</h3>
                        <p className="text-gray-600">
                          Small and Medium Enterprise IPOs are showing remarkable growth with retail investor participation 
                          increasing significantly.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Sector Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Technology</span>
                        <Badge className="bg-green-100 text-green-800">Strong</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Healthcare</span>
                        <Badge className="bg-blue-100 text-blue-800">Moderate</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Manufacturing</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Stable</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Real Estate</span>
                        <Badge className="bg-red-100 text-red-800">Weak</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">📈 Market Outlook</h3>
                        <p className="text-blue-800">
                          The IPO market is expected to remain active with increased retail participation and 
                          institutional investor interest in quality companies.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-2">💡 Investment Strategy</h3>
                        <p className="text-green-800">
                          Focus on companies with strong fundamentals, experienced management, and clear 
                          growth strategies. Diversify across sectors to minimize risk.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Risk Factors</h3>
                        <p className="text-yellow-800">
                          Market volatility, regulatory changes, and global economic conditions can impact 
                          IPO performance. Always assess your risk tolerance before investing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Ad */}
              <div className="mt-8">
                <AdPlacement size="banner" position="analysis-content" />
              </div>
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="analysis-right-sidebar-1" />
              <AdPlacement size="square" position="analysis-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketAnalysis;
