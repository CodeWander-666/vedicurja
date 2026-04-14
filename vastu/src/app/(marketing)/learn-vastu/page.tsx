'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import LuxuryAnimatedBackground from '@/components/ui/LuxuryAnimatedBackground';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { Course } from '@/types/admin';
import { media } from '@/lib/mediaConfig';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

export default function LearnVastuPage() {
  const { items: courses } = useRealtimeContent<Course>('courses', 'created_at', false);

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main className="relative z-10">
          <LuxuryAnimatedBackground />
          
          <section className="relative pt-32 pb-20 px-6 text-center">
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} className="section-title">
              Discover the Sacred Science<br />
              <span className="vedic-gradient-text">of Vastu Shastra</span>
            </motion.h1>
            <p className="section-subtitle">Embark on a transformative journey through ancient texts and practical applications.</p>
          </section>

          <section className="py-16 bg-vastu-parchment/80 dark:bg-obsidian-black/80 backdrop-blur-sm">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sacred-saffron uppercase tracking-widest">Featured Course</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-nidra-indigo dark:text-dark-text-primary mt-3 mb-6">Vastu Foundations</h2>
                  <p className="text-nidra-indigo/70 dark:text-dark-text-secondary mb-6">Master the core principles of Vastu Shastra with our comprehensive beginner course.</p>
                  <HeroButton href="/courses/course?slug=vastu-beginner">Start Learning →</HeroButton>
                </div>
                <LuxuryTiltCard>
                  <video autoPlay loop muted playsInline className="w-full h-[300px] object-cover rounded-3xl shadow-luxury-xl">
                    <source src={media.videos.vastuConsultation} type="video/mp4" />
                  </video>
                </LuxuryTiltCard>
              </div>
            </div>
          </section>

          <section className="py-24 bg-white/70 dark:bg-obsidian-black/70 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <h2 className="section-title text-center mb-16">Our Sacred Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                  <Link key={course.id} href={`/courses/course?slug=${course.slug}`}>
                    <LuxuryTiltCard className="h-full">
                      <div className="bg-white/80 dark:bg-obsidian-surface/80 backdrop-blur-md rounded-2xl overflow-hidden border border-prakash-gold/30 h-full">
                        <img src={course.thumbnail_url || media.thumbnails.vastu} alt={course.title} className="w-full h-40 object-cover" />
                        <div className="p-5">
                          <span className="text-xs text-sacred-saffron uppercase">{course.level}</span>
                          <h3 className="font-serif text-xl text-nidra-indigo dark:text-dark-text-primary mt-1 mb-2">{course.title}</h3>
                          <p className="text-nidra-indigo/70 dark:text-dark-text-secondary text-sm line-clamp-2">{course.description}</p>
                          <p className="mt-4 font-medium text-prakash-gold">{course.price === 0 ? 'Free' : `₹${course.price}`}</p>
                        </div>
                      </div>
                    </LuxuryTiltCard>
                  </Link>
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
