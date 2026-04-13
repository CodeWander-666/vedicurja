'use client'; import { useEffect, useState } from 'react'; import { motion, useMotionValue, useSpring } from 'framer-motion';
export function LuxuryCursor() { const [isClient, setIsClient] = useState(false); const x = useMotionValue(0); const y = useMotionValue(0); const springX = useSpring(x, { stiffness: 100, damping: 20 }); const springY = useSpring(y, { stiffness: 100, damping: 20 });
  useEffect(() => { setIsClient(true); const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); }; window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move); }, [x, y]);
  if (!isClient) return null; return (<motion.div className="fixed w-8 h-8 pointer-events-none z-[9999] mix-blend-difference" style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }}><div className="w-full h-full border-2 border-[#E8B960] rounded-full animate-pulse" /></motion.div>);
}
export default LuxuryCursor;
