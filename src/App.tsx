
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import AIChatbot from '@/components/AIChatbot';

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const MainboardIPO = lazy(() => import("./pages/MainboardIPO"));
const SMEIPO = lazy(() => import("./pages/SMEIPO"));
const NFO = lazy(() => import("./pages/NFO"));
const Bonds = lazy(() => import("./pages/Bonds"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Calendar = lazy(() => import("./pages/Calendar"));
const MarketAnalysis = lazy(() => import("./pages/MarketAnalysis"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const News = lazy(() => import("./pages/News"));
const NewsArticle = lazy(() => import("./pages/NewsArticle"));
const Community = lazy(() => import("./pages/Community"));
const BrokerComparison = lazy(() => import("./pages/BrokerComparison"));
const IPODetails = lazy(() => import("./pages/IPODetails"));
const Performance = lazy(() => import("./pages/Performance"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading page..." />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/mainboard-ipo" element={<MainboardIPO />} />
                <Route path="/sme-ipo" element={<SMEIPO />} />
                <Route path="/nfo" element={<NFO />} />
                <Route path="/bonds" element={<Bonds />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/analysis" element={<MarketAnalysis />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:slug" element={<NewsArticle />} />
                <Route path="/community" element={<Community />} />
                <Route path="/broker-comparison" element={<BrokerComparison />} />
                <Route path="/ipo/:id" element={<IPODetails />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/crm-admin/*" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            
            {/* Global AI Chatbot - shows on all pages */}
            <AIChatbot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
