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
  section_key: 'virtual_consult',
  title: 'Connect with Acharya, Virtually',
  description: 'Secure video consultation from anywhere in the world.',
  button_text: 'Book Virtual Consultation',
  button_link: '/bookings',
  is_published: true,
};

export function VirtualConsultCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const data = items.find(item => item.section_key === 'virtual_consult') || fallbackData;

  if (!data.is_published) return null;

  return (
    <motion.section ref={ref} style={{ scale }} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src="/videos/home/virtual-consult-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-nidra-indigo/70" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
        <motion.h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-6">{data.title}</motion.h2>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10">{data.description}</p>
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link href={data.button_link || '#'} className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg shadow-2xl transition-all">
            {data.button_text}
          </Link>
        </motion.div>
        <div className="mt-8 text-white/60 text-sm">4.9 ★ (200+ consultations)</div>
      </div>
    </motion.section>
  );
}
export default VirtualConsultCTA;
