'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

interface HomeSection {
  section_key: string;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link: string;
  is_published: boolean;
}

const fallbackData: HomeSection = {
  section_key: 'acharya_vow',
  title: 'Guided by Lineage, Driven by Results',
  subtitle: 'Our Sacred Vow',
  description: 'For over four decades, our family has preserved the authentic Vastu Shastra traditions of Uttar Pradesh. We blend ancient wisdom with modern precision to transform spaces and lives globally.',
  button_text: 'Discover Our Lineage',
  button_link: '/about',
  is_published: true,
};

export function AcharyaVow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const data = items.find(item => item.section_key === 'acharya_vow') || fallbackData;

  if (!data.is_published) return null;

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="py-24 md:py-32 overflow-hidden bg-vastu-stone/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div style={{ scale }} className="relative">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-prakash-gold/30">
              <Image src="/images/home/acharya-portrait.jpg" alt="Acharya" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-nidra-indigo/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-serif text-2xl">Acharya Sharma</p>
                <p className="text-sm opacity-80">4th Generation Vastu Guru</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 candle-flicker" />
          </motion.div>
          <motion.div style={{ y }}>
            <span className="text-sacred-saffron uppercase tracking-widest text-sm">{data.subtitle}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo mt-4 mb-6">{data.title}</h2>
            <p className="text-lg text-nidra-indigo/70 mb-6 leading-relaxed">{data.description}</p>
            <div className="flex gap-4">
              <Link href={data.button_link || "#" || '#'} className="luxury-button">{data.button_text}</Link>
              <Link href="/story" className="border-b-2 border-prakash-gold text-nidra-indigo font-medium">Read Our Story →</Link>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        .candle-flicker {
          background: radial-gradient(circle, #FF9933 0%, #C10000 70%, transparent 100%);
          filter: blur(15px);
          animation: flicker 2s infinite alternate;
        }
        @keyframes flicker {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </motion.section>
  );
}
export default AcharyaVow;
