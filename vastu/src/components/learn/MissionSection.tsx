'use client';
import { motion } from 'framer-motion';

export function MissionSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F9F6F0] to-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl text-[#1A2A3A] mb-6">Our Sacred Mission</h2>
            <p className="font-sans text-lg text-[#1A2A3A]/70 mb-6 leading-relaxed">
              To preserve, teach, and propagate the authentic wisdom of Vastu Shastra 
              as documented in the ancient Vedic texts, and to make it accessible and 
              applicable for modern living.
            </p>
            <div className="space-y-4">
              {['Authentic Lineage', 'Practical Application', 'Global Community'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#C88A5D]" />
                  <span className="font-sans text-[#1A2A3A]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#C88A5D]/20 to-[#E8B960]/20 flex items-center justify-center">
              <span className="text-8xl">🕉️</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
