
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();

  // Mock blog post data
  const post = {
    id,
    title: 'Understanding IPO Pricing: A Complete Guide',
    content: `
      <p>Initial Public Offerings (IPOs) are an exciting investment opportunity, but understanding how they are priced can be complex. In this comprehensive guide, we'll break down everything you need to know about IPO pricing.</p>
      
      <h2>What Determines IPO Price?</h2>
      <p>Several factors influence the pricing of an IPO:</p>
      <ul>
        <li>Company's financial performance and growth prospects</li>
        <li>Market conditions and investor sentiment</li>
        <li>Comparable company valuations</li>
        <li>Demand from institutional and retail investors</li>
      </ul>
      
      <h2>Price Band and Final Price</h2>
      <p>Companies typically announce a price band (range) for their IPO. The final price is determined based on the demand received during the bidding process.</p>
      
      <h2>Book Building Process</h2>
      <p>Most IPOs in India follow the book building process where investors bid for shares within the specified price band. This helps in price discovery and ensures fair valuation.</p>
    `,
    author: 'IPO Expert',
    date: '2024-01-15',
    category: 'Education',
    readTime: '5 min read'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-4">
            <Badge variant="secondary">{post.category}</Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
          
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/blog/2" className="hover:text-blue-600">
                  Top 10 IPOs to Watch in 2024
                </Link>
              </h4>
              <p className="text-gray-600">Discover the most anticipated IPOs launching this year...</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/blog/3" className="hover:text-blue-600">
                  How to Apply for IPO: Step by Step Guide
                </Link>
              </h4>
              <p className="text-gray-600">Complete walkthrough of the IPO application process...</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
