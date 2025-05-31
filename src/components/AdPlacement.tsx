
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  size: 'banner' | 'square' | 'sidebar' | 'mobile';
  position: string;
  className?: string;
}

const AdPlacement = ({ size, position, className = '' }: AdPlacementProps) => {
  // Mock ad data - this will be configurable from admin panel later
  const mockAd = {
    title: "Investment Opportunity",
    description: "Discover the best investment platform",
    imageUrl: "/api/placeholder/300/250",
    linkUrl: "#",
    isActive: true
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-24 md:h-32';
      case 'square':
        return 'w-64 h-64';
      case 'sidebar':
        return 'w-full h-48';
      case 'mobile':
        return 'w-full h-20';
      default:
        return 'w-full h-32';
    }
  };

  if (!mockAd.isActive) {
    return null;
  }

  return (
    <div className={`ad-placement ${className}`} data-position={position}>
      <Card className={`${getSizeClasses()} overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border border-gray-200`}>
        <div className="relative w-full h-full bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center">
          {/* Placeholder ad content */}
          <div className="text-center p-4">
            <div className="text-xs text-gray-500 mb-1">Advertisement</div>
            <div className="font-semibold text-gray-800 text-sm group-hover:text-green-600 transition-colors">
              {mockAd.title}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {mockAd.description}
            </div>
            <ExternalLink className="h-3 w-3 text-gray-400 mx-auto mt-2" />
          </div>
          
          {/* Overlay for better visibility */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
        </div>
      </Card>
      
      {/* Debug info (remove in production) */}
      <div className="text-xs text-gray-400 mt-1 text-center">
        Ad Position: {position}
      </div>
    </div>
  );
};

export default AdPlacement;
