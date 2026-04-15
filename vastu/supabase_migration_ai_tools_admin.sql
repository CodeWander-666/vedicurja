-- =============================================================================
-- AI TOOLS ADMIN INTEGRATION – TOOL USAGE LOGGING & CONTENT ENHANCEMENTS
-- =============================================================================

-- 1. Ensure free_tools table has all needed columns (add if missing)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'free_tools' AND column_name = 'hero_title') THEN
    ALTER TABLE public.free_tools ADD COLUMN hero_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'free_tools' AND column_name = 'hero_subtitle') THEN
    ALTER TABLE public.free_tools ADD COLUMN hero_subtitle TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'free_tools' AND column_name = 'premium_price') THEN
    ALTER TABLE public.free_tools ADD COLUMN premium_price INTEGER DEFAULT 499;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'free_tools' AND column_name = 'premium_description') THEN
    ALTER TABLE public.free_tools ADD COLUMN premium_description TEXT;
  END IF;
END $$;

-- 2. Update existing free_tools with default hero content (idempotent)
UPDATE public.free_tools SET
  hero_title = CASE tool_key
    WHEN 'kundali' THEN 'AI Kundali – Your Vedic Birth Chart'
    WHEN 'vastu_scan' THEN 'AI Vastu Scan – 16‑Zone Energy Analysis'
    WHEN 'name_suggestion' THEN 'AI Name Suggestion – Auspicious First Letters'
  END,
  hero_subtitle = CASE tool_key
    WHEN 'kundali' THEN 'Discover your ascendant, moon sign, nakshatra, and planetary positions with authentic Vedic calculations.'
    WHEN 'vastu_scan' THEN 'Upload your floor plan and get instant directional scores with personalised remedies.'
    WHEN 'name_suggestion' THEN 'Find the perfect starting sound for your newborn or business based on Nakshatra.'
  END,
  premium_price = CASE tool_key
    WHEN 'kundali' THEN 499
    WHEN 'vastu_scan' THEN 799
    WHEN 'name_suggestion' THEN 299
  END,
  premium_description = CASE tool_key
    WHEN 'kundali' THEN 'Full 20‑page Kundali report with Dasha predictions, yogas, and gemstone suggestions.'
    WHEN 'vastu_scan' THEN 'Complete 16‑zone analysis with personalised elemental remedies and Vastu corrections.'
    WHEN 'name_suggestion' THEN '108+ full names (boy/girl) with meanings and numerology compatibility.'
  END
WHERE hero_title IS NULL;

-- 3. Create tool_usage table for logging free tool interactions
CREATE TABLE IF NOT EXISTS public.tool_usage (
  id BIGSERIAL PRIMARY KEY,
  tool_type TEXT NOT NULL CHECK (tool_type IN ('kundali', 'vastu_scan', 'name_suggestion')),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  input_data JSONB,
  result_summary JSONB,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'tool_usage'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.tool_usage', pol.policyname);
  END LOOP;
END $$;

-- Anyone can insert (for anonymous usage logging)
CREATE POLICY "Anyone insert tool_usage" ON public.tool_usage
  FOR INSERT WITH CHECK (true);

-- Users can view their own usage
CREATE POLICY "Users view own usage" ON public.tool_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Admin full access
CREATE POLICY "Admin full access tool_usage" ON public.tool_usage
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Add to realtime
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.tool_usage;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- 4. Create secure function for admin stats
CREATE OR REPLACE FUNCTION public.get_tool_usage_stats()
RETURNS TABLE (
  tool_type TEXT,
  total_uses BIGINT,
  unique_users BIGINT,
  premium_unlocks BIGINT,
  last_used TIMESTAMPTZ
) SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT
    tu.tool_type,
    COUNT(*)::BIGINT,
    COUNT(DISTINCT tu.user_id)::BIGINT,
    SUM(CASE WHEN tu.is_premium THEN 1 ELSE 0 END)::BIGINT,
    MAX(tu.created_at)
  FROM public.tool_usage tu
  GROUP BY tu.tool_type;
END;
$$ LANGUAGE plpgsql;

GRANT EXECUTE ON FUNCTION public.get_tool_usage_stats() TO authenticated;

SELECT '✅ AI tools admin tables and functions created/updated.' AS status;
