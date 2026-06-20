-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Lead inquiries table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  city TEXT,
  product_interest TEXT[],
  project_type TEXT,
  quantity TEXT,
  timeline TEXT,
  budget TEXT,
  specifications TEXT,
  additional_info TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote requests table
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  city TEXT,
  products TEXT[] NOT NULL,
  project_type TEXT,
  quantity TEXT,
  timeline TEXT,
  budget TEXT,
  specifications TEXT,
  additional_info TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealer applications table
CREATE TABLE dealer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  experience TEXT,
  investment_capacity TEXT,
  storage_capacity TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Market trends table (for price tracking)
CREATE TABLE market_trends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_type TEXT NOT NULL,
  month TEXT NOT NULL,
  year INT NOT NULL,
  avg_price NUMERIC(10,2),
  trend TEXT CHECK (trend IN ('rising', 'falling', 'stable')),
  change_percentage NUMERIC(5,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_trends ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads (service role only)
CREATE POLICY "service_role_all_leads" ON leads FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for quote_requests
CREATE POLICY "service_role_all_quotes" ON quote_requests FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for dealer_applications
CREATE POLICY "service_role_all_dealers" ON dealer_applications FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for contact_messages
CREATE POLICY "service_role_all_contacts" ON contact_messages FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for newsletter_subscribers (allow public insert for signup)
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "service_role_all_newsletter" ON newsletter_subscribers FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for market_trends (allow public read)
CREATE POLICY "public_read_market" ON market_trends FOR SELECT TO anon USING (true);
CREATE POLICY "service_role_all_market" ON market_trends FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Insert initial market trend data
INSERT INTO market_trends (product_type, month, year, avg_price, trend, change_percentage) VALUES
('GI Wire Heavy', 'June', 2025, 58.00, 'stable', 2.5),
('GI Wire Heavy', 'May', 2025, 56.50, 'rising', 5.2),
('GI Wire Heavy', 'April', 2025, 53.70, 'stable', -1.1),
('GI Wire Heavy', 'March', 2025, 54.30, 'rising', 3.8),
('Barbed Wire 12G', 'June', 2025, 62.00, 'stable', 1.5),
('Barbed Wire 12G', 'May', 2025, 61.00, 'rising', 4.0);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quote_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dealers_updated_at BEFORE UPDATE ON dealer_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();