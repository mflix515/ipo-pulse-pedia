
import React from 'react';
import { TrendingUp, DollarSign, Coins } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'primary' | 'secondary' | 'success';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Growing your wealth...', 
  variant = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'border-green-600',
    secondary: 'border-gray-600',
    success: 'border-emerald-600'
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">
      {/* Money Growth Animation */}
      <div className="relative mb-8">
        {/* Central Growing Tree/Plant */}
        <div className="relative">
          <TrendingUp className="h-16 w-16 text-green-600 animate-bounce" />
          
          {/* Floating Money Icons */}
          <div className="absolute -top-4 -left-4">
            <DollarSign className="h-6 w-6 text-green-500 animate-float-slow" />
          </div>
          <div className="absolute -top-2 -right-6">
            <Coins className="h-5 w-5 text-yellow-500 animate-float-medium" />
          </div>
          <div className="absolute -bottom-2 -left-6">
            <DollarSign className="h-4 w-4 text-green-400 animate-float-fast" />
          </div>
          <div className="absolute -bottom-4 -right-4">
            <Coins className="h-6 w-6 text-yellow-400 animate-float-slow" />
          </div>
        </div>
      </div>

      {/* Modern Circular Progress */}
      <div className="relative mb-6">
        <div 
          className={`${sizeClasses[size]} ${colorClasses[variant]} border-4 border-t-transparent rounded-full animate-spin`}
        ></div>
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-green-200 rounded-full animate-spin`}
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        ></div>
      </div>

      {/* Money Growth Text with Animated Dots */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-gray-700 mr-2 font-medium">{text}</span>
        <div className="flex space-x-1">
          <div 
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div 
            className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
      
      {/* Investment Growth Progress Bar */}
      <div className="w-64 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 h-3 rounded-full animate-investment-growth shadow-lg">
        </div>
      </div>

      {/* Financial Tips */}
      <div className="mt-6 text-center max-w-sm">
        <p className="text-sm text-gray-600 animate-fade-in-out">
          💡 Tip: Diversify your portfolio across IPOs, NFOs, and Bonds for better returns
        </p>
      </div>

      {/* Currency Symbols Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 left-20 text-6xl text-green-600 animate-float-slow">₹</div>
        <div className="absolute top-40 right-32 text-4xl text-green-500 animate-float-medium">$</div>
        <div className="absolute bottom-32 left-40 text-5xl text-green-400 animate-float-fast">€</div>
        <div className="absolute bottom-20 right-20 text-7xl text-green-600 animate-float-slow">¥</div>
        <div className="absolute top-60 left-1/2 text-3xl text-green-500 animate-float-medium">£</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
