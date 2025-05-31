
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Calendar, DollarSign, Users } from 'lucide-react';

interface IPOCardProps {
  ipo: {
    id: number;
    company: string;
    openDate?: string;
    closeDate?: string;
    priceRange?: string;
    lotSize?: number;
    minInvestment?: string;
    issueSize?: string;
    gmp?: string;
    profitPerLot?: string;
    category: string;
    subscriptionRate?: string;
    listingPrice?: string;
    currentPrice?: string;
    change?: string;
    listingDate?: string;
  };
  type: 'upcoming' | 'open' | 'closed' | 'listed';
}

const EnhancedIPOCard = ({ ipo, type }: IPOCardProps) => {
  const getStatusColor = () => {
    switch (type) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'open': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'listed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGMPBadgeColor = () => {
    if (!ipo.gmp) return '';
    const gmpValue = parseInt(ipo.gmp.replace(/[^\d]/g, ''));
    if (gmpValue > 100) return 'bg-green-500 text-white';
    if (gmpValue > 50) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-green-500 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
              {ipo.company}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className={`${getStatusColor()} font-medium`}>
                {ipo.category}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium">
                {type.toUpperCase()}
              </Badge>
            </div>
          </div>
          {ipo.gmp && (
            <Badge className={`${getGMPBadgeColor()} font-bold text-xs`}>
              GMP {ipo.gmp}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {(type === 'upcoming' || type === 'open') && (
            <>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-gray-500 text-xs">Dates</p>
                  <p className="font-semibold text-gray-900">
                    {ipo.openDate} - {ipo.closeDate}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-gray-500 text-xs">Price Range</p>
                  <p className="font-semibold text-gray-900">{ipo.priceRange}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-gray-500 text-xs">Min Investment</p>
                  <p className="font-semibold text-gray-900">{ipo.minInvestment}</p>
                </div>
              </div>
              
              {ipo.profitPerLot && (
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-gray-500 text-xs">Profit/Lot</p>
                    <p className="font-semibold text-green-600">{ipo.profitPerLot}</p>
                  </div>
                </div>
              )}
            </>
          )}
          
          {type === 'closed' && (
            <>
              <div>
                <p className="text-gray-500 text-xs">Issue Period</p>
                <p className="font-semibold">{ipo.openDate} - {ipo.closeDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Listing Date</p>
                <p className="font-semibold">{ipo.listingDate}</p>
              </div>
            </>
          )}
          
          {type === 'listed' && (
            <>
              <div>
                <p className="text-gray-500 text-xs">Listing Price</p>
                <p className="font-semibold">{ipo.listingPrice}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Current Price</p>
                <p className="font-semibold">{ipo.currentPrice}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 text-xs">Performance</p>
                <p className="font-bold text-green-600 text-lg">{ipo.change}</p>
              </div>
            </>
          )}
        </div>
        
        {/* Subscription Rate */}
        {ipo.subscriptionRate && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-800">Subscription Rate</span>
              <span className="font-bold text-green-600">{ipo.subscriptionRate}</span>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link to={`/ipo/${ipo.id}`} className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          {type === 'closed' && (
            <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
              Check Allotment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedIPOCard;
