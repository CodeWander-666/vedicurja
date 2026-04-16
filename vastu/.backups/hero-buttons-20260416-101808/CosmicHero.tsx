'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import './CosmicHero.css';

interface HomeSection {
  section_key: string;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  is_published: boolean;
}

const fallbackData: HomeSection = {
  section_key: 'hero',
  title: 'Ancient Wisdom.',
  subtitle: 'Modern Precision.',
  description: 'Guided by Acharya KK Nagaich ji, rooted in the sacred geometry of Uttar Pradesh.',
  button_text: 'Consult Acharya',
  button_link: '/contact',
  secondary_button_text: 'Explore Free Tools',
  secondary_button_link: '/free-tools',
  is_published: true,
};

export function CosmicHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const heroData = items.find(item => item.section_key === 'hero') || fallbackData;

  if (!heroData.is_published) return null;

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div style={{ rotate: mandalaRotate }} className="mandala-3d">
          <div className="mandala-ring ring1" />
          <div className="mandala-ring ring2" />
          <div className="mandala-ring ring3" />
          <div className="mandala-core">ॐ</div>
        </motion.div>
      </div>
      <div className="particles-container">
        {[...Array(20)].map((_, i) => <div key={i} className={`particle particle-${i}`} />)}
      </div>
      <motion.div style={{ y }} className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-6 leading-tight"
        >
          <span className="vedic-gradient-text">{heroData.title}</span>
          <br />
          <span className="text-prakash-gold">{heroData.subtitle}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-sans text-base sm:text-lg md:text-xl text-nidra-indigo/70 max-w-2xl mx-auto mb-10 px-4"
        >
          {heroData.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={heroData.button_link || '#'}
            className="luxury-button w-full sm:w-auto text-center inline-block"
          >
            {heroData.button_text}
          </Link>
          {heroData.secondary_button_text && heroData.secondary_button_link && (
            <Link
              href={heroData.secondary_button_link || '#'}
              className="bg-transparent border-2 border-prakash-gold text-nidra-indigo hover:bg-prakash-gold/10 px-8 py-4 rounded-full w-full sm:w-auto text-center inline-block transition-colors"
            >
              {heroData.secondary_button_text}
            </Link>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="scroll-indicator">
          <span className="block w-6 h-10 border-2 border-prakash-gold rounded-full mx-auto">
            <span className="block w-1 h-3 bg-prakash-gold rounded-full mx-auto mt-2 animate-bounce" />
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
export default CosmicHero;
