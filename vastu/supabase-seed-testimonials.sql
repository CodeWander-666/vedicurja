INSERT INTO public.testimonials (client_name, location, project_type, rating, content, verified, is_published) VALUES
('Priya & Raj Malhotra', 'Bengaluru, India', 'Residential', 5, 'Acharya''s guidance transformed our home. After simple corrections, our relationship healed and business grew by 30%.', true, true),
('James Whitmore', 'New York, USA', 'Commercial', 5, 'Our Manhattan office was stagnant. Acharya performed a remote audit and we closed two major deals within three months.', true, true),
('Ananya Sharma', 'Dubai, UAE', 'Residential', 5, 'I suffered from chronic insomnia. Acharya identified a geopathic stress line. I now sleep peacefully every night.', true, true),
('Michael Chen', 'Singapore', 'Industrial', 5, 'Factory breakdowns reduced by 60%. Highly recommended for any manufacturing unit.', true, true),
('Elena Rossi', 'Milan, Italy', 'Spiritual', 5, 'Our yoga retreat in Tuscany was fully booked after Acharya realigned the meditation hall.', true, true)
ON CONFLICT DO NOTHING;
