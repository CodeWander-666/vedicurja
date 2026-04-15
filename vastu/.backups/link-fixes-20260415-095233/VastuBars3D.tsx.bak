'use client';
import { motion } from 'framer-motion';

interface VastuZone { name: string; element: string; score: number; recommendation?: string; }

export default function VastuBars3D({ zones }: { zones: VastuZone[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {zones.map((zone, i) => {
        const scoreColor = zone.score >= 70 ? '#10b981' : zone.score >= 50 ? '#eab308' : '#ef4444';
        return (
          <motion.div
            key={zone.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-prakash-gold/20"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{ rotateY: 3, scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-nidra-indigo">{zone.name}</span>
              <span className="text-xs text-nidra-indigo/60">{zone.element}</span>
            </div>
            <div className="h-8 bg-vastu-stone rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${zone.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}dd)`, boxShadow: `0 0 15px ${scoreColor}`, transform: 'translateZ(5px)' }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm font-medium" style={{ color: scoreColor }}>{zone.score}%</span>
              {zone.recommendation && <span className="text-xs text-nidra-indigo/60 truncate ml-2">{zone.recommendation}</span>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
