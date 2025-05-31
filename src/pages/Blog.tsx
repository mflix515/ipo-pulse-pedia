
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdPlacement from '@/components/AdPlacement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author: string;
  category: string;
  read_time: string | null;
  published_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

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
            <AdPlacement size="sidebar" position="blog-left-sidebar" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">IPO Investment Blog</h1>
              <p className="text-gray-600 mb-6">
                Expert insights, investment strategies, and in-depth analysis of IPO markets and investment opportunities.
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
              <AdPlacement size="banner" position="blog-banner" className="mb-6" />

              {/* Blog Posts Grid */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No blog posts found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <Card className="hover:shadow-lg transition-shadow h-fit">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <Badge variant="secondary" className="capitalize">
                              {post.category}
                            </Badge>
                            {post.read_time && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {post.read_time}
                              </div>
                            )}
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors">
                            <Link to={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              {new Date(post.published_at).toLocaleDateString()}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt || post.content.substring(0, 150) + '...'}
                          </p>
                          <Button variant="outline" asChild size="sm">
                            <Link to={`/blog/${post.id}`}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Ad after every 4 posts */}
                      {(index + 1) % 4 === 0 && index < filteredPosts.length - 1 && (
                        <div className="md:col-span-2">
                          <AdPlacement size="banner" position={`blog-content-${index}`} />
                        </div>
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
              <AdPlacement size="sidebar" position="blog-right-sidebar-1" />
              <AdPlacement size="square" position="blog-right-sidebar-2" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
