'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Module, Chapter, UserProgress, QuizScore } from '@/types/course';

interface Props {
  module: Module;
  chapters: Chapter[];
  userProgress: UserProgress[];
  quizScores: QuizScore[];
  onSelectChapter: (chapter: Chapter) => void;
}

export default function ModuleAccordion({ module, chapters, userProgress, quizScores, onSelectChapter }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const completedChapters = chapters.filter(c => userProgress.some(p => p.chapter_id === c.id && p.completed)).length;
  const progress = chapters.length ? Math.round((completedChapters / chapters.length) * 100) : 0;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-prakash-gold/20 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-5 flex items-center justify-between hover:bg-prakash-gold/5 transition">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                pathColor: '#C88A5D',
                textColor: '#1A2A3A',
                trailColor: '#F4EFE6',
                textSize: '24px',
              })}
            />
          </div>
          <span className="font-serif text-xl text-nidra-indigo">{module.title}</span>
        </div>
        <span className="text-2xl text-prakash-gold">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-5 pt-0 space-y-2 border-t border-prakash-gold/20">
              {chapters.map(ch => {
                const isCompleted = userProgress.some(p => p.chapter_id === ch.id && p.completed);
                const quizScore = quizScores.find(q => q.quizId === ch.quiz?.id)?.score;
                const borderColor = quizScore !== undefined ? (quizScore >= 60 ? '#10b981' : '#ef4444') : '#d1d5db';
                return (
                  <div key={ch.id} className="flex items-center justify-between p-3 bg-white rounded-lg border" style={{ borderColor }}>
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>{ch.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {quizScore !== undefined && (
                        <div className="w-8 h-8">
                          <CircularProgressbar value={quizScore} text={`${quizScore}`} styles={buildStyles({ pathColor: borderColor, textColor: '#1A2A3A', textSize: '28px' })} />
                        </div>
                      )}
                      <button onClick={() => onSelectChapter(ch)} className="text-sm text-prakash-gold font-medium">View →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
