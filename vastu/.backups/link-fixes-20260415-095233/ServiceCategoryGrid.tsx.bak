'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

const categories = [
  { title: 'Residential Vastu', description: 'Homes, Apartments, Villas', icon: '🏠' },
  { title: 'Commercial Vastu', description: 'Offices, Retail, Hotels', icon: '🏢' },
  { title: 'Industrial Vastu', description: 'Factories, Warehouses', icon: '🏭' },
  { title: 'Land Selection', description: 'Plot Analysis & Muhurta', icon: '🌍' },
  { title: 'Spiritual Spaces', description: 'Temples, Meditation Halls', icon: '🕉️' },
  { title: 'Geopathic Stress', description: 'EMF & Energy Correction', icon: '📡' },
  { title: 'Nadi Jyotish', description: 'Name & Vibration Alignment', icon: '🔮' },
  { title: 'Training & Education', description: 'Become a Consultant', icon: '📚' },
];

export default function ServiceCategoryGrid() {
  const { play } = useSound();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-4">Complete Vastu Solutions</motion.h2>
        <p className="text-center text-[#1A2A3A]/60 max-w-2xl mx-auto mb-16">Every niche, every scale—our expertise covers the entire spectrum of Vedic architecture</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }} className="bg-[#F9F6F0] p-8 rounded-2xl border border-[#C88A5D]/10 hover:border-[#C88A5D]/30 cursor-pointer" onMouseEnter={() => play('hoverCard')}>
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-serif text-xl text-[#1A2A3A] mb-2">{cat.title}</h3>
              <p className="text-sm text-[#C88A5D]">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
