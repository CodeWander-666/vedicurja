'use client';
import { motion } from 'framer-motion';

interface LineageSectionProps {
  title?: string;
  subtitle?: string;
}

export function LineageSection({ title = "Rooted in Sacred Lineage", subtitle = "Over four decades of preserving authentic Vastu tradition" }: LineageSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F9F6F0] to-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-4xl text-[#1A2A3A] mb-4">
          {title}
        </motion.h2>
        <p className="text-[#1A2A3A]/60">{subtitle}</p>
      </div>
    </section>
  );
}
export default LineageSection;
