
-- Create tables for NFO (mutual funds)
CREATE TABLE public.nfos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'equity', -- equity, debt, hybrid, etc.
  status TEXT NOT NULL DEFAULT 'upcoming', -- upcoming, open, closed, allotted
  open_date DATE,
  close_date DATE,
  allotment_date DATE,
  minimum_investment TEXT,
  maximum_investment TEXT,
  fund_house TEXT,
  fund_manager TEXT,
  expense_ratio TEXT,
  exit_load TEXT,
  benchmark TEXT,
  investment_objective TEXT,
  risk_level TEXT, -- low, moderate, high
  category TEXT,
  nav TEXT,
  aum TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user NFO applications
CREATE TABLE public.user_nfo_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nfo_id UUID REFERENCES public.nfos(id) ON DELETE CASCADE,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  amount TEXT,
  units TEXT,
  status TEXT DEFAULT 'applied' -- applied, allotted, rejected
);

-- Create table for IPO profit/loss tracking
CREATE TABLE public.ipo_trades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  ipo_id UUID REFERENCES public.ipos(id) ON DELETE CASCADE,
  lots_applied INTEGER NOT NULL,
  lots_allotted INTEGER DEFAULT 0,
  issue_price NUMERIC(10,2),
  listing_price NUMERIC(10,2),
  sell_price NUMERIC(10,2),
  sell_date DATE,
  profit_loss NUMERIC(12,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for city information
CREATE TABLE public.cities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  population TEXT,
  area TEXT,
  description TEXT,
  economic_overview TEXT,
  investment_opportunities TEXT,
  major_companies TEXT,
  stock_exchanges TEXT,
  brokers_available TEXT[],
  local_investment_tips TEXT,
  cost_of_living TEXT,
  business_environment TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chatbot configurations
CREATE TABLE public.chatbot_flows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  flow_data JSONB NOT NULL, -- stores the complete flow configuration
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chatbot conversations
CREATE TABLE public.chatbot_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  intent TEXT,
  confidence_score NUMERIC(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for complaints/support tickets
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'general', -- general, technical, complaint, ipo_related
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  status TEXT DEFAULT 'open', -- open, in_progress, resolved, closed
  assigned_to UUID,
  resolution TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info, success, warning, error
  target_users TEXT DEFAULT 'all', -- all, specific, role_based
  user_ids UUID[], -- specific user IDs if target_users is 'specific'
  roles TEXT[], -- roles if target_users is 'role_based'
  send_email BOOLEAN DEFAULT false,
  send_sms BOOLEAN DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user notifications (tracking delivery)
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_id UUID REFERENCES public.notifications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for allotment status
CREATE TABLE public.ipo_allotments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ipo_id UUID REFERENCES public.ipos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  application_number TEXT,
  pan_number TEXT,
  lots_applied INTEGER NOT NULL,
  lots_allotted INTEGER DEFAULT 0,
  allotment_amount NUMERIC(12,2),
  refund_amount NUMERIC(12,2),
  status TEXT DEFAULT 'pending', -- pending, allotted, not_allotted
  allotment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for country codes
CREATE TABLE public.country_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_name TEXT NOT NULL,
  country_code TEXT NOT NULL, -- e.g., 'IN', 'US'
  phone_code TEXT NOT NULL, -- e.g., '+91', '+1'
  phone_length INTEGER NOT NULL, -- number of digits expected
  phone_format TEXT, -- format pattern like 'XXXXX-XXXXX'
  is_active BOOLEAN DEFAULT true
);

-- Insert common country codes
INSERT INTO public.country_codes (country_name, country_code, phone_code, phone_length, phone_format) VALUES
('India', 'IN', '+91', 10, 'XXXXX-XXXXX'),
('United States', 'US', '+1', 10, 'XXX-XXX-XXXX'),
('United Kingdom', 'GB', '+44', 10, 'XXXX-XXX-XXX'),
('Canada', 'CA', '+1', 10, 'XXX-XXX-XXXX'),
('Australia', 'AU', '+61', 9, 'XXX-XXX-XXX'),
('Singapore', 'SG', '+65', 8, 'XXXX-XXXX'),
('UAE', 'AE', '+971', 9, 'XX-XXX-XXXX'),
('Germany', 'DE', '+49', 11, 'XXX-XXXX-XXXX');

-- Add RLS policies for all new tables
ALTER TABLE public.nfos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_nfo_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ipo_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ipo_allotments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_codes ENABLE ROW LEVEL SECURITY;

-- RLS policies for NFOs (public read)
CREATE POLICY "Anyone can view NFOs" ON public.nfos FOR SELECT USING (true);

-- RLS policies for user NFO applications (users can manage their own)
CREATE POLICY "Users can view their own NFO applications" ON public.user_nfo_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own NFO applications" ON public.user_nfo_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own NFO applications" ON public.user_nfo_applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own NFO applications" ON public.user_nfo_applications FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for IPO trades (users can manage their own)
CREATE POLICY "Users can view their own IPO trades" ON public.ipo_trades FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own IPO trades" ON public.ipo_trades FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own IPO trades" ON public.ipo_trades FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own IPO trades" ON public.ipo_trades FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for cities (public read)
CREATE POLICY "Anyone can view cities" ON public.cities FOR SELECT USING (true);

-- RLS policies for chatbot flows (public read for active flows)
CREATE POLICY "Anyone can view active chatbot flows" ON public.chatbot_flows FOR SELECT USING (is_active = true);

-- RLS policies for chatbot conversations (users can view their own)
CREATE POLICY "Users can view their own conversations" ON public.chatbot_conversations FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert conversations" ON public.chatbot_conversations FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- RLS policies for support tickets
CREATE POLICY "Users can view their own tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can create support tickets" ON public.support_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own tickets" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for notifications (users can view their notifications)
CREATE POLICY "Users can view notifications sent to them" ON public.user_notifications FOR SELECT USING (auth.uid() = user_id);

-- RLS policies for allotments (users can view their own)
CREATE POLICY "Users can view their own allotments" ON public.ipo_allotments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own allotments" ON public.ipo_allotments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own allotments" ON public.ipo_allotments FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for country codes (public read)
CREATE POLICY "Anyone can view country codes" ON public.country_codes FOR SELECT USING (true);

-- Update profiles table to include additional fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pincode TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'India';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS occupation TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS annual_income TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS investment_experience TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS risk_appetite TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bank_account_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bank_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ifsc_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS demat_account_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS broker_name TEXT;
