'use client';

export function GradientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #F9F6F0 0%, #f5efe6 50%, #ede5d6 100%)',
        pointerEvents: 'none',
      }}
    />
  );
}

export default GradientBackground;
