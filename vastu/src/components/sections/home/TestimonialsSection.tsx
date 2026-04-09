'use client';
import { motion } from 'framer-motion';

const testimonials = [
  { quote: "Acharya's guidance transformed our home and our lives.", author: "Priya M., London" },
  { quote: "The precision of his Vastu analysis is unparalleled.", author: "James W., New York" },
  { quote: "I finally feel at peace in my own space.", author: "Ananya S., Dubai" },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#F9F6F0]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-16"
        >
          Words of Gratitude
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm relative"
            >
              <svg className="w-8 h-8 text-[#C88A5D]/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10,11L12,8L14,11H10z M6,13L8,10L10,13H6z M18,13L20,10L22,13H18z" />
              </svg>
              <p className="font-serif text-xl text-[#1A2A3A] italic mb-4">"{t.quote}"</p>
              <p className="font-sans text-[#C88A5D]">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
