'use client';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((cat, i) => (
        <motion.button
          key={cat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(cat)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat
              ? 'bg-gradient-to-r from-prakash-gold to-sacred-saffron text-white shadow-md'
              : 'bg-white/50 backdrop-blur-sm border border-prakash-gold/30 text-nidra-indigo hover:bg-prakash-gold/10'
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
