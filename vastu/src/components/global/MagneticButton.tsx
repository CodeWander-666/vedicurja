'use client'; import { useRef } from 'react'; import { motion, useMotionValue, useSpring } from 'framer-motion'; import { useSound } from '@/hooks/useSound';
interface MagneticButtonProps { children: React.ReactNode; className?: string; onClick?: () => void; }
export function MagneticButton({ children, className, onClick }: MagneticButtonProps) { const ref = useRef<HTMLButtonElement>(null); const x = useMotionValue(0); const y = useMotionValue(0); const springX = useSpring(x, { stiffness: 80, damping: 22 }); const springY = useSpring(y, { stiffness: 80, damping: 22 }); const { playSpatial } = useSound();
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => { const rect = ref.current?.getBoundingClientRect(); if (rect) { x.set((e.clientX - (rect.left + rect.width/2)) * 0.2); y.set((e.clientY - (rect.top + rect.height/2)) * 0.2); } };
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => { const rect = ref.current?.getBoundingClientRect(); if (rect) playSpatial('hoverSlide', (rect.left+rect.width/2)/window.innerWidth, (rect.top+rect.height/2)/window.innerHeight); };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { const rect = ref.current?.getBoundingClientRect(); if (rect) playSpatial('clickPrimary', (rect.left+rect.width/2)/window.innerWidth, (rect.top+rect.height/2)/window.innerHeight); onClick?.(); };
  return (<motion.button ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} onMouseEnter={handleMouseEnter} onClick={handleClick} className={className}>{children}</motion.button>);
}
export default MagneticButton;
