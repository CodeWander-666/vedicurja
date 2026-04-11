'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });
const LuxuryCursor = dynamic(() => import('@/components/global/LuxuryCursor'), { ssr: false });
const SoundController = dynamic(() => import('@/components/global/SoundController'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/global/ScrollSmoother'), { ssr: false });

const courses = [
  { id: 'vastu-beginner', title: 'Vastu Foundations', level: 'Beginner', duration: '4 weeks', modules: 2, description: 'Master the core principles of Vastu Shastra.', color: '#C88A5D' },
  { id: 'vastu-advanced', title: 'Advanced Vastu', level: 'Advanced', duration: '8 weeks', modules: 3, description: 'Deep dive into commercial Vastu and remedies.', color: '#8B5A2B' },
  { id: 'numerology-beginner', title: 'Numerology Basics', level: 'Beginner', duration: '3 weeks', modules: 2, description: 'Learn Pythagorean and Chaldean systems.', color: '#1985A1' },
  { id: 'numerology-advanced', title: 'Master Numerology', level: 'Advanced', duration: '6 weeks', modules: 3, description: 'Master numbers, compatibility, and forecasting.', color: '#9A4C95' },
];

export default function CoursesPage() {
  const { play } = useSound();
  const { t } = useLanguage();

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
          <GradientBackground />
          
          {/* Welcome Bar with 3D effect */}
          <section className="relative pt-32 pb-12 px-6">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-[#C88A5D]/30"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <h1 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-2">
                  Welcome to <span className="text-[#C88A5D]">VedicUrja</span> Courses
                </h1>
                <p className="font-sans text-lg text-[#1A2A3A]/70">
                  Join our global community of brilliant students serving clients worldwide.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Upcoming Live Sessions Bar */}
          <section className="py-6 px-6">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-[#C88A5D]/10 to-[#E8B960]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#C88A5D]/30 flex flex-wrap items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔴</span>
                  <span className="font-sans font-medium text-[#1A2A3A]">Upcoming Live: Vastu Q&A with Acharya – Today 7 PM IST</span>
                </div>
                <a href="#" className="bg-[#C88A5D] hover:bg-[#A06A3D] text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
                  Join Session
                </a>
              </motion.div>
            </div>
          </section>

          {/* Four Course Cards */}
          <section className="py-16 px-6">
            <div className="container mx-auto max-w-6xl">
              <h2 className="font-serif text-4xl text-center text-[#1A2A3A] mb-12">Our Sacred Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#C88A5D]/20 hover:shadow-xl transition-all group"
                  >
                    <div className="h-2" style={{ backgroundColor: course.color }} />
                    <div className="p-5">
                      <h3 className="font-serif text-xl text-[#1A2A3A] mb-1">{course.title}</h3>
                      <p className="text-sm text-[#C88A5D] mb-2">{course.level} • {course.duration}</p>
                      <p className="text-sm text-[#1A2A3A]/60 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#1A2A3A]/50">{course.modules} modules</span>
                        <Link
                          href={`/courses/${course.id}`}
                          onClick={() => play('clickPrimary')}
                          className="bg-[#C88A5D] hover:bg-[#A06A3D] text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                        >
                          Enroll
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
