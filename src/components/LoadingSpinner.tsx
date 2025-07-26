
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'primary' | 'secondary' | 'success';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    success: 'border-green-600'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Modern spinner with pulse effect */}
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} ${colorClasses[variant]} border-4 border-t-transparent rounded-full animate-spin`}
        ></div>
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-blue-200 rounded-full animate-spin`}
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        ></div>
      </div>
      
      {/* Animated dots */}
      <div className="flex items-center justify-center mt-4">
        <span className="text-gray-600 mr-2">{text}</span>
        <div className="flex space-x-1">
          <div 
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div 
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-48 bg-gray-200 rounded-full h-2 mt-4">
        <div 
          className="bg-blue-600 h-2 rounded-full animate-pulse"
          style={{
            width: '70%',
            animation: 'progress 2s ease-in-out infinite alternate'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 20%; }
          50% { width: 70%; }
          100% { width: 90%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
