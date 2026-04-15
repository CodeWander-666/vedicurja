'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import ChapterQuiz from './ChapterQuiz';
import { Chapter, Quiz } from '@/types/course';

interface Props {
  chapter: Chapter;
  userId: string;
  isCompleted: boolean;
  onClose: () => void;
  onComplete: () => void;
  onQuizSubmit: (score: number) => void;
}

export default function ChapterViewer({ chapter, userId, isCompleted, onClose, onComplete, onQuizSubmit }: Props) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [completing, setCompleting] = useState(false);

  const handleMarkComplete = async () => {
    setCompleting(true);
    await supabase.from('user_chapter_progress').upsert({ user_id: userId, chapter_id: chapter.id, completed: true, completed_at: new Date() });
    onComplete();
    setShowQuiz(true);
    setCompleting(false);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-2xl text-nidra-indigo">{chapter.title}</h3>
              <button onClick={onClose} className="text-2xl text-nidra-indigo/60 hover:text-nidra-indigo">✕</button>
            </div>
            {chapter.video_url && (
              <div className="aspect-video mb-6 rounded-xl overflow-hidden">
                <video controls className="w-full h-full" src={chapter.video_url} />
              </div>
            )}
            <div className="prose prose-lg max-w-none mb-6">
              <h4 className="font-serif text-xl mb-2">Chapter Notes</h4>
              <div className="bg-vastu-stone/20 p-4 rounded-xl" dangerouslySetInnerHTML={{ __html: chapter.notes || 'No notes available.' }} />
            </div>
            {!isCompleted && (
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMarkComplete}
                  disabled={completing}
                  className="relative luxury-button px-8 py-3"
                >
                  {completing ? 'Marking...' : 'Mark as Complete'}
                  <span className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping" />
                  </span>
                </motion.button>
              </div>
            )}
            {showQuiz && chapter.quiz && (
              <div className="mt-8">
                <ChapterQuiz quiz={chapter.quiz} onSubmit={onQuizSubmit} />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
