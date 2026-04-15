'use client';
export default function Mandala3D() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg width="600" height="600" viewBox="0 0 600 600" className="w-full h-full max-w-2xl animate-spin-slow">
        <defs>
          <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#E8B960" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#C10000" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="250" fill="none" stroke="url(#mandalaGrad)" strokeWidth="2"/>
        <circle cx="300" cy="300" r="200" fill="none" stroke="#E8B960" strokeWidth="1.5" strokeDasharray="8 8"/>
        <circle cx="300" cy="300" r="150" fill="none" stroke="#FF9933" strokeWidth="2"/>
        <circle cx="300" cy="300" r="100" fill="none" stroke="#C10000" strokeWidth="1"/>
        <g transform="translate(300,300)">
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="0" y1="0" x2="0" y2="-250" stroke="#E8B960" strokeWidth="1" opacity="0.3"
              transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle cx="300" cy="300" r="30" fill="#E8B960" opacity="0.6"/>
        <circle cx="300" cy="300" r="15" fill="#FF9933"/>
        <text x="300" y="310" textAnchor="middle" fill="#1A2A3A" fontSize="20" fontWeight="bold">ॐ</text>
      </svg>
    </div>
  );
}
