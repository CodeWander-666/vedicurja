'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TestimonialsSlider } from './TestimonialsSlider';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { Testimonial } from '@/types/admin';

export function WordsOfGratitude() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const { items } = useRealtimeContent<Testimonial>('testimonials', 'order_index');
  const publishedTestimonials = items.filter(t => t.is_published);

  return (
    <motion.section ref={ref} style={{ opacity }} className="py-24 bg-gradient-to-b from-[#F9F6F0] to-white overflow-hidden">
      <TestimonialsSlider testimonials={publishedTestimonials.length > 0 ? publishedTestimonials : undefined} />
    </motion.section>
  );
}
export default WordsOfGratitude;
