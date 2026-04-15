'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FreeToolCard3D } from '@/components/sections/tools/FreeToolCard3D';

const tools = [
  {
    name: 'AI Kundali',
    description: 'Vedic birth chart with nakshatra and planetary positions',
    icon: '🔮',
    href: '/free-tools/kundali',
    color: '#FF9933',
  },
  {
    name: 'AI Vastu Scan',
    description: '16‑zone energy analysis with personalized remedies',
    icon: '🏠',
    href: '/free-tools/vastu-scan',
    color: '#C10000',
  },
  {
    name: 'Name Suggestion',
    description: 'Auspicious syllables based on 27 Nakshatras',
    icon: '✨',
    href: '/free-tools/name-suggestion',
    color: '#E8B960',
  },
];

export function FreeAITools() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="py-24 md:py-32 bg-gradient-to-b from-vastu-parchment to-white"
    >
      <div className="container mx-auto px-6">
        <motion.h2 className="text-center font-serif text-4xl md:text-5xl text-nidra-indigo mb-4">
          Begin Your Journey Free
        </motion.h2>
        <p className="text-center text-nidra-indigo/60 max-w-2xl mx-auto mb-16">
          Experience the power of Vedic AI – no signup required
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto place-items-center">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full flex justify-center"
            >
              <FreeToolCard3D {...tool} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
export default FreeAITools;
