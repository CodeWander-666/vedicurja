'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import GradientBackground from '@/components/global/GradientBackground';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';

interface EnrolledCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  subject: string;
  thumbnail_url: string | null;
  progress: number;
  enrolled_at: string;
}

export default function MyLibraryPage() {
  const { user, profile } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchEnrolledCourses = async () => {
      // 获取用户注册的课程
      const { data: enrollments, error: enrollError } = await supabase
        .from('user_courses')
        .select(`
          enrolled_at,
          courses:course_id (
            id, title, slug, description, level, subject, thumbnail_url
          )
        `)
        .eq('user_id', user.id);

      if (enrollError) {
        console.error('Failed to fetch enrollments:', enrollError);
        setLoading(false);
        return;
      }

      // 获取每个课程的进度
      const coursesWithProgress = await Promise.all(
        (enrollments || []).map(async (enrollment: any) => {
          const course = enrollment.courses;
          
          // 获取课程的所有章节
          const { data: modules } = await supabase
            .from('modules')
            .select('id, chapters(id)')
            .eq('course_id', course.id);
          
          const totalChapters = modules?.flatMap(m => m.chapters).length || 0;
          
          // 获取用户已完成的章节
          const { data: progress } = await supabase
            .from('user_chapter_progress')
            .select('chapter_id')
            .eq('user_id', user.id)
            .eq('completed', true);
          
          const completedChapterIds = new Set((progress || []).map(p => p.chapter_id));
          let completedCount = 0;
          modules?.forEach(m => {
            m.chapters?.forEach((ch: any) => {
              if (completedChapterIds.has(ch.id)) completedCount++;
            });
          });
          
          const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;
          
          return {
            ...course,
            progress: progressPercent,
            enrolled_at: enrollment.enrolled_at,
          };
        })
      );

      setEnrolledCourses(coursesWithProgress);
      setLoading(false);
    };

    fetchEnrolledCourses();
  }, [user]);

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

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-28 pb-20">
          <GradientBackground />
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <h1 className="font-serif text-4xl text-[#1A2A3A]">My Courses</h1>
              <p className="font-sans text-[#1A2A3A]/60 mt-1">Continue your learning journey</p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#C88A5D] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="text-center py-12 bg-white/50 rounded-2xl">
                <p className="text-[#1A2A3A]/60 mb-4">You haven't enrolled in any courses yet.</p>
                <Link href="/learn-vastu" className="bg-[#C88A5D] text-white px-6 py-3 rounded-full inline-block">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#C88A5D]/20"
                  >
                    <Link href={`/courses/course?slug=${course.slug}`}>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-[#C88A5D] uppercase">{course.level}</span>
                          <span className="text-xs text-[#1A2A3A]/50">{course.subject}</span>
                        </div>
                        <h3 className="font-serif text-xl text-[#1A2A3A] mb-2">{course.title}</h3>
                        <p className="text-sm text-[#1A2A3A]/60 mb-4 line-clamp-2">{course.description}</p>
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                          <div
                            className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-right text-xs text-[#1A2A3A]/50">{course.progress}% Complete</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
