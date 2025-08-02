import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import MainboardIPO from '@/pages/MainboardIPO';
import SMEIPO from '@/pages/SMEIPO';
import NFO from '@/pages/NFO';
import Bonds from '@/pages/Bonds';
import IPODetails from '@/pages/IPODetails';
import Performance from '@/pages/Performance';
import Calendar from '@/pages/Calendar';
import News from '@/pages/News';
import NewsArticle from '@/pages/NewsArticle';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import BrokerComparison from '@/pages/BrokerComparison';
import MarketAnalysis from '@/pages/MarketAnalysis';
import Community from '@/pages/Community';
import Calculator from '@/pages/Calculator';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Disclaimer from '@/pages/Disclaimer';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import AIChatbot from '@/components/AIChatbot';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mainboard-ipo" element={<MainboardIPO />} />
          <Route path="/sme-ipo" element={<SMEIPO />} />
          <Route path="/nfo" element={<NFO />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/ipo/:id" element={<IPODetails />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/broker-comparison" element={<BrokerComparison />} />
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/community" element={<Community />} />
          <Route path="/calculator" element={<Calculator />} />
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
        <AIChatbot />
      </Router>
    </AuthProvider>
  );
};

export default App;
