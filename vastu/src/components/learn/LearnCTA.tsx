'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function LearnCTA() {
  return (
    <section className="py-32 bg-[#1A2A3A] text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="font-serif text-4xl md:text-5xl mb-6"
        >
          Begin Your Vastu Journey
        </motion.h2>
        <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Enroll in our comprehensive courses and transform your understanding of space and energy.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#E8B960] hover:bg-[#C88A5D] text-[#1A2A3A] font-sans px-10 py-4 rounded-full text-lg font-medium transition-all"
        >
          Start Learning
        </Link>
      </div>
    </section>
  );
}

export default LearnCTA;
