'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import './GlobalPresence.css';

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
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{data.title}</h2>
            <p className="text-white/70 text-lg mb-6">{data.description}</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><span className="text-prakash-gold">✓</span> 15+ Countries Served</li>
              <li className="flex items-center gap-2"><span className="text-prakash-gold">✓</span> 500+ Satisfied Clients</li>
              <li className="flex items-center gap-2"><span className="text-prakash-gold">✓</span> 24/7 Virtual Consultations</li>
            </ul>
            <div className="mt-8">
              <Link href={data.button_link || "#"} className="bg-prakash-gold text-nidra-indigo px-8 py-4 rounded-full font-medium">{data.button_text}</Link>
            </div>
          </div>
          <motion.div style={{ rotateY }} className="globe-container">
            <div className="globe">
              <div className="globe-sphere" style={{ backgroundImage: 'url(/images/home/globe-texture.jpg)' }} />
              <div className="globe-pin pin1" />
              <div className="globe-pin pin2" />
              <div className="globe-pin pin3" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
export default GlobalPresence;
