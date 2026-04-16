-- Ensure RLS policies allow admin full CRUD
DROP POLICY IF EXISTS "Admin full access availability" ON public.consultation_availability;
CREATE POLICY "Admin full access availability" ON public.consultation_availability
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Ensure the table is in the realtime publication
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.consultation_availability;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- Grant necessary permissions (should already exist, but ensure)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultation_availability TO authenticated;
GRANT SELECT ON public.consultation_availability TO anon;
