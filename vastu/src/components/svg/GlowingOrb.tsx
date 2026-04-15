'use client';
export default function GlowingOrb({ color = '#E8B960' }: { color?: string }) {
  return (
    <div className="absolute pointer-events-none animate-pulse">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <radialGradient id="orbGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#orbGrad)"/>
      </svg>
    </div>
  );
}
