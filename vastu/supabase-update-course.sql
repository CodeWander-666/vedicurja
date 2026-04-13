-- Update the advanced Vastu course to include the provided video URL
-- Run this in the Supabase SQL Editor

-- First, find the advanced Vastu course (assuming slug = 'vastu-advanced')
-- Then update the first chapter of the first module with the video URL

UPDATE public.chapters
SET video_url = 'https://zcljqdjnxmvjfnvgagui.supabase.co/storage/v1/object/public/course_videos/how-it-works.mp4'
WHERE id IN (
  SELECT c.id
  FROM public.chapters c
  JOIN public.modules m ON c.module_id = m.id
  JOIN public.courses co ON m.course_id = co.id
  WHERE co.slug = 'vastu-advanced'
  ORDER BY m.order_index, c.order_index
  LIMIT 1
);
