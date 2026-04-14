'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useSound } from '@/hooks/useSound';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import GradientBackground from '@/components/global/GradientBackground';

interface Chapter {
  id: string;
  title: string;
  video_url: string | null;
  notes: string | null;
  order_index: number;
  quiz?: { id: string; questions: any[] } | null;
}

interface Module {
  id: string;
  title: string;
  order_index: number;
  chapters: Chapter[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  subject: string;
  price: number;
  thumbnail_url: string | null;
  is_published: boolean;
}

interface UserProgress {
  chapter_id: string;
  completed: boolean;
}

interface QuizScore {
  quizId: string;
  score: number;
}

export default function CourseDashboard({ course }: { course: Course }) {
  const { user, profile } = useAuth();
  const { play } = useSound();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<{ chapterId: string; quizId: string; questions: any[] } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [completing, setCompleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('id, title, order_index, chapters(id, title, video_url, notes, order_index, quizzes(id, questions))')
          .eq('course_id', course.id)
          .order('order_index');

        if (modulesError) throw modulesError;

        const sortedModules = (modulesData || []).map((mod: any) => ({
          ...mod,
          chapters: (mod.chapters || []).map((ch: any) => ({
            ...ch,
            quiz: ch.quizzes?.length > 0 ? ch.quizzes[0] : null,
          })).sort((a: Chapter, b: Chapter) => a.order_index - b.order_index),
        })).sort((a: Module, b: Module) => a.order_index - b.order_index);

        setModules(sortedModules);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [course.id]);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const { data: enrollment } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .single();
      setEnrolled(!!enrollment);

      const { data: progress } = await supabase
        .from('user_chapter_progress')
        .select('chapter_id, completed')
        .eq('user_id', user.id);
      setUserProgress(progress || []);

      const { data: attempts } = await supabase
        .from('user_quiz_attempts')
        .select('quiz_id, score')
        .eq('user_id', user.id);
      // Map quiz_id to quizId for internal use
      setQuizScores((attempts || []).map((a: any) => ({ quizId: a.quiz_id, score: a.score })));
    };
    fetchUserData();
  }, [user, course.id]);

  const handleEnroll = async () => {
    if (!user) return;
    const { error } = await supabase
      .from('user_courses')
      .insert({ user_id: user.id, course_id: course.id });
    if (!error) {
      setEnrolled(true);
      play('success');
    }
  };

  const handleMarkComplete = async (chapterId: string) => {
    if (!user || !enrolled) return;
    setCompleting(chapterId);
    const { error } = await supabase
      .from('user_chapter_progress')
      .upsert({ user_id: user.id, chapter_id: chapterId, completed: true, completed_at: new Date() });

    if (!error) {
      setUserProgress(prev => [...prev.filter(p => p.chapter_id !== chapterId), { chapter_id: chapterId, completed: true }]);
      // Coins are incremented by database trigger; optionally refresh profile
      play('success');
    }
    setCompleting(null);
  };

  const isChapterCompleted = (chapterId: string) => {
    return userProgress.some(p => p.chapter_id === chapterId && p.completed);
  };

  const getQuizScore = (quizId: string): number | null => {
    const attempt = quizScores.find(q => q.quizId === quizId);
    return attempt ? attempt.score : null;
  };

  const calculateProgress = () => {
    const totalChapters = modules.flatMap(m => m.chapters).length;
    const completedChapters = modules.flatMap(m => m.chapters).filter(c => isChapterCompleted(c.id)).length;
    return totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0;
  };

  const handleStartQuiz = (chapter: Chapter) => {
    if (!chapter.quiz) return;
    setActiveQuiz({
      chapterId: chapter.id,
      quizId: chapter.quiz.id,
      questions: chapter.quiz.questions,
    });
    setQuizAnswers(new Array(chapter.quiz.questions.length).fill(-1));
  };

  const handleQuizSubmit = async () => {
    if (!activeQuiz || !user) return;

    const { questions } = activeQuiz;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) correctCount++;
    });
    const score = Math.round((correctCount / questions.length) * 100);

    const { error } = await supabase
      .from('user_quiz_attempts')
      .upsert({
        user_id: user.id,
        quiz_id: activeQuiz.quizId,
        score,
        answers: quizAnswers,
      });

    if (!error) {
      setQuizScores(prev => [...prev.filter(q => q.quizId !== activeQuiz.quizId), { quizId: activeQuiz.quizId, score }]);
      // Bonus coins for passing (≥60%)
      if (score >= 60) {
        await supabase
          .from('profiles')
          .update({ coins: (profile?.coins || 0) + 20 })
          .eq('id', user.id);
      }
      play('success');
    }
    setActiveQuiz(null);
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Sign In Required</h2>
          <Link href="/signin" className="bg-[#C88A5D] text-white px-6 py-3 rounded-full">Sign In</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#C88A5D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button onClick={() => window.location.reload()} className="bg-[#C88A5D] text-white px-6 py-2 rounded-full">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-24 pb-16">
          <GradientBackground />
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mb-6">
              <div className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] p-[2px] rounded-full shadow-lg">
                <div className="bg-white rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className="font-sans font-bold text-[#1A2A3A]">{profile?.coins || 0} Coins</span>
                </div>
              </div>
            </motion.div>

            <div className="mb-8">
              <Link href="/dashboard/library" className="text-[#C88A5D] hover:underline mb-4 inline-block">← Back to My Courses</Link>
              <h1 className="font-serif text-4xl text-[#1A2A3A]">{course.title}</h1>

              {!enrolled && course.price > 0 ? (
                <div className="mt-6">
                  <button onClick={handleEnroll} className="bg-[#C88A5D] text-white px-8 py-3 rounded-full font-medium shadow-md">
                    Enroll Now - ₹{course.price}
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
                    <div
                      className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-[#1A2A3A]/60 mt-1">{calculateProgress()}% Complete</p>
                </>
              )}
            </div>

            {modules.length === 0 ? (
              <div className="text-center py-12">No modules available.</div>
            ) : (
              <div className="space-y-4">
                {modules.map((mod) => (
                  <div key={mod.id} className="bg-white rounded-2xl shadow-md border border-[#C88A5D]/20 overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                      className="w-full p-5 text-left flex justify-between items-center hover:bg-[#F9F6F0]"
                    >
                      <span className="font-serif text-xl">{mod.title}</span>
                      <span className="text-2xl">{expandedModule === mod.id ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {expandedModule === mod.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-[#C88A5D]/20 bg-[#F9F6F0]/50"
                        >
                          <div className="p-5 space-y-2">
                            {mod.chapters.map((ch) => {
                              const completed = isChapterCompleted(ch.id);
                              const quizScore = ch.quiz ? getQuizScore(ch.quiz.id) : null;
                              const quizPassed = quizScore !== null && quizScore >= 60;
                              return (
                                <div key={ch.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#C88A5D]/10">
                                  <div className="flex items-center gap-3">
                                    <span className={`w-3 h-3 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="font-sans">{ch.title}</span>
                                  </div>
                                  <div className="flex gap-3 items-center">
                                    {ch.video_url && (
                                      <button onClick={() => setActiveChapter(ch)} className="text-[#C88A5D] text-sm hover:underline">
                                        Watch
                                      </button>
                                    )}
                                    {!completed && enrolled && (
                                      <button
                                        onClick={() => handleMarkComplete(ch.id)}
                                        disabled={completing === ch.id}
                                        className="bg-[#C88A5D] text-white px-4 py-1 rounded-full text-sm"
                                      >
                                        {completing === ch.id ? '...' : 'Mark Complete'}
                                      </button>
                                    )}
                                    {completed && ch.quiz && !quizScore && (
                                      <button
                                        onClick={() => handleStartQuiz(ch)}
                                        className="bg-[#E8B960] text-[#1A2A3A] px-4 py-1 rounded-full text-sm font-medium"
                                      >
                                        Take Quiz
                                      </button>
                                    )}
                                    {quizScore !== null && (
                                      <div className="relative w-10 h-10">
                                        <svg className="w-full h-full transform -rotate-90">
                                          <circle cx="20" cy="20" r="16" stroke="#e5e7eb" strokeWidth="3" fill="none" />
                                          <circle
                                            cx="20" cy="20" r="16"
                                            stroke={quizPassed ? '#10b981' : '#ef4444'}
                                            strokeWidth="3"
                                            fill="none"
                                            strokeDasharray={`${quizScore * 1.005} 100`}
                                            strokeLinecap="round"
                                          />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                          {quizScore}%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Modal */}
          <AnimatePresence>
            {activeChapter && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveChapter(null)}>
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                  <h3 className="font-serif text-2xl mb-4">{activeChapter.title}</h3>
                  {activeChapter.video_url ? (
                    <div className="aspect-video mb-4">
                      <video controls className="w-full h-full rounded-xl" src={activeChapter.video_url} />
                    </div>
                  ) : (
                    <p className="text-[#1A2A3A]/60 mb-4">No video available.</p>
                  )}
                  <button onClick={() => setActiveChapter(null)} className="bg-[#C88A5D] text-white px-6 py-2 rounded-full">Close</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz Modal */}
          <AnimatePresence>
            {activeQuiz && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveQuiz(null)}>
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                  <h3 className="font-serif text-2xl mb-6">Chapter Quiz</h3>
                  {activeQuiz.questions.map((q, idx) => (
                    <div key={idx} className="mb-6">
                      <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt: string, optIdx: number) => (
                          <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`q-${idx}`}
                              value={optIdx}
                              checked={quizAnswers[idx] === optIdx}
                              onChange={() => {
                                const newAnswers = [...quizAnswers];
                                newAnswers[idx] = optIdx;
                                setQuizAnswers(newAnswers);
                              }}
                              className="accent-[#C88A5D]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 justify-end mt-6">
                    <button onClick={() => setActiveQuiz(null)} className="px-6 py-2 border border-[#C88A5D] text-[#C88A5D] rounded-full">Cancel</button>
                    <button onClick={handleQuizSubmit} className="bg-[#C88A5D] text-white px-6 py-2 rounded-full">Submit</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
