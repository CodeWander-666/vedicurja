'use client';
export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <circle key={i} cx={`${10 + (i * 7) % 90}%`} cy={`${20 + (i * 13) % 80}%`} r="2" fill="#E8B960" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${2 + i % 3}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </svg>
    </div>
  );
}
