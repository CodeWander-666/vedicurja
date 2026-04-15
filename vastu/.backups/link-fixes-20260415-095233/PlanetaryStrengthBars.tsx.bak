'use client';
import { motion } from 'framer-motion';
import type { Planet } from '@/types/tools';

const getStrength = (planet: Planet): number => {
  const base = 60;
  const variance = Math.sin(planet.name.length * planet.house) * 25;
  return Math.min(98, Math.max(35, Math.round(base + variance)));
};

export default function PlanetaryStrengthBars({ planets }: { planets: Planet[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {planets.map((planet) => {
        const strength = getStrength(planet);
        return (
          <motion.div
            key={planet.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-prakash-gold/20"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{ rotateY: 3, scale: 1.01 }}
          >
            <span className="w-16 font-medium text-nidra-indigo">{planet.name}</span>
            <div className="flex-1 h-8 bg-vastu-stone rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strength}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #C88A5D, #E8B960)`, boxShadow: '0 0 10px #E8B960', transform: 'translateZ(5px)' }}
              />
            </div>
            <span className="w-12 text-right font-medium text-nidra-indigo">{strength}%</span>
          </motion.div>
        );
      })}
    </div>
  );
}
