-- =============================================================================
-- VIRTUAL CONSULTATION ENHANCEMENTS – MEETING URL, AVAILABILITY, STATUS
-- =============================================================================

-- 1. Add meeting_url to consultations if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consultations' AND column_name = 'meeting_url') THEN
    ALTER TABLE public.consultations ADD COLUMN meeting_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consultations' AND column_name = 'recording_url') THEN
    ALTER TABLE public.consultations ADD COLUMN recording_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consultations' AND column_name = 'payment_status') THEN
    ALTER TABLE public.consultations ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded'));
  END IF;
END $$;

-- 2. Create consultation_availability table for admin‑defined slots
CREATE TABLE IF NOT EXISTS public.consultation_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_booked BOOLEAN DEFAULT false,
  consultation_id UUID REFERENCES public.consultations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.consultation_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available slots" ON public.consultation_availability
  FOR SELECT USING (true);

CREATE POLICY "Admin full access availability" ON public.consultation_availability
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.consultation_availability;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- 3. Seed default availability slots (next 7 days, 9am-5pm IST)
INSERT INTO public.consultation_availability (start_time, end_time, is_booked)
SELECT
  slot_start,
  slot_start + INTERVAL '60 minutes',
  false
FROM generate_series(
  date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata') + INTERVAL '9 hours',
  date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata') + INTERVAL '7 days',
  INTERVAL '60 minutes'
) AS slot_start
WHERE EXTRACT(HOUR FROM slot_start) BETWEEN 9 AND 16
ON CONFLICT DO NOTHING;

SELECT '✅ Bookings enhancements applied.' AS status;
