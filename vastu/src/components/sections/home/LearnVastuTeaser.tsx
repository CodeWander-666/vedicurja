'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

interface HomeSection {
  section_key: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  is_published: boolean;
}

const fallbackData: HomeSection = {
  section_key: 'learn_vastu',
  title: 'Master the Sacred Science of Vastu',
  description: 'Online courses taught by Acharya KK Nagaich ji. Live & self‑paced.',
  button_text: 'Browse Courses',
  button_link: '/learn-vastu',
  is_published: true,
};

export function LearnVastuTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const data = items.find(item => item.section_key === 'learn_vastu') || fallbackData;

  if (!data.is_published) return null;

  return (
    <motion.section ref={ref} style={{ y }} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-nidra-indigo mb-4">{data.title}</h2>
        <p className="text-nidra-indigo/60 max-w-2xl mx-auto mb-8">{data.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={data.button_link || '#'} className="luxury-button">{data.button_text}</Link>
          <Link href="/bookings" className="border-2 border-prakash-gold text-nidra-indigo px-8 py-4 rounded-full font-medium">Book Consultation</Link>
        </div>
      </div>
    </motion.section>
  );
}
export default LearnVastuTeaser;
