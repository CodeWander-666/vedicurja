'use client';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

// Placeholder animation data – replace with actual Vastu logo JSON
const logoAnimation = {
  v: "5.7.0",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Vastu Logo",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Vastu Mark",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [60, 60] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 }
            },
            {
              ty: "st",
              c: { a: 0, k: [0.784, 0.541, 0.365, 1] },
              w: { a: 0, k: 4 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

export function AnimatedLogo({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className={className} />;
  
  return (
    <Lottie
      animationData={logoAnimation}
      loop={true}
      autoplay={true}
      className={className}
    />
  );
}
