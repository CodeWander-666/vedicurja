'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

interface HomeSection {
  section_key: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  is_published: boolean;
}

const fallbackData: HomeSection = {
  section_key: 'final_cta',
  title: 'Begin Your Transformation Today',
  subtitle: 'Book a private consultation with Acharya KK Nagaich ji.',
  button_text: 'Schedule Now',
  button_link: '/contact',
  secondary_button_text: 'Try Free AI Tools',
  secondary_button_link: '/free-tools',
  is_published: true,
};

export function FinalCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const data = items.find(item => item.section_key === 'final_cta') || fallbackData;

  if (!data.is_published) return null;

  return (
    <motion.section ref={ref} style={{ scale }} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-nidra-indigo via-nidra-indigo/90 to-sacred-saffron/80" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6">{data.title}</h2>
        {data.subtitle && <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">{data.subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={data.button_link || '#'} className="bg-white text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg shadow-xl hover:shadow-2xl transition">
            {data.button_text}
          </Link>
          {data.secondary_button_text && data.secondary_button_link && (
            <Link href={data.secondary_button_link || '#'} className="border-2 border-white text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/10 transition">
              {data.secondary_button_text}
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
}
export default FinalCTA;
