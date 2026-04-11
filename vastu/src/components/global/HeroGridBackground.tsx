'use client';
import { useEffect, useRef, useState } from 'react';

const styles = `
  @keyframes borderTravel {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
  @keyframes softPop {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.01); }
  }
  .grid-block {
    position: relative;
    width: 100%;
    height: 100%;
    animation: softPop 8s ease-in-out infinite;
    animation-delay: calc(var(--delay, 0) * 0.08s);
    will-change: transform;
  }
  .grid-block::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      #E8B960,
      #C88A5D,
      #E8B960,
      transparent
    );
    background-size: 200% 100%;
    animation: borderTravel 6s linear infinite;
    animation-delay: calc(var(--delay, 0) * 0.1s);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

function Block({ delay }: { delay: number }) {
  return (
    <div
      className="grid-block"
      style={{
        '--delay': delay,
        background: 'linear-gradient(135deg, rgba(200,138,93,0.03) 0%, rgba(232,185,96,0.015) 50%, rgba(249,246,240,0.005) 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(200,138,93,0.04)',
        borderRadius: '12px',
      } as React.CSSProperties}
    />
  );
}

export function HeroGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ cols: 10, rows: 6 });

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const blockSize = Math.max(120, Math.min(160, width / 10));
      const cols = Math.ceil(width / blockSize);
      const rows = Math.ceil(height / blockSize);
      setDimensions({ cols, rows });
    };
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  const { cols, rows } = dimensions;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        ref={containerRef}
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '3px',
          background: '#F9F6F0',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <Block key={index} delay={index % 15} />
        ))}
      </div>
    </>
  );
}

export default HeroGridBackground;
