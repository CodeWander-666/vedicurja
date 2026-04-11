'use client';
import { motion } from 'framer-motion';

const modules = [
  { title: 'Foundations of Vastu', lessons: 8, duration: '4 weeks' },
  { title: 'The Five Elements', lessons: 12, duration: '6 weeks' },
  { title: 'Directional Energies', lessons: 10, duration: '5 weeks' },
  { title: 'Sacred Geometry', lessons: 6, duration: '3 weeks' },
];

export function CurriculumSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-serif text-4xl text-center text-[#1A2A3A] mb-4"
        >
          Curriculum Overview
        </motion.h2>
        <p className="text-center font-sans text-[#1A2A3A]/60 mb-16">
          A structured path to mastering Vastu Shastra
        </p>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F9F6F0] p-6 rounded-2xl border border-[#C88A5D]/10"
            >
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-serif text-xl text-[#1A2A3A] mb-2">{mod.title}</h3>
              <p className="text-sm text-[#C88A5D]">{mod.lessons} lessons • {mod.duration}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CurriculumSection;
