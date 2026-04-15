'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { MagneticButton } from '@/components/global/MagneticButton';
import AnimatedText, { GradientText } from '@/components/ui/AnimatedText';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import WisdomLibrary3D from '@/components/learn/WisdomLibrary3D';
import CourseCard3D from '@/components/learn/CourseCard3D';
import PaymentSimulationModal from '@/components/ui/PaymentSimulationModal';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { supabase } from '@/lib/supabaseClient';
import { Course } from '@/types/course';

// ----------------------------------------------------------------------
// Section 1: Hero
// ----------------------------------------------------------------------
function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment via-white to-vastu-parchment">
      <Mandala3D />
      <FloatingParticles />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sacred-saffron uppercase tracking-[0.3em] text-sm mb-4 block">Master the Sacred Sciences</motion.span>
        <AnimatedText text="Vastu Shastra &" className="font-serif text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-2" />
        <GradientText text="Vedic Numerology" className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 block" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-nidra-indigo/70 max-w-2xl mx-auto mb-10">
          Learn from Acharya Sharma — 4th generation Vastu Guru. Structured courses with video lessons, notes, and quizzes.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton className="luxury-button"><button onClick={onCtaClick}>Explore Courses</button></MagneticButton>
          <MagneticButton className="bg-transparent border-2 border-prakash-gold text-nidra-indigo hover:bg-prakash-gold/10 px-8 py-4 rounded-full">
            <button onClick={() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })}>Wisdom Library</button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 2: Why Learn Vastu
// ----------------------------------------------------------------------
function WhyLearnSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <AnimatedText text="Why Learn Vastu Shastra?" className="font-serif text-3xl md:text-4xl text-nidra-indigo mb-6" />
        <p className="text-lg text-nidra-indigo/70">Transform your living spaces, improve health and wealth, and master an ancient science that remains profoundly relevant today.</p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 3: Wisdom Library (3D Books)
// ----------------------------------------------------------------------
function LibrarySection() {
  return <WisdomLibrary3D />;
}

// ----------------------------------------------------------------------
// Section 4: Course Offerings Intro
// ----------------------------------------------------------------------
function CoursesIntroSection() {
  return (
    <section className="py-20 bg-vastu-stone/20">
      <div className="container mx-auto px-6 text-center">
        <AnimatedText text="Structured Learning Paths" className="font-serif text-4xl text-nidra-indigo mb-4" />
        <p className="text-nidra-indigo/60 max-w-2xl mx-auto">Choose from beginner to advanced courses — all taught by Acharya Sharma.</p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 5 & 6: Beginner Courses (2 courses)
// ----------------------------------------------------------------------
function BeginnerCoursesSection({ courses, onEnroll }: { courses: Course[]; onEnroll: (course: Course) => void }) {
  const beginnerCourses = courses.filter(c => c.level === 'Beginner');
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h3 className="font-serif text-2xl text-center text-nidra-indigo mb-10">Beginner Foundations</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {beginnerCourses.map(course => (
            <CourseCard3D key={course.id} course={course} onEnroll={() => onEnroll(course)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 7 & 8: Advanced Courses (2 courses)
// ----------------------------------------------------------------------
function AdvancedCoursesSection({ courses, onEnroll }: { courses: Course[]; onEnroll: (course: Course) => void }) {
  const advancedCourses = courses.filter(c => c.level === 'Advanced');
  return (
    <section className="py-16 bg-vastu-parchment">
      <div className="container mx-auto px-6">
        <h3 className="font-serif text-2xl text-center text-nidra-indigo mb-10">Advanced Mastery</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {advancedCourses.map(course => (
            <CourseCard3D key={course.id} course={course} onEnroll={() => onEnroll(course)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 9: What You'll Get
// ----------------------------------------------------------------------
function BenefitsSection() {
  const benefits = ['HD Video Lessons', 'Detailed Chapter Notes', 'Interactive Quizzes', 'Points & Achievements', 'Certificate of Completion'];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatedText text="What You'll Get" className="font-serif text-3xl text-center text-nidra-indigo mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-vastu-stone/20 p-4 rounded-xl text-center">
              <span className="text-2xl mb-2 block">✓</span>
              <span className="text-sm">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 10: Student Success
// ----------------------------------------------------------------------
function SuccessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-vastu-parchment">
      <div className="container mx-auto px-6 text-center">
        <AnimatedText text="Join 500+ Students" className="font-serif text-4xl text-nidra-indigo mb-4" />
        <p className="text-nidra-indigo/60">Our students have gone on to become Vastu consultants and transformed their own spaces.</p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 11: FAQ
// ----------------------------------------------------------------------
function FAQSection() {
  const faqs = [
    { q: 'Do I need prior knowledge?', a: 'No, our beginner courses start from the absolute basics.' },
    { q: 'How long do I have access?', a: 'Lifetime access to all course materials.' },
    { q: 'Can I get a certificate?', a: 'Yes, upon completing all modules and quizzes.' },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <AnimatedText text="Frequently Asked Questions" className="font-serif text-3xl text-center text-nidra-indigo mb-8" />
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.details key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-vastu-stone/20 p-4 rounded-xl">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-nidra-indigo/70">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 12: Final CTA
// ----------------------------------------------------------------------
function FinalCTA({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative py-32 bg-nidra-indigo text-white text-center overflow-hidden">
      <Mandala3D />
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedText text="Begin Your Vedic Journey Today" className="font-serif text-4xl md:text-6xl mb-6 text-white" />
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">Enroll now and start learning from the master.</p>
        <MagneticButton className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg transition">
          <button onClick={onCtaClick}>Explore Courses</button>
        </MagneticButton>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function LearnVastuPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items: courses, loading } = useRealtimeContent<Course>('courses', 'created_at', false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleEnroll = (course: Course) => {
    if (!user) {
      router.push(`/signin?redirect=/learn-vastu`);
      return;
    }
    if (course.price === 0) {
      // Free course – enroll directly
      supabase.from('user_courses').insert({ user_id: user.id, course_id: course.id }).then(() => {
        router.push('/dashboard/library');
      });
    } else {
      setSelectedCourse(course);
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!user || !selectedCourse) return;
    await supabase.from('user_courses').insert({ user_id: user.id, course_id: selectedCourse.id });
    await supabase.from('payments').insert({ user_id: user.id, amount: selectedCourse.price, tool: selectedCourse.title, status: 'simulated_success' });
    setShowPayment(false);
    router.push('/dashboard/library');
  };

  const scrollToCourses = () => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" /></div>;

  const publishedCourses = courses.filter(c => c.is_published);

  return (
    <>
      <LuxuryCursor /><SoundController /><Header /><SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <HeroSection onCtaClick={scrollToCourses} />
          <WhyLearnSection />
          <div id="library"><LibrarySection /></div>
          <CoursesIntroSection />
          <div id="courses-section">
            <BeginnerCoursesSection courses={publishedCourses} onEnroll={handleEnroll} />
            <AdvancedCoursesSection courses={publishedCourses} onEnroll={handleEnroll} />
          </div>
          <BenefitsSection />
          <SuccessSection />
          <FAQSection />
          <FinalCTA onCtaClick={scrollToCourses} />
        </main>
        <Footer />
      </SmoothScroll>
      <PaymentSimulationModal isOpen={showPayment} onClose={() => setShowPayment(false)} tool={selectedCourse?.title || 'Course'} amount={selectedCourse?.price || 0} onSuccess={handlePaymentSuccess} userId={user?.id} />
    </>
  );
}
