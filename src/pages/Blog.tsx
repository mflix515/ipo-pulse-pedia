
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: '1',
      title: 'Understanding IPO Pricing: A Complete Guide',
      excerpt: 'Learn how IPO prices are determined and what factors influence the pricing decisions.',
      author: 'IPO Expert',
      date: '2024-01-15',
      category: 'Education',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Top 10 IPOs to Watch in 2024',
      excerpt: 'Discover the most anticipated IPOs launching this year and their investment potential.',
      author: 'Market Analyst',
      date: '2024-01-10',
      category: 'Market Trends',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'How to Apply for IPO: Step by Step Guide',
      excerpt: 'Complete walkthrough of the IPO application process for retail investors.',
      author: 'Investment Guide',
      date: '2024-01-05',
      category: 'Tutorial',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">IPO Blog & News</h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest IPO insights, market trends, and investment guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
