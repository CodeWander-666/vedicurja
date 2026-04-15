import GlobalLoader from '@/components/ui/GlobalLoader';
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import PointsBadge from '@/components/ui/PointsBadge';
import EnrolledCourseCard from '@/components/courses/EnrolledCourseCard';
import CourseDetail from '@/components/courses/CourseDetail';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { Course } from '@/types/course';

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchCourses = async () => {
      const { data: enrollments } = await supabase.from('user_courses').select('course_id').eq('user_id', user.id);
      if (enrollments?.length) {
        const { data: courses } = await supabase.from('courses').select('*').in('id', enrollments.map(e => e.course_id));
        setEnrolledCourses(courses || []);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [user]);

  const calculateProgress = (course: Course) => {
    // This would be computed from user_chapter_progress – simplified for demo
    return 0;
  };

  if (authLoading || loading) {
    return <div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!user) {
    return (
      <>
      </>
    );
  }

  return (
    <>
      <LuxuryCursor /><SoundController /><Header /><PointsBadge />
      <SmoothScroll>
        <main className="pt-28 pb-20 px-6 min-h-screen bg-vastu-parchment">
          <div className="max-w-7xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl text-nidra-indigo mb-8">My Learning Library</motion.h1>
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-nidra-indigo/60 mb-4">You haven't enrolled in any courses yet.</p>
                <a href="/learn-vastu" className="luxury-button">Browse Courses</a>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => (
                  <EnrolledCourseCard
                    key={course.id}
                    course={course}
                    progress={calculateProgress(course)}
                    onClick={() => setSelectedCourse(course)}
                  />
                ))}
              </div>
            )}
            <AnimatePresence>
              {selectedCourse && (
                <div className="mt-12">
                  <CourseDetail course={selectedCourse} userId={user.id} onClose={() => setSelectedCourse(null)} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
