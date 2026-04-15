'use client';
import { motion } from 'framer-motion';
import { Testimonial } from '@/types/admin';

export default function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -8, rotateY: 3 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-prakash-gold/30 shadow-lg flex flex-col h-full"
    >
      <div className="flex items-center gap-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
        ))}
        {testimonial.verified && <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>}
      </div>
      <p className="text-nidra-indigo/80 italic mb-4 flex-1">"{testimonial.content}"</p>
      <div className="border-t border-prakash-gold/20 pt-4">
        <p className="font-serif font-bold text-nidra-indigo">{testimonial.client_name}</p>
        <p className="text-sm text-nidra-indigo/60">{testimonial.location}</p>
      </div>
    </motion.div>
  );
}
