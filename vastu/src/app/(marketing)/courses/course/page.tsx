'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseDashboard from '@/components/courses/CourseDashboard';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

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

function CourseContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('No course specified');
      return;
    }

    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) throw error;
        setCourse(data);
      } catch (err: any) {
        console.error('Failed to fetch course:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (!slug) return <div className="pt-32 text-center">No course specified.</div>;
  if (loading) return <div className="pt-32 text-center">Loading course...</div>;
  if (error) return <div className="pt-32 text-center text-red-500">Error: {error}</div>;
  if (!course) return <div className="pt-32 text-center">Course not found.</div>;

  return <CourseDashboard course={course} />;
}

export default function CoursePage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
      <CourseContent />
    </Suspense>
  );
}
