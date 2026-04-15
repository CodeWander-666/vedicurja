'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';

function CourseContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <div className="text-center py-12">Course: {slug}</div>;
}

export default function CoursePage() {
  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="container mx-auto px-6">
            <Suspense fallback={<div>Loading...</div>}>
              <CourseContent />
            </Suspense>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
