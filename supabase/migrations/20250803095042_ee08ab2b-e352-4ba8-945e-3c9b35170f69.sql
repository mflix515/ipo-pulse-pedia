
-- Create users table for user management
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT,
  city TEXT,
  is_admin BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create GMP table for GMP management
CREATE TABLE public.gmp_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ipo_id UUID REFERENCES public.ipos(id),
  ipo_name TEXT NOT NULL,
  current_gmp NUMERIC,
  price_range TEXT,
  percentage_change NUMERIC,
  lot_size INTEGER,
  expected_listing_price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bonds table for bonds management
CREATE TABLE public.bonds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT,
  interest_rate TEXT,
  maturity_date DATE,
  minimum_investment TEXT,
  bond_type TEXT,
  credit_rating TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content_pages table for content management
CREATE TABLE public.content_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chatbot_responses table for chatbot configuration
CREATE TABLE public.chatbot_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trigger_keywords TEXT NOT NULL,
  response_message TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gmp_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bonds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage users" ON public.users FOR ALL USING (true);
CREATE POLICY "Admins can manage GMP data" ON public.gmp_data FOR ALL USING (true);
CREATE POLICY "Admins can manage bonds" ON public.bonds FOR ALL USING (true);
CREATE POLICY "Admins can manage content" ON public.content_pages FOR ALL USING (true);
CREATE POLICY "Admins can manage chatbot responses" ON public.chatbot_responses FOR ALL USING (true);

-- Public can view published content
CREATE POLICY "Anyone can view published content" ON public.content_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view active chatbot responses" ON public.chatbot_responses FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view bonds" ON public.bonds FOR SELECT USING (true);
CREATE POLICY "Anyone can view GMP data" ON public.gmp_data FOR SELECT USING (true);

-- Update existing tables to support new fields
ALTER TABLE public.ipos ADD COLUMN IF NOT EXISTS quota_categories TEXT[];
ALTER TABLE public.ipos ADD COLUMN IF NOT EXISTS parent_company TEXT;
ALTER TABLE public.ipos ADD COLUMN IF NOT EXISTS shareholder_deadline DATE;
ALTER TABLE public.ipos ADD COLUMN IF NOT EXISTS sector TEXT;

ALTER TABLE public.nfos ADD COLUMN IF NOT EXISTS tax_implications TEXT;
ALTER TABLE public.nfos ADD COLUMN IF NOT EXISTS contact_details TEXT;
ALTER TABLE public.nfos ADD COLUMN IF NOT EXISTS peer_comparison TEXT;
