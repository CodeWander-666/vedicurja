-- =============================================================================
-- SERVICES TABLE – FOR ADMIN CRUD ON SERVICE CARDS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  benefits TEXT[] DEFAULT '{}',
  icon TEXT,
  image_url TEXT,
  color_gradient TEXT,
  href TEXT,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for clean slate
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'services'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.services', pol.policyname);
  END LOOP;
END $$;

-- Public read published services
CREATE POLICY "Public read services" ON public.services
  FOR SELECT USING (is_published = true);

-- Admin full access
CREATE POLICY "Admin full access services" ON public.services
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Seed initial data (idempotent)
INSERT INTO public.services (title, slug, description, benefits, icon, color_gradient, href, order_index) VALUES
('Residential Vastu', 'residential', 'Harmonise your home with cosmic principles.', ARRAY['Better Sleep','Family Harmony','Financial Flow'], '🏡', 'linear-gradient(145deg, #F9F6F0 0%, #E8B960 100%)', '/services/residential', 1),
('Commercial Vastu', 'commercial', 'Align your business space for unprecedented growth.', ARRAY['Revenue Growth','Team Cohesion','Client Retention'], '🏢', 'linear-gradient(145deg, #F9F6F0 0%, #C88A5D 100%)', '/services/commercial', 2),
('Land & Plot Selection', 'land', 'Auspicious plot analysis using Vedic parameters.', ARRAY['Ideal Orientation','Soil Analysis','Future Prospects'], '🌍', 'linear-gradient(145deg, #F9F6F0 0%, #D4A373 100%)', '/services/land', 3)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  benefits = EXCLUDED.benefits,
  icon = EXCLUDED.icon,
  color_gradient = EXCLUDED.color_gradient,
  href = EXCLUDED.href,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

-- Add to realtime
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- Add any missing home_section keys
INSERT INTO public.home_sections (section_key, title, subtitle, description, button_text, button_link, order_index)
VALUES
  ('acharya_vow', 'Guided by Lineage, Driven by Results', 'Our Sacred Vow', 'For over four decades, our family has preserved the authentic Vastu Shastra traditions.', 'Discover Our Lineage', '/about', 2),
  ('learn_vastu', 'Master the Sacred Sciences', 'Interactive 3D Bookshelf', 'Explore our library of ancient Vastu and numerology texts.', 'Browse All Courses', '/learn-vastu', 7),
  ('virtual_consult', 'Connect with Acharya, Virtually', 'Secure video consultation from anywhere', 'Experience personalised Vastu guidance.', 'Book Virtual Consultation', '/bookings', 8),
  ('global_presence', 'Global Wisdom, Local Precision', 'From the banks of the Ganga to Manhattan skyscrapers', 'Our Vastu solutions transcend borders.', 'Find a Consultant', '/vastu-consultant', 11),
  ('final_cta', 'Begin Your Transformation', 'Unlock the hidden potential of your space.', NULL, 'Create Free Account', '/signup', 12)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_link = EXCLUDED.button_link,
  updated_at = NOW();

RAISE NOTICE '✅ Services table and home_section keys created/updated.';
