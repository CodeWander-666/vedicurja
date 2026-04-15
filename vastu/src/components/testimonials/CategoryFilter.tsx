'use client';
import { motion } from 'framer-motion';

interface Props {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelect, searchQuery, onSearchChange }: Props) {
  return (
    <div className="space-y-6">
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
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-6 py-3 rounded-full border border-prakash-gold/30 bg-white/50 backdrop-blur-sm text-nidra-indigo placeholder:text-nidra-indigo/40 focus:outline-none focus:border-prakash-gold"
        />
      </div>
    </div>
  );
}
