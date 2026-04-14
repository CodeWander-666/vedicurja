'use client';
import React from 'react';

interface Planet {
  name: string;
  sign: string;
  house: number;
}

interface KundaliChartSVGProps {
  planets: Planet[];
  ascendant: string;
}

// Complete 12‑house positions for North Indian style chart
const housePositions = [
  { x: 200, y: 100 },  // House 1 (top center)
  { x: 280, y: 100 },  // House 2
  { x: 330, y: 180 },  // House 3
  { x: 330, y: 260 },  // House 4
  { x: 280, y: 330 },  // House 5
  { x: 200, y: 330 },  // House 6
  { x: 120, y: 260 },  // House 7
  { x: 120, y: 180 },  // House 8
  { x: 200, y: 200 },  // House 9 (center – unused in North Indian style)
  { x: 200, y: 200 },  // House 10
  { x: 200, y: 200 },  // House 11
  { x: 200, y: 200 },  // House 12
];

const planetColors: Record<string, string> = {
  Sun: '#FFA500',
  Moon: '#C0C0C0',
  Mars: '#FF4500',
  Mercury: '#32CD32',
  Jupiter: '#FFD700',
  Venus: '#FF69B4',
  Saturn: '#8B4513',
  Rahu: '#4B0082',
  Ketu: '#800000'
};

export default function KundaliChartSVG({ planets, ascendant }: KundaliChartSVGProps) {
  const houses = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Group planets by house
  const planetsByHouse: Record<number, Planet[]> = {};
  planets.forEach(p => {
    const house = p.house;
    if (!planetsByHouse[house]) planetsByHouse[house] = [];
    planetsByHouse[house].push(p);
  });

  return (
    <div className="flex justify-center p-4">
      <svg width="480" height="480" viewBox="0 0 480 480" className="max-w-full">
        {/* Outer square */}
        <rect x="80" y="80" width="320" height="320" fill="none" stroke="#C88A5D" strokeWidth="2.5" />
        
        {/* Diagonal lines */}
        <line x1="80" y1="80" x2="400" y2="400" stroke="#C88A5D" strokeWidth="1.5" opacity="0.4" />
        <line x1="400" y1="80" x2="80" y2="400" stroke="#C88A5D" strokeWidth="1.5" opacity="0.4" />
        
        {/* Cross lines */}
        <line x1="240" y1="80" x2="240" y2="400" stroke="#C88A5D" strokeWidth="1.5" opacity="0.4" />
        <line x1="80" y1="240" x2="400" y2="240" stroke="#C88A5D" strokeWidth="1.5" opacity="0.4" />

        {/* House numbers */}
        {houses.slice(0, 8).map((h, idx) => (
          <text
            key={h}
            x={housePositions[idx].x}
            y={housePositions[idx].y - 12}
            textAnchor="middle"
            fontSize="14"
            fill="#1A2A3A"
            opacity="0.6"
            fontWeight="500"
          >
            {h}
          </text>
        ))}

        {/* Planets in houses */}
        {Object.entries(planetsByHouse).map(([house, housePlanets]) => {
          const houseNum = parseInt(house);
          // Only render houses 1‑8 (North Indian chart style)
          if (houseNum > 8) return null;
          
          const pos = housePositions[houseNum - 1];
          return housePlanets.map((planet, i) => (
            <text
              key={planet.name}
              x={pos.x + (i * 12)}
              y={pos.y + 8}
              textAnchor="middle"
              fontSize="13"
              fill={planetColors[planet.name] || '#1A2A3A'}
              fontWeight="bold"
              className="drop-shadow-sm"
            >
              {planet.name.substring(0, 2)}
            </text>
          ));
        })}

        {/* Ascendant marker (center) */}
        <text
          x="240"
          y="235"
          textAnchor="middle"
          fontSize="16"
          fill="#C88A5D"
          fontWeight="bold"
          className="tracking-wide"
        >
          {ascendant.substring(0, 3)}
        </text>
        
        {/* Decorative center circle */}
        <circle cx="240" cy="240" r="25" fill="none" stroke="#C88A5D" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}
