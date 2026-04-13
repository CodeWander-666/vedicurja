'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface LuxuryToolCardProps { title: string; icon: string; children: React.ReactNode; }
export default function LuxuryToolCard({ title, icon, children }: LuxuryToolCardProps) {
  const { play } = useSound();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-[#C88A5D]/30" onMouseEnter={() => play('hoverCard')}>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{icon}</span>
        <h2 className="font-serif text-3xl text-[#1A2A3A]">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
