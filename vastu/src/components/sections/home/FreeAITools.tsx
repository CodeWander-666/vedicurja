'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FreeToolCard3D } from '@/components/sections/tools/FreeToolCard3D';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

interface FreeTool {
  id: string;
  tool_key: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon?: string;
  color?: string;
  href?: string;
  is_published: boolean;
  order_index: number;
}

const fallbackTools: FreeTool[] = [
  { id: '1', tool_key: 'kundali', title: 'AI Kundali', tagline: 'Your Cosmic Blueprint', description: 'Vedic birth chart with nakshatra and planetary positions', features: [], icon: '🔮', color: '#FF9933', href: '/free-tools/kundali', is_published: true, order_index: 1 },
  { id: '2', tool_key: 'vastu_scan', title: 'AI Vastu Scan', tagline: 'Optimize Your Space', description: '16‑zone energy analysis with personalized remedies', features: [], icon: '🏠', color: '#C10000', href: '/free-tools/vastu-scan', is_published: true, order_index: 2 },
  { id: '3', tool_key: 'name_suggestion', title: 'Name Suggestion', tagline: 'Auspicious Names', description: 'Auspicious syllables based on 27 Nakshatras', features: [], icon: '✨', color: '#E8B960', href: '/free-tools/name-suggestion', is_published: true, order_index: 3 },
];

export function FreeAITools() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const { items } = useRealtimeContent<FreeTool>('free_tools', 'order_index');
  const tools = items.length > 0 ? items.filter(t => t.is_published) : fallbackTools;

  return (
    <motion.section ref={ref} style={{ opacity, y }} className="py-24 md:py-32 bg-gradient-to-b from-vastu-parchment to-white">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-center font-serif text-4xl md:text-5xl text-nidra-indigo mb-4">Begin Your Journey Free</motion.h2>
        <p className="text-center text-nidra-indigo/60 max-w-2xl mx-auto mb-16">Experience the power of Vedic AI – no signup required</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto place-items-center">
          {tools.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="w-full flex flex-col items-center">
              <FreeToolCard3D name={tool.title} description={tool.description} icon={tool.icon || '🔮'} href={tool.href || `/free-tools/${tool.tool_key}`} color={tool.color || '#FF9933'} />
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm font-medium text-nidra-indigo/70">★ 4.9</span>
                <span className="text-sm text-nidra-indigo/50">•</span>
                <span className="text-sm text-nidra-indigo/70">2.5k+ reports</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
export default FreeAITools;
