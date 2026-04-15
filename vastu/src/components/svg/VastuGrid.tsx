'use client';
export default function VastuGrid() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
      <svg width="500" height="500" viewBox="0 0 500 500">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8B960" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="500" fill="url(#grid)"/>
        <rect x="80" y="80" width="340" height="340" fill="none" stroke="#C88A5D" strokeWidth="2"/>
        <line x1="80" y1="80" x2="420" y2="420" stroke="#C88A5D" strokeWidth="1" opacity="0.5"/>
        <line x1="420" y1="80" x2="80" y2="420" stroke="#C88A5D" strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  );
}
