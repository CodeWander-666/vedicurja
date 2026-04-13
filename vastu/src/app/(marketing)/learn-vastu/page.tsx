'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { HeroButton } from '@/components/global/HeroButton';
import { useAuth } from '@/hooks/useAuth';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabaseClient';
import { Course } from '@/types/course';
import { CourseCard } from '@/components/courses/CourseCard';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });
const Bookshelf3D = dynamic(() => import('@/components/learn/Bookshelf3D'), { ssr: false });

export default function LearnVastuPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const { play } = useSound();
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          setError(error.message);
        } else {
          console.log('📚 Courses fetched:', data?.length || 0);
          setCourses(data || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load courses');
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  // 实时订阅（可选，用于管理面板）
  useEffect(() => {
    const channel = supabase
      .channel('courses-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, (payload) => {
        console.log('🔄 Course changed:', payload);
        // 可在此刷新课程列表
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (authLoading || loadingCourses) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C88A5D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#1A2A3A]/70">Loading your sacred learning space...</p>
        </div>
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
        <main className="relative z-10">
          <GradientBackground />
          
          <section className="relative pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-5xl md:text-7xl text-[#1A2A3A] mb-6 leading-tight"
              >
                {user ? `Welcome back, ${profile?.full_name?.split(' ')[0] || 'Seeker'}` : 'Discover the Sacred Science'}
                <br />
                <span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">
                  {user ? 'Continue Your Journey' : 'of Vastu Shastra'}
                </span>
              </motion.h1>
              
              {!user && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-xl text-[#1A2A3A]/70 max-w-3xl mx-auto mb-10"
                >
                  Sign in to track your progress, earn coins, and unlock exclusive content.
                </motion.p>
              )}
              
              {user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-4 mb-10"
                >
                  <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-[#C88A5D]/20">
                    <span className="text-xl mr-2">⭐</span>
                    <span className="font-sans font-bold text-[#1A2A3A]">{profile?.coins || 0} Coins</span>
                  </div>
                </motion.div>
              )}

              {!user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex gap-4 justify-center"
                >
                  <HeroButton href="/signin">Sign In</HeroButton>
                  <HeroButton href="/signup">Create Free Account</HeroButton>
                </motion.div>
              )}
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-serif text-4xl text-center text-[#1A2A3A] mb-12"
              >
                The Sacred Library
              </motion.h2>
            </div>
            <Bookshelf3D />
          </section>

          <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-serif text-4xl text-center text-[#1A2A3A] mb-4"
              >
                Our Sacred Courses
              </motion.h2>
              <p className="text-center text-[#1A2A3A]/60 mb-12">
                Master Vastu Shastra and Numerology with industry-leading curriculum
              </p>
              
              {courses.length === 0 ? (
                <p className="text-center text-[#1A2A3A]/50">No courses available yet. Check back soon!</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {courses.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
