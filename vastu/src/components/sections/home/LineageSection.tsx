'use client';
import { motion } from 'framer-motion';

export function LineageSection() {
  return (
    <section className="py-24 bg-[#1A2A3A]/5">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-16"
        >
          Rooted in Sacred Lineage
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* SVG Timeline */}
            <svg viewBox="0 0 800 100" className="w-full h-20" preserveAspectRatio="xMidYMid meet">
              <motion.line
                x1="50" y1="50" x2="750" y2="50"
                stroke="#C88A5D"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                viewport={{ once: true }}
              />
              {[100, 250, 400, 550, 700].map((cx, i) => (
                <motion.circle
                  key={cx}
                  cx={cx} cy="50" r="6"
                  fill="#E8B960"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                />
              ))}
            </svg>
            <div className="grid grid-cols-5 text-center mt-4">
              {['Guru Parampara', 'Mayamatam', 'Brihat Samhita', 'Acharya Lineage', 'Present Day'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <p className="font-serif text-sm text-[#1A2A3A]/70">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
