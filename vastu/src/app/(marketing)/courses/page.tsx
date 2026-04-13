'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });
const LuxuryCursor = dynamic(() => import('@/components/global/LuxuryCursor'), { ssr: false });
const SoundController = dynamic(() => import('@/components/global/SoundController'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/global/ScrollSmoother'), { ssr: false });
const CourseCards = dynamic(() => import('@/components/courses/CourseCards'), { ssr: false });

export default function CoursesPage() {
  const { play } = useSound();
  const { t } = useLanguage();

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10">
          <GradientBackground />
          <section className="relative pt-32 pb-12 px-6">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-[#C88A5D]/30"
              >
                <h1 className="font-serif text-4xl text-[#1A2A3A]">
                  Welcome to <span className="text-[#C88A5D]">VedicUrja</span> Courses
                </h1>
                <p className="font-sans text-lg text-[#1A2A3A]/70">Join our global community of brilliant students.</p>
              </motion.div>
            </div>
          </section>
          <section className="py-6 px-6">
            <div className="container mx-auto max-w-5xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-[#C88A5D]/10 to-[#E8B960]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#C88A5D]/30 flex justify-between">
                <span>🔴 Upcoming Live: Vastu Q&A – Today 7 PM IST</span>
                <a href="#" className="bg-[#C88A5D] text-white px-6 py-2 rounded-full">Join</a>
              </motion.div>
            </div>
          </section>
          <section className="py-16 px-6">
            <div className="container mx-auto max-w-6xl">
              <h2 className="font-serif text-4xl text-center text-[#1A2A3A] mb-12">Our Sacred Courses</h2>
              <CourseCards />
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
