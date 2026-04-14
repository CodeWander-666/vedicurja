'use client';
import { motion } from 'framer-motion';

export default function LuxuryAnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-vastu-parchment dark:bg-obsidian-black" />
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, #FF993340 0%, transparent 60%)',
            'radial-gradient(circle at 80% 70%, #C1000040 0%, transparent 60%)',
            'radial-gradient(circle at 40% 60%, #E8B96040 0%, transparent 60%)',
            'radial-gradient(circle at 20% 30%, #FF993340 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
