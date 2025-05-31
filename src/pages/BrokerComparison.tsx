
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import BrokerComparisonTool from '@/components/BrokerComparison';
import AdPlacement from '@/components/AdPlacement';

const BrokerComparison = () => {
  const brokers = [
    {
      name: 'Zerodha',
      rating: 4.5,
      brokerage: '₹20 per order',
      features: ['Free equity delivery', 'Advanced charts', 'Mobile app'],
      pros: ['Low brokerage', 'User-friendly platform'],
      cons: ['Limited research'],
      logo: '🟡'
    },
    {
      name: 'Groww',
      rating: 4.3,
      brokerage: '₹20 per order',
      features: ['Zero delivery charges', 'Easy interface', 'SIP investment'],
      pros: ['Beginner-friendly', 'Good mobile app'],
      cons: ['Limited advanced tools'],
      logo: '🟢'
    },
    {
      name: 'Angel One',
      rating: 4.1,
      brokerage: '₹20 per order',
      features: ['Research reports', 'Advisory services', 'Multiple platforms'],
      pros: ['Good research', 'Multiple products'],
      cons: ['Higher charges for some services'],
      logo: '🔴'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Broker Comparison</h1>
          <p className="text-lg text-gray-600">
            Compare features, pricing, and ratings of top stock brokers in India
          </p>
        </div>

        {/* Ad placement */}
        <div className="mb-8">
          <AdPlacement size="banner" position="broker-comparison-top" />
        </div>

        {/* Comparison Tool */}
        <div className="mb-12">
          <BrokerComparisonTool />
        </div>

        {/* Individual Broker Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">All Brokers Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brokers.map((broker, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{broker.logo}</span>
                      <CardTitle className="text-xl">{broker.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{broker.rating}</span>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">{broker.brokerage}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {broker.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Pros</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {broker.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">Cons</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {broker.cons.map((con, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="text-center">
          <AdPlacement size="banner" position="broker-comparison-bottom" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrokerComparison;
