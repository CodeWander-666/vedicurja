-- =============================================================================
-- STUDENT PORTAL: CHAPTER QUIZZES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.chapter_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE UNIQUE,
  questions JSONB NOT NULL, -- [{ question: string, options: string[], answerIndex: number }]
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chapter_quizzes ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public read quizzes" ON public.chapter_quizzes;
CREATE POLICY "Public read quizzes" ON public.chapter_quizzes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access quizzes" ON public.chapter_quizzes;
CREATE POLICY "Admin full access quizzes" ON public.chapter_quizzes FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Add to realtime
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chapter_quizzes;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- Sample quizzes for existing chapters (optional)
INSERT INTO public.chapter_quizzes (chapter_id, questions)
SELECT id, '[
  {"question": "What is the primary element of the North-East zone?", "options": ["Fire", "Water", "Earth", "Air"], "answerIndex": 1},
  {"question": "Which direction is governed by Kubera?", "options": ["North", "South", "East", "West"], "answerIndex": 0},
  {"question": "The Brahmasthan should be kept:", "options": ["Heavy", "Open and light", "Dark", "Cluttered"], "answerIndex": 1},
  {"question": "Which planet is associated with the South-East?", "options": ["Mars", "Venus", "Jupiter", "Saturn"], "answerIndex": 1},
  {"question": "Vastu Shastra originates from which Veda?", "options": ["Rigveda", "Samaveda", "Yajurveda", "Atharvaveda"], "answerIndex": 3}
]'::jsonb
FROM public.chapters
WHERE NOT EXISTS (SELECT 1 FROM public.chapter_quizzes WHERE chapter_id = chapters.id)
LIMIT 1;

-- Trigger: award coins on chapter completion
CREATE OR REPLACE FUNCTION public.award_chapter_coins()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = true AND OLD.completed = false THEN
    UPDATE public.profiles SET coins = coins + 10 WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_chapter_completed ON public.user_chapter_progress;
CREATE TRIGGER on_chapter_completed
  AFTER UPDATE ON public.user_chapter_progress
  FOR EACH ROW EXECUTE FUNCTION public.award_chapter_coins();

SELECT '✅ Quizzes table and trigger created.' AS status;
