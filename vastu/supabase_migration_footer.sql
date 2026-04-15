-- Insert footer settings into site_settings (idempotent)
INSERT INTO public.site_settings (key, value) VALUES
  ('footer_about', 'VedicUrja – Ancient Wisdom. Modern Precision. Authentic Vastu Shastra consultations by Acharya, rooted in sacred lineage.'),
  ('footer_address', 'Uttar Pradesh, India'),
  ('footer_phone', '+91 98765 43210'),
  ('footer_email', 'acharya@vedicurja.com'),
  ('footer_copyright', '© 2026 VedicUrja. All rights reserved.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
