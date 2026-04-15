-- Add language_preference column to profiles if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'language_preference') THEN
    ALTER TABLE public.profiles ADD COLUMN language_preference TEXT DEFAULT 'en';
  END IF;
END $$;
