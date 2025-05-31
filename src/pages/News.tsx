
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdPlacement from '@/components/AdPlacement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author: string;
  category: string;
  published_at: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(news.map(item => item.category)))];
  
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="news-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h1>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest market news, IPO developments, and financial insights.
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Banner Ad */}
              <AdPlacement size="banner" position="news-banner" className="mb-6" />

              {/* News Grid */}
              {filteredNews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No news articles found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredNews.map((article, index) => (
                    <React.Fragment key={article.id}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors">
                                <Link to={`/news/${article.id}`}>
                                  {article.title}
                                </Link>
                              </CardTitle>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {article.author}
                                </div>
                                <div className="flex items-center">
                                  <CalendarDays className="h-4 w-4 mr-1" />
                                  {new Date(article.published_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary" className="capitalize">
                              {article.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt || article.content.substring(0, 200) + '...'}
                          </p>
                          <Button variant="outline" asChild>
                            <Link to={`/news/${article.id}`}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Ad after every 3 articles */}
                      {(index + 1) % 3 === 0 && index < filteredNews.length - 1 && (
                        <AdPlacement size="banner" position={`news-content-${index}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-6">
              <AdPlacement size="sidebar" position="news-right-sidebar-1" />
              <AdPlacement size="square" position="news-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
