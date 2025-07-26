
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Send,
  TrendingUp,
  Users,
  PlusCircle
} from 'lucide-react';

interface Post {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: string;
}

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newPost, setNewPost] = useState({ content: '', category: 'General' });
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  // Mock data
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        author: 'John Doe',
        content: 'Just got allotted shares in the latest tech IPO! The listing is looking promising. What are your thoughts on the current market conditions?',
        category: 'IPO Discussion',
        likes: 15,
        comments: 8,
        timestamp: '2 hours ago',
        isLiked: false
      },
      {
        id: '2',
        author: 'Sarah Wilson',
        content: 'Has anyone invested in the new green energy NFO? I\'m considering it for my portfolio diversification. Would love to hear your experiences.',
        category: 'NFO Discussion',
        likes: 23,
        comments: 12,
        timestamp: '4 hours ago',
        isLiked: true
      },
      {
        id: '3',
        author: 'Mike Chen',
        content: 'The bond market seems to be offering better returns lately. I\'ve been looking at some government bonds with 7.5% returns. Anyone else exploring bonds?',
        category: 'Bonds Discussion',
        likes: 31,
        comments: 18,
        timestamp: '1 day ago',
        isLiked: false
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleCreatePost = () => {
    if (!newPost.content.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: user?.name || 'Anonymous',
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', category: 'General' });
    setShowPostForm(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      author: user?.name || 'Anonymous',
      content: newComment,
      timestamp: 'Just now'
    };

    setComments([...comments, comment]);
    setNewComment('');
    
    // Update comment count
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  const categories = ['General', 'IPO Discussion', 'NFO Discussion', 'Bonds Discussion', 'Market Analysis'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Investo-pedia Community</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow investors, share your experiences, and learn from the community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">2,350</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Positive Sentiment</div>
            </CardContent>
          </Card>
        </div>

        {/* Create Post Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowPostForm(!showPostForm)}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Share Your Thoughts
          </Button>
        </div>

        {/* Create Post Form */}
        {showPostForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <select 
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <Textarea
                placeholder="What's on your mind about investments?"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreatePost}>Post</Button>
                <Button variant="outline" onClick={() => setShowPostForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.timestamp}</span>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : ''}`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                          className="flex items-center gap-1"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                    
                    {/* Comments Section */}
                    {selectedPost === post.id && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-3 mb-4">
                          {comments
                            .filter(comment => comment.postId === post.id)
                            .map(comment => (
                              <div key={comment.id} className="flex items-start space-x-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="text-xs">{comment.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-gray-100 rounded-lg p-3">
                                    <div className="font-medium text-sm">{comment.author}</div>
                                    <div className="text-sm">{comment.content}</div>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">{comment.timestamp}</div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            size="sm"
                            onClick={() => handleComment(post.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AIChatbot />
      <Footer />
    </div>
  );
};

export default Community;
