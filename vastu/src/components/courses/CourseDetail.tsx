'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import ModuleAccordion from './ModuleAccordion';
import ChapterViewer from './ChapterViewer';
import { Course, Module, Chapter, UserProgress, QuizScore } from '@/types/course';

interface Props {
  course: Course;
  userId: string;
  onClose: () => void;
}

export default function CourseDetail({ course, userId, onClose }: Props) {
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: mods }, { data: prog }, { data: attempts }] = await Promise.all([
        supabase.from('modules').select('*, chapters(*, quizzes(*))').eq('course_id', course.id).order('order_index'),
        supabase.from('user_chapter_progress').select('*').eq('user_id', userId),
        supabase.from('user_quiz_attempts').select('quiz_id, score').eq('user_id', userId)
      ]);
      setModules(mods || []);
      setUserProgress(prog || []);
      setQuizScores(attempts?.map((a: any) => ({ quizId: a.quiz_id, score: a.score })) || []);
      setLoading(false);
    };
    fetchData();
  }, [course.id, userId]);

  const handleChapterComplete = () => {
    supabase.from('user_chapter_progress').select('*').eq('user_id', userId).then(({ data }) => setUserProgress(data || []));
  };

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow-xl border border-prakash-gold/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl text-nidra-indigo">{course.title}</h2>
        <button onClick={onClose} className="text-2xl text-nidra-indigo/60">✕</button>
      </div>
      <div className="space-y-4">
        {modules.map(mod => (
          <ModuleAccordion
            key={mod.id}
            module={mod}
            chapters={mod.chapters}
            userProgress={userProgress}
            quizScores={quizScores}
            onSelectChapter={setSelectedChapter}
          />
        ))}
      </div>
      {selectedChapter && (
        <ChapterViewer
          chapter={selectedChapter}
          userId={userId}
          isCompleted={userProgress.some(p => p.chapter_id === selectedChapter.id)}
          onClose={() => setSelectedChapter(null)}
          onComplete={handleChapterComplete}
          onQuizSubmit={(score) => setQuizScores(prev => [...prev.filter(q => q.quizId !== selectedChapter.quiz?.id), { quizId: selectedChapter.quiz?.id!, score }])}
        />
      )}
    </motion.div>
  );
}
