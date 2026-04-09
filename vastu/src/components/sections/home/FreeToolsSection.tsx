'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const tools = [
  { name: 'AI Kundali', desc: 'Discover your cosmic blueprint.', icon: '🔮' },
  { name: 'Vastu Scan', desc: 'Analyze your space instantly.', icon: '🏠' },
  { name: 'Name Suggestion', desc: 'Find your auspicious name.', icon: '✨' },
];

export function FreeToolsSection() {
  return (
    <section className="py-24 container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-8"
      >
        Begin Your Journey Free
      </motion.h2>
      <p className="text-center font-sans text-lg text-[#1A2A3A]/70 mb-16 max-w-2xl mx-auto">
        Experience the power of ancient wisdom with our complimentary tools.
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-[#C88A5D]/10 hover:border-[#C88A5D]/30 transition-all text-center"
          >
            <div className="text-5xl mb-4">{tool.icon}</div>
            <h3 className="font-serif text-2xl text-[#1A2A3A] mb-3">{tool.name}</h3>
            <p className="font-sans text-[#1A2A3A]/60 mb-6">{tool.desc}</p>
            <Link href={`/free-tools/${tool.name.toLowerCase().replace(' ', '-')}`} className="text-[#C88A5D] font-sans text-sm font-medium hover:underline">
              Try Now →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
