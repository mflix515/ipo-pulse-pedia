
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, Check, X } from 'lucide-react';

const BrokerComparisonTool = () => {
  const [broker1, setBroker1] = useState('');
  const [broker2, setBroker2] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const brokers = [
    {
      id: 'zerodha',
      name: 'Zerodha',
      rating: 4.5,
      brokerage: '₹20 per order',
      features: ['Free equity delivery', 'Advanced charts', 'Mobile app', 'Research reports'],
      pros: ['Low brokerage', 'User-friendly platform', 'Good customer support'],
      cons: ['Limited research', 'No advisory services'],
      deliveryCharges: 'Free',
      intradayCharges: '₹20 or 0.03%',
      accountOpening: 'Free',
      annualCharges: '₹300',
      dematCharges: 'Free',
      logo: '🟡'
    },
    {
      id: 'groww',
      name: 'Groww',
      rating: 4.3,
      brokerage: '₹20 per order',
      features: ['Zero delivery charges', 'Easy interface', 'SIP investment', 'Mutual funds'],
      pros: ['Beginner-friendly', 'Good mobile app', 'Multiple products'],
      cons: ['Limited advanced tools', 'Basic research'],
      deliveryCharges: 'Free',
      intradayCharges: '₹20 or 0.05%',
      accountOpening: 'Free',
      annualCharges: 'Free',
      dematCharges: 'Free',
      logo: '🟢'
    },
    {
      id: 'angelone',
      name: 'Angel One',
      rating: 4.1,
      brokerage: '₹20 per order',
      features: ['Research reports', 'Advisory services', 'Multiple platforms', 'Margin funding'],
      pros: ['Good research', 'Multiple products', 'Advisory services'],
      cons: ['Higher charges for some services', 'Complex interface'],
      deliveryCharges: 'Free',
      intradayCharges: '₹20 or 0.25%',
      accountOpening: 'Free',
      annualCharges: '₹240',
      dematCharges: '₹20/month',
      logo: '🔴'
    }
  ];

  const getBrokerData = (brokerId: string) => {
    return brokers.find(b => b.id === brokerId);
  };

  const handleCompare = () => {
    if (broker1 && broker2) {
      setShowComparison(true);
    }
  };

  const ComparisonRow = ({ label, broker1Value, broker2Value }: { label: string, broker1Value: any, broker2Value: any }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
      <div className="font-medium text-gray-700">{label}</div>
      <div className="text-center">{broker1Value}</div>
      <div className="text-center">{broker2Value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Compare Brokers Side by Side</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Broker 1</label>
              <Select value={broker1} onValueChange={setBroker1}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose first broker" />
                </SelectTrigger>
                <SelectContent>
                  {brokers.map(broker => (
                    <SelectItem key={broker.id} value={broker.id}>
                      <div className="flex items-center space-x-2">
                        <span>{broker.logo}</span>
                        <span>{broker.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Broker 2</label>
              <Select value={broker2} onValueChange={setBroker2}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose second broker" />
                </SelectTrigger>
                <SelectContent>
                  {brokers.map(broker => (
                    <SelectItem key={broker.id} value={broker.id}>
                      <div className="flex items-center space-x-2">
                        <span>{broker.logo}</span>
                        <span>{broker.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCompare}
              disabled={!broker1 || !broker2 || broker1 === broker2}
              className="bg-green-600 hover:bg-green-700"
            >
              Compare Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {showComparison && broker1 && broker2 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center">Broker Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const b1 = getBrokerData(broker1);
              const b2 = getBrokerData(broker2);
              
              if (!b1 || !b2) return null;

              return (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="font-bold text-gray-700">Features</div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">{b1.logo}</span>
                        <div>
                          <div className="font-bold">{b1.name}</div>
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{b1.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">{b2.logo}</span>
                        <div>
                          <div className="font-bold">{b2.name}</div>
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{b2.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comparison rows */}
                  <ComparisonRow label="Delivery Charges" broker1Value={b1.deliveryCharges} broker2Value={b2.deliveryCharges} />
                  <ComparisonRow label="Intraday Charges" broker1Value={b1.intradayCharges} broker2Value={b2.intradayCharges} />
                  <ComparisonRow label="Account Opening" broker1Value={b1.accountOpening} broker2Value={b2.accountOpening} />
                  <ComparisonRow label="Annual Charges" broker1Value={b1.annualCharges} broker2Value={b2.annualCharges} />
                  <ComparisonRow label="Demat Charges" broker1Value={b1.dematCharges} broker2Value={b2.dematCharges} />
                  
                  {/* Pros comparison */}
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <div className="font-medium text-gray-700">Advantages</div>
                    <div className="space-y-1">
                      {b1.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <Check className="h-3 w-3 text-green-500" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {b2.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <Check className="h-3 w-3 text-green-500" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cons comparison */}
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <div className="font-medium text-gray-700">Disadvantages</div>
                    <div className="space-y-1">
                      {b1.cons.map((con, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <X className="h-3 w-3 text-red-500" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {b2.cons.map((con, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <X className="h-3 w-3 text-red-500" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrokerComparisonTool;
