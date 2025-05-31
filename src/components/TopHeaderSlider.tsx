
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TopHeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data for the slider - this will be configurable from admin panel later
  const slides = [
    {
      id: 1,
      text: "🚀 New IPO Alert: TechCorp Limited opens tomorrow with GMP of ₹150+",
      type: "alert"
    },
    {
      id: 2,
      text: "📈 Market Update: 5 IPOs listing this week with strong performance expected",
      type: "update"
    },
    {
      id: 3,
      text: "💡 Expert Tip: Use our P&L calculator to estimate your IPO profits before investing",
      type: "tip"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex-1 text-center">
            <div className="animate-slide-in">
              <span className="text-sm font-medium">
                {slides[currentSlide].text}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 pb-1">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TopHeaderSlider;
