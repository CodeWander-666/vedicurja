'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { GradientBackground } from '@/components/global/GradientBackground';

// Generate course data dynamically
const generateCourseData = (courseId: string) => {
  const modules = [];
  const moduleCount = courseId.includes('beginner') ? 2 : 3;
  for (let m = 1; m <= moduleCount; m++) {
    const chapters = [];
    const chapterCount = courseId.includes('beginner') ? 5 : 6;
    for (let c = 1; c <= chapterCount; c++) {
      chapters.push({
        id: `ch${m}${c}`,
        title: `Chapter ${c}: ${getChapterTitle(courseId, m, c)}`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notes: `Detailed notes for chapter ${c}.`,
        quiz: [
          { question: 'What is the primary element of the North-East?', options: ['Water', 'Fire', 'Earth', 'Air'], answer: 0 },
          { question: 'Which direction is governed by Kubera?', options: ['North', 'South', 'East', 'West'], answer: 0 },
        ],
        completed: false,
      });
    }
    modules.push({
      id: `mod${m}`,
      title: `Module ${m}: ${getModuleTitle(courseId, m)}`,
      chapters,
      moduleQuiz: [
        { question: 'Final module assessment', options: ['Option 1', 'Option 2'], answer: 0 },
      ],
      completed: false,
    });
  }
  return modules;
};

function getModuleTitle(courseId: string, m: number): string {
  if (courseId.includes('vastu')) return m === 1 ? 'Foundations' : m === 2 ? 'Residential Vastu' : 'Commercial Vastu';
  return m === 1 ? 'Pythagorean' : m === 2 ? 'Chaldean' : 'Advanced Numbers';
}
function getChapterTitle(courseId: string, m: number, c: number): string {
  const titles: Record<string, string[]> = {
    'vastu-beginner': ['What is Vastu?', 'History', 'Five Elements', 'Directions', 'Vastu Purusha'],
  };
  return titles[courseId]?.[c-1] || `Core Concept ${c}`;
}

export default function CourseDashboard({ course }: { course: any }) {
  const [modules, setModules] = useState(() => generateCourseData(course.id));
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [showQuiz, setShowQuiz] = useState<any>(null);
  const { play } = useSound();

  const calculateProgress = () => {
    const total = modules.flatMap(m => m.chapters).length;
    const done = modules.flatMap(m => m.chapters).filter(c => c.completed).length;
    return total ? Math.round((done / total) * 100) : 0;
  };

  const handleMarkComplete = (chapterId: string) => {
    setModules(prev => prev.map(mod => ({
      ...mod,
      chapters: mod.chapters.map(ch => ch.id === chapterId ? { ...ch, completed: true } : ch),
    })));
    setUserPoints(p => p + 10);
    play('success');
    if (activeChapter?.id === chapterId) setActiveChapter(null);
  };

  const handleQuizComplete = (score: number) => {
    setUserPoints(p => p + score * 5);
    play('success');
    setShowQuiz(null);
  };

  const allCourses = [
    { id: 'vastu-beginner', title: 'Vastu Foundations', color: '#C88A5D' },
    { id: 'vastu-advanced', title: 'Advanced Vastu', color: '#8B5A2B' },
    { id: 'numerology-beginner', title: 'Numerology Basics', color: '#1985A1' },
    { id: 'numerology-advanced', title: 'Master Numerology', color: '#9A4C95' },
  ];

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-24 pb-16" style={{ pointerEvents: 'auto' }}>
          <GradientBackground />
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Points Bar */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mb-6">
              <div className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] p-[2px] rounded-full shadow-lg transform hover:scale-105 transition-transform">
                <div className="bg-white rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-sans font-bold text-[#1A2A3A]">{userPoints} Points</span>
                </div>
              </div>
            </motion.div>

            {/* Course Header */}
            <div className="mb-8">
              <Link href="/learn-vastu" className="text-[#C88A5D] hover:underline mb-4 inline-block">← Back to Courses</Link>
              <h1 className="font-serif text-4xl text-[#1A2A3A]">{course.title}</h1>
              <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
                <div className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] h-3 rounded-full transition-all duration-500" style={{ width: `${calculateProgress()}%` }} />
              </div>
              <p className="text-right text-sm text-[#1A2A3A]/60 mt-1">{calculateProgress()}% Complete</p>
            </div>

            {/* Course Switcher */}
            <div className="mb-10">
              <h3 className="font-serif text-2xl text-[#1A2A3A] mb-4">Switch Course</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allCourses.map(c => (
                  <Link key={c.id} href={`/courses/${c.id}`} className={`p-4 rounded-xl border-2 text-center transition-all ${course.id === c.id ? 'border-[#C88A5D] bg-[#C88A5D]/10' : 'border-gray-200 hover:border-[#C88A5D]/50'}`} onClick={() => play('clickSecondary')}>
                    <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: c.color }} />
                    <span className="font-sans text-sm font-medium">{c.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Live Session Bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-[#C88A5D]/10 to-[#E8B960]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#C88A5D]/30 flex flex-wrap items-center justify-between mb-8">
              <div className="flex items-center gap-3"><span className="text-2xl">🔴</span><span className="font-sans font-medium text-[#1A2A3A]">Upcoming Live: Vastu Q&A – Today 7 PM IST</span></div>
              <a href="#" className="bg-[#C88A5D] hover:bg-[#A06A3D] text-white px-6 py-2 rounded-full text-sm font-medium">Join Session</a>
            </motion.div>

            {/* Modules */}
            <div className="space-y-4">
              {modules.map((mod) => (
                <div key={mod.id} className="bg-white rounded-2xl shadow-md border border-[#C88A5D]/20 overflow-hidden">
                  <button onClick={() => { setExpandedModule(expandedModule === mod.id ? null : mod.id); play('clickSecondary'); }} className="w-full p-5 text-left flex justify-between items-center hover:bg-[#F9F6F0] transition-colors">
                    <span className="font-serif text-xl text-[#1A2A3A]">{mod.title}</span>
                    <span className="text-2xl">{expandedModule === mod.id ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandedModule === mod.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-[#C88A5D]/20 bg-[#F9F6F0]/50">
                        <div className="p-5">
                          <svg viewBox="0 0 400 40" className="w-full h-10">
                            {mod.chapters.map((_, i) => (
                              <motion.circle key={i} cx={40 + i * 70} cy="20" r="8" fill={mod.chapters[i].completed ? '#C88A5D' : '#E0E0E0'} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} />
                            ))}
                            <motion.path d={`M 48 20 L ${40 + (mod.chapters.length-1)*70 - 8} 20`} stroke="#C88A5D" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                          </svg>
                        </div>
                        <div className="px-5 pb-5 space-y-2">
                          {mod.chapters.map((ch) => (
                            <div key={ch.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#C88A5D]/10">
                              <div className="flex items-center gap-3"><span className={`w-2 h-2 rounded-full ${ch.completed ? 'bg-green-500' : 'bg-gray-300'}`} /><span className="font-sans">{ch.title}</span></div>
                              <div className="flex gap-2">
                                <button onClick={() => { setActiveChapter(ch); play('clickSecondary'); }} className="text-sm text-[#C88A5D] hover:underline">View</button>
                                {!ch.completed && <button onClick={() => handleMarkComplete(ch.id)} className="text-sm bg-[#C88A5D] text-white px-3 py-1 rounded-full">Mark Complete</button>}
                              </div>
                            </div>
                          ))}
                          {mod.chapters.every(c => c.completed) && (
                            <button onClick={() => setShowQuiz(mod.moduleQuiz)} className="mt-4 w-full bg-[#E8B960] text-[#1A2A3A] font-medium py-2 rounded-full">Take Module Quiz (+25 Points)</button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Modal */}
          <AnimatePresence>
            {activeChapter && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveChapter(null)}>
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                  <h3 className="font-serif text-2xl mb-4">{activeChapter.title}</h3>
                  <div className="aspect-video mb-4"><iframe width="100%" height="100%" src={activeChapter.videoUrl} title="Chapter Video" allowFullScreen className="rounded-lg" /></div>
                  <div className="prose mb-6"><h4>Notes</h4><p>{activeChapter.notes}</p></div>
                  <button onClick={() => { setActiveChapter(null); play('clickSecondary'); }} className="bg-[#C88A5D] text-white px-6 py-2 rounded-full">Close</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz Modal */}
          <AnimatePresence>
            {showQuiz && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-lg w-full p-6">
                  <h3 className="font-serif text-2xl mb-4">Module Quiz</h3>
                  {showQuiz.map((q: any, i: number) => (
                    <div key={i} className="mb-4"><p className="font-medium mb-2">{q.question}</p>{q.options.map((opt: string, j: number) => (<label key={j} className="block"><input type="radio" name={`q${i}`} value={j} className="mr-2" /> {opt}</label>))}</div>
                  ))}
                  <button onClick={() => handleQuizComplete(showQuiz.length)} className="bg-[#C88A5D] text-white px-6 py-2 rounded-full">Submit & Earn Points</button>
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
