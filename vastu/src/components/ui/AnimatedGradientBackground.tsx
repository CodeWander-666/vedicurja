'use client';
import { motion } from 'framer-motion';

export function AnimatedGradientBackground() {
  return (
    <div className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-vastu-parchment dark:bg-dark-bg" />
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, #FF993320 0%, transparent 60%)',
            'radial-gradient(circle at 80% 70%, #C1000020 0%, transparent 60%)',
            'radial-gradient(circle at 40% 60%, #E8B96020 0%, transparent 60%)',
            'radial-gradient(circle at 20% 30%, #FF993320 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
