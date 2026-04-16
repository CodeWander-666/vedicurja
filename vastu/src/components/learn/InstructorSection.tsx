'use client';
import { motion } from 'framer-motion';

export function InstructorSection() {
  return (
    <section className="py-24 bg-gradient-to-t from-[#F9F6F0] to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C88A5D] to-[#E8B960] flex items-center justify-center text-5xl">
              🧘
            </div>
            <h2 className="font-serif text-4xl text-[#1A2A3A] mb-4">Acharya KK Nagaich ji</h2>
            <p className="font-sans text-lg text-[#C88A5D] mb-6">Master Vastu Consultant</p>
            <p className="font-sans text-[#1A2A3A]/70 leading-relaxed max-w-2xl mx-auto">
              With over four decades of dedicated study and practice, Acharya KK Nagaich ji 
              carries the authentic lineage of Vastu Vidya from the sacred traditions 
              of Uttar Pradesh. His teachings bridge ancient wisdom with contemporary needs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default InstructorSection;
