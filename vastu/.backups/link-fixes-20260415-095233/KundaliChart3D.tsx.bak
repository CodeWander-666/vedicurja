'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { KundaliChart } from '@/types/tools';

const housePositions = [
  { x: 200, y: 100 }, { x: 280, y: 100 }, { x: 330, y: 180 }, { x: 330, y: 260 },
  { x: 280, y: 330 }, { x: 200, y: 330 }, { x: 120, y: 260 }, { x: 120, y: 180 },
];

const planetColors: Record<string, string> = {
  Sun: '#FFA500', Moon: '#C0C0C0', Mars: '#FF4500', Mercury: '#32CD32',
  Jupiter: '#FFD700', Venus: '#FF69B4', Saturn: '#8B4513', Rahu: '#4B0082', Ketu: '#800000'
};

export default function KundaliChart3D({ chart }: { chart: KundaliChart }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planetsByHouse: Record<number, typeof chart.planets> = {};
  chart.planets.forEach(p => {
    const house = p.house;
    if (house >= 1 && house <= 8) {
      if (!planetsByHouse[house]) planetsByHouse[house] = [];
      planetsByHouse[house].push(p);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, rotateX: -5, rotateY: -5 }}
      animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: 2, rotateY: 2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="perspective-1000 flex justify-center"
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-prakash-gold/30" style={{ transformStyle: 'preserve-3d' }}>
        <svg width="480" height="480" viewBox="0 0 480 480" className="drop-shadow-2xl">
          <rect x="80" y="80" width="320" height="320" fill="none" stroke="#C88A5D" strokeWidth="2.5" />
          <line x1="80" y1="80" x2="400" y2="400" stroke="#C88A5D" strokeWidth="1" opacity="0.4" />
          <line x1="400" y1="80" x2="80" y2="400" stroke="#C88A5D" strokeWidth="1" opacity="0.4" />
          <line x1="240" y1="80" x2="240" y2="400" stroke="#C88A5D" strokeWidth="1" opacity="0.4" />
          <line x1="80" y1="240" x2="400" y2="240" stroke="#C88A5D" strokeWidth="1" opacity="0.4" />
          {housePositions.map((pos, i) => (
            <text key={i+1} x={pos.x} y={pos.y-12} textAnchor="middle" fontSize="14" fill="#1A2A3A" opacity="0.6">{i+1}</text>
          ))}
          {Object.entries(planetsByHouse).map(([house, planets]) => {
            const pos = housePositions[parseInt(house)-1];
            return planets.map((planet, idx) => (
              <text key={planet.name} x={pos.x + (idx * 12)} y={pos.y + 8} textAnchor="middle" fontSize="13" fill={planetColors[planet.name] || '#1A2A3A'} fontWeight="bold">
                {planet.name.substring(0,2)}
              </text>
            ));
          })}
          <text x="240" y="235" textAnchor="middle" fontSize="16" fill="#C88A5D" fontWeight="bold">{chart.ascendant.substring(0,3)}</text>
          <circle cx="240" cy="240" r="25" fill="none" stroke="#C88A5D" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
    </motion.div>
  );
}
