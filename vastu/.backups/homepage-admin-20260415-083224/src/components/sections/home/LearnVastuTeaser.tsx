'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Bookshelf3D } from '@/components/learn/Bookshelf3D';

export function LearnVastuTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section ref={ref} style={{ y }} className="py-24 md:py-32 bg-vastu-stone/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo mb-4">Master the Sacred Sciences</h2>
          <p className="text-nidra-indigo/60 max-w-2xl mx-auto">Explore our library of ancient Vastu and numerology texts – interactive 3D bookshelf</p>
        </div>
        <Bookshelf3D />
        <div className="flex justify-center gap-6 mt-12">
          <Link href="/learn-vastu" className="luxury-button">Browse All Courses</Link>
          <Link href="/dashboard/library" className="border-2 border-prakash-gold text-nidra-indigo px-8 py-4 rounded-full font-medium">My Library</Link>
        </div>
      </div>
    </motion.section>
  );
}
export default LearnVastuTeaser;
