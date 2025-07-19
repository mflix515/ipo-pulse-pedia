import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import IPODetails from "./pages/IPODetails";
import Calculator from "./pages/Calculator";
import BrokerComparison from "./pages/BrokerComparison";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import MainboardIPO from "./pages/MainboardIPO";
import SMEIPO from "./pages/SMEIPO";
import NFO from "./pages/NFO";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Contact from "./pages/Contact";
import Performance from "./pages/Performance";
import MarketAnalysis from "./pages/MarketAnalysis";
import Bonds from "./pages/Bonds";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ipo/:id" element={<IPODetails />} />
            <Route path="/mainboard-ipo" element={<MainboardIPO />} />
            <Route path="/sme-ipo" element={<SMEIPO />} />
            <Route path="/nfo" element={<NFO />} />
            <Route path="/bonds" element={<Bonds />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/broker-comparison" element={<BrokerComparison />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/crm-admin/*" element={<Admin />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/analysis" element={<MarketAnalysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
