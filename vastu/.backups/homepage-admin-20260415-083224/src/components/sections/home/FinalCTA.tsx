'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export function FinalCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section ref={ref} className="relative py-40 overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 bg-gradient-to-br from-sacred-saffron via-kumkuma-red to-prakash-gold opacity-90" />
      <div className="absolute inset-0 bg-[url('/images/home/vastu-pattern.png')] opacity-10" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ scale }}>
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">Begin Your Transformation</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">Unlock the hidden potential of your space. Consult with Acharya today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg shadow-xl hover:shadow-2xl transition">Create Free Account</Link>
            <Link href="/contact" className="border-2 border-white text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/10">Contact Acharya</Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default FinalCTA;
