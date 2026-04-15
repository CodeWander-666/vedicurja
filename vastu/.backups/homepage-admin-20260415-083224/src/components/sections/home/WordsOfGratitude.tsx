'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TestimonialsSlider } from './TestimonialsSlider';

export function WordsOfGratitude() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section ref={ref} style={{ opacity }} className="py-24 bg-gradient-to-b from-[#F9F6F0] to-white overflow-hidden">
      <TestimonialsSlider />
    </motion.section>
  );
}
export default WordsOfGratitude;
