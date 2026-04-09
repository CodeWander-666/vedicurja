'use client';
import { motion } from 'framer-motion';

export function GlobalSection() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-6">
            Global Wisdom,<br />Local Precision.
          </h2>
          <p className="font-sans text-lg text-[#1A2A3A]/70 mb-8">
            From the banks of the Ganga to the skyscrapers of Manhattan—Vastu principles adapted for every climate and culture.
          </p>
          <div className="flex flex-wrap gap-4">
            {['New York', 'London', 'Dubai', 'Singapore', 'Sydney'].map(city => (
              <span key={city} className="px-4 py-2 bg-white rounded-full text-sm font-sans text-[#C88A5D] border border-[#C88A5D]/20">
                {city}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Animated SVG world map placeholder */}
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            <motion.path
              d="M50,100 Q100,60 150,100 T250,100 T350,100"
              fill="none"
              stroke="#C88A5D"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />
            <motion.circle cx="100" cy="80" r="4" fill="#E8B960" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} />
            <motion.circle cx="200" cy="60" r="4" fill="#E8B960" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} />
            <motion.circle cx="300" cy="70" r="4" fill="#E8B960" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9 }} />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
