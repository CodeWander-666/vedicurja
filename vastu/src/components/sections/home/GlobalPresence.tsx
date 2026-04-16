'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  section_key: 'global_presence',
  title: 'Global Wisdom, Local Precision',
  subtitle: 'From the banks of the Ganga to Manhattan skyscrapers',
  description: 'Our Vastu solutions transcend borders.',
  button_text: 'Find a Consultant',
  button_link: '/vastu-consultant',
  is_published: true,
};

export function GlobalPresence() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const data = items.find(item => item.section_key === 'global_presence') || fallbackData;

  if (!data.is_published) return null;

  return (
    <motion.section ref={ref} className="py-24 bg-nidra-indigo text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6">{data.title}</h2>
            <p className="text-white/70 text-lg mb-6">{data.description}</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2"><span className="text-prakash-gold">✓</span> 15+ Countries Served</li>
              <li className="flex items-center gap-2"><span className="text-prakash-gold">✓</span> 500+ Satisfied Clients</li>
              <li className="flex items-center gap-2"><span className="text-prakash-gold">✓</span> 4.9 ★ Average Rating</li>
            </ul>
            <Link href={data.button_link || '#'} className="bg-prakash-gold text-nidra-indigo px-8 py-4 rounded-full font-medium inline-block">
              {data.button_text}
            </Link>
          </div>
          <motion.div style={{ rotateY }} className="flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-prakash-gold/20 to-sacred-saffron/20 border-2 border-prakash-gold/50 flex items-center justify-center">
              <span className="text-6xl">🌍</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
export default GlobalPresence;
