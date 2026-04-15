'use client';
import { motion } from 'framer-motion';

interface Syllable { hindi: string; english: string; meaning: string; }

export default function SyllableCard3D({ syllable, index }: { syllable: Syllable; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-prakash-gold/30 transition-all duration-500" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div whileHover={{ rotateY: 8, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <div className="text-6xl mb-3 font-serif text-nidra-indigo">{syllable.hindi}</div>
          <div className="text-2xl font-medium text-sacred-saffron mb-2">{syllable.english}</div>
          <p className="text-xs text-nidra-indigo/60">{syllable.meaning}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
