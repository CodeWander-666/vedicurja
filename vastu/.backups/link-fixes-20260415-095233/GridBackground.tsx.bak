'use client';
import { useEffect, useRef, useState } from 'react';

const styles = `
  @keyframes softPulse {
    0% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.4; transform: scale(1); }
  }
  .block-inner-glow {
    animation: softPulse 2s ease-in-out infinite;
  }
`;

function Block({ index }: { index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full"
      style={{ pointerEvents: 'auto' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-full rounded-xl transition-all duration-300 ease-out relative overflow-hidden"
        style={{
          transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
          background: isHovered
            ? `radial-gradient(circle at ${30 + (index % 3) * 20}% ${40 + (index % 4) * 15}%, rgba(232,185,96,0.4) 0%, rgba(200,138,93,0.15) 60%, rgba(249,246,240,0.05) 100%)`
            : 'linear-gradient(135deg, rgba(200,138,93,0.06) 0%, rgba(232,185,96,0.03) 50%, rgba(249,246,240,0.02) 100%)',
          boxShadow: isHovered
            ? '0 20px 30px -10px rgba(200,138,93,0.3), inset 0 0 0 2px rgba(232,185,96,0.5)'
            : 'inset 0 0 0 1px rgba(200,138,93,0.08)',
          border: isHovered ? '1px solid rgba(232,185,96,0.3)' : '1px solid transparent',
          zIndex: isHovered ? 20 : 1,
        }}
      >
        <div
          className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${isHovered ? 'block-inner-glow' : ''}`}
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${40 + (index % 5) * 12}% ${50 + (index % 3) * 10}%, rgba(232,185,96,0.8) 0%, transparent 70%)`,
          }}
        />
        {/* TEMPORARY DEBUG OUTLINE – confirms hover is working */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ outline: '4px solid red', outlineOffset: '-2px', zIndex: 30 }}
          />
        )}
      </div>
    </div>
  );
}

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ cols: 12, rows: 8 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const blockSize = Math.max(100, Math.min(140, width / 12));
      const cols = Math.ceil(width / blockSize);
      const rows = Math.ceil(height / blockSize);
      setDimensions({ cols, rows });
    };
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  if (!mounted) return null;

  const { cols, rows } = dimensions;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        ref={containerRef}
        className="fixed inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '0px',
          background: '#F9F6F0',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <Block key={index} index={index} />
        ))}
      </div>
    </>
  );
}

export default GridBackground;
