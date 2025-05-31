
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SuccessStory {
  id: string;
  name: string;
  story: string;
  profit_amount: string | null;
  image_url: string | null;
  ipo_name: string | null;
}

const SuccessStoriesSlider = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (stories.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [stories.length]);

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading success stories...</p>
      </div>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  const currentStory = stories[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-green-800 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            Success Stories
          </h3>
          
          {stories.length > 1 && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{currentStory.name}</h4>
                  {currentStory.profit_amount && (
                    <div className="text-2xl font-bold text-green-600">
                      {currentStory.profit_amount}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">
                  "{currentStory.story}"
                </p>
                
                {currentStory.ipo_name && (
                  <div className="text-sm text-green-600 font-medium">
                    IPO: {currentStory.ipo_name}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {stories.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-600' : 'bg-green-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesSlider;
