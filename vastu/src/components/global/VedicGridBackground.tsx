'use client';
import { useEffect, useRef, useState } from 'react';

const styles = `
  @keyframes softGlow {
    0%, 100% { opacity: 0.4; filter: brightness(1); }
    50% { opacity: 0.8; filter: brightness(1.2); }
  }
  @keyframes borderFlow {
    0% { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }
  @keyframes floatYantra {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-3px) scale(1.005); }
  }
  .vedic-block {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: radial-gradient(circle at 30% 30%, rgba(232,185,96,0.12), rgba(200,138,93,0.05) 70%);
    box-shadow: inset 0 0 30px rgba(232,185,96,0.1), 0 4px 8px rgba(0,0,0,0.02);
    animation: floatYantra 10s ease-in-out infinite;
    animation-delay: calc(var(--i, 0) * 0.1s);
    backdrop-filter: blur(2px);
    border: 1px solid rgba(200,138,93,0.15);
    overflow: hidden;
  }
  .vedic-block::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1.5px;
    background: linear-gradient(90deg, transparent, #E8B960, #D4A373, #E8B960, transparent);
    background-size: 300% 100%;
    animation: borderFlow 8s linear infinite;
    animation-delay: calc(var(--i, 0) * 0.15s);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .vedic-block::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(232,185,96,0.25) 0%, transparent 70%);
    border-radius: 50%;
    animation: softGlow 4s ease-in-out infinite;
    animation-delay: calc(var(--i, 0) * 0.2s);
    pointer-events: none;
    filter: blur(8px);
  }
  /* Vedic yantra pattern inside each block */
  .vedic-pattern {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.15;
    pointer-events: none;
  }
  .vedic-pattern svg {
    width: 70%;
    height: 70%;
    stroke: #C88A5D;
    stroke-width: 0.8;
    fill: none;
  }
`;

function VedicBlock({ index }: { index: number }) {
  return (
    <div
      className="vedic-block"
      style={{ '--i': index % 12 } as React.CSSProperties}
    >
      <div className="vedic-pattern">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="15" />
          <path d="M50 20 L50 80 M20 50 L80 50" />
          <path d="M28 28 L72 72 M28 72 L72 28" />
        </svg>
      </div>
    </div>
  );
}

export function VedicGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ cols: 8, rows: 5 });

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const blockSize = Math.max(140, Math.min(180, width / 8));
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
          gap: '6px',
          background: 'linear-gradient(145deg, #FDFBF9 0%, #F5EDE3 100%)',
          pointerEvents: 'none',
          zIndex: 0,
          padding: '6px',
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <VedicBlock key={index} index={index} />
        ))}
      </div>
    </>
  );
}

export default VedicGridBackground;
