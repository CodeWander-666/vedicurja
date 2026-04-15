'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface Chapter {
  id: string;
  title: string;
  videoUrl: string;
  notes: string;
  quiz: { question: string; options: string[]; answer: number }[];
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  chapters: Chapter[];
  moduleQuiz: { question: string; options: string[]; answer: number }[];
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Advanced';
  subject: 'Vastu' | 'Numerology';
  modules: Module[];
  progress: number;
}

// Sample Beginner Vastu Course
const beginnerVastu: Course = {
  id: 'vastu-beginner',
  title: 'Foundations of Vastu Shastra',
  level: 'Beginner',
  subject: 'Vastu',
  progress: 0,
  modules: [
    { id: 'm1', title: 'Introduction to Vastu', completed: false, chapters: [
      { id: 'c1', title: 'What is Vastu Shastra?', videoUrl: 'https://www.youtube.com/embed/6jr5j0fSn68', notes: 'Vastu is the ancient Indian science of architecture.', quiz: [], completed: false },
      { id: 'c2', title: 'History & Mythology', videoUrl: 'https://www.youtube.com/embed/_Sl8diqCAFw', notes: 'Origins in Vedic texts.', quiz: [], completed: false },
      { id: 'c3', title: 'The Five Elements', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Earth, Water, Fire, Air, Space.', quiz: [], completed: false },
      { id: 'c4', title: 'Directions & Their Lords', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: '8 directions and their significance.', quiz: [], completed: false },
      { id: 'c5', title: 'Vastu Purusha Mandala', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'The cosmic man and energy grid.', quiz: [], completed: false },
    ], moduleQuiz: [] },
    { id: 'm2', title: 'Residential Vastu', completed: false, chapters: [
      { id: 'c6', title: 'Plot Selection', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Ideal plot shapes and slopes.', quiz: [], completed: false },
      { id: 'c7', title: 'Main Entrance', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Placement and remedies.', quiz: [], completed: false },
      { id: 'c8', title: 'Room Placement', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Kitchen, Bedroom, Pooja.', quiz: [], completed: false },
      { id: 'c9', title: 'Colors & Materials', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Auspicious colors per direction.', quiz: [], completed: false },
      { id: 'c10', title: 'Common Remedies', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', notes: 'Simple fixes for Vastu doshas.', quiz: [], completed: false },
    ], moduleQuiz: [] },
  ],
};

export function CourseDashboard() {
  const [selectedCourse, setSelectedCourse] = useState<Course>(beginnerVastu);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const { play } = useSound();

  return (
    <div className="bg-[#F9F6F0] rounded-2xl border border-[#C88A5D]/20 shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-3 min-h-[600px]">
        {/* Sidebar: Modules */}
        <div className="bg-[#1A2A3A] p-6 text-white">
          <h3 className="font-serif text-2xl mb-6">{selectedCourse.title}</h3>
          <div className="w-full bg-[#C88A5D]/20 h-2 rounded-full mb-2">
            <div className="bg-[#E8B960] h-2 rounded-full" style={{ width: `${selectedCourse.progress}%` }} />
          </div>
          <p className="text-sm text-white/60 mb-6">{selectedCourse.progress}% Complete</p>
          
          <div className="space-y-4">
            {selectedCourse.modules.map((mod, i) => (
              <div key={mod.id}>
                <button onClick={() => { setActiveModule(mod); setActiveChapter(null); play('clickSecondary'); }} className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-sans">Module {i+1}: {mod.title}</span>
                    <span>{mod.completed ? '✅' : '🔒'}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content: Chapter Details */}
        <div className="md:col-span-2 p-6">
          {activeChapter ? (
            <div className="space-y-6">
              <button onClick={() => setActiveChapter(null)} className="text-[#C88A5D] hover:underline">← Back to Module</button>
              <h4 className="font-serif text-2xl">{activeChapter.title}</h4>
              <div className="aspect-video rounded-xl overflow-hidden border border-[#C88A5D]/20">
                <iframe width="100%" height="100%" src={activeChapter.videoUrl} title={activeChapter.title} allowFullScreen />
              </div>
              <div className="bg-white p-4 rounded-xl">
                <h5 className="font-sans font-semibold mb-2">Chapter Notes</h5>
                <p className="text-[#1A2A3A]/70">{activeChapter.notes}</p>
              </div>
              <button className="bg-[#C88A5D] text-white px-6 py-3 rounded-full font-sans">Mark Complete & Take Quiz</button>
            </div>
          ) : activeModule ? (
            <div className="space-y-4">
              <button onClick={() => setActiveModule(null)} className="text-[#C88A5D] hover:underline">← Back to Modules</button>
              <h4 className="font-serif text-2xl mb-4">{activeModule.title}</h4>
              {activeModule.chapters.map((chap, i) => (
                <button key={chap.id} onClick={() => { setActiveChapter(chap); play('hoverSlide'); }} className="w-full text-left p-4 bg-white rounded-xl border border-[#C88A5D]/10 hover:border-[#C88A5D] hover:shadow-md transition-all flex justify-between items-center">
                  <span className="font-sans">Chapter {i+1}: {chap.title}</span>
                  <span>{chap.completed ? '✓' : '→'}</span>
                </button>
              ))}
              {activeModule.chapters.every(c => c.completed) && (
                <button className="w-full mt-6 bg-[#E8B960] text-[#1A2A3A] px-6 py-3 rounded-full font-sans font-semibold">Take Module Quiz</button>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h4 className="font-serif text-2xl mb-2">Select a Module</h4>
              <p className="text-[#1A2A3A]/60">Choose a module from the sidebar to begin your learning journey.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CourseDashboard;
