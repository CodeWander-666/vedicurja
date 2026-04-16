'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';

interface LuxuryHeroButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export default function LuxuryHeroButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: LuxuryHeroButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseEnter = () => play('hoverCard');
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const handleClick = () => { play('clickPrimary'); if (onClick) onClick(); };

  const baseClasses = "relative inline-block px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-medium rounded-full overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl";
  const primaryClasses = "bg-gradient-to-r from-sacred-saffron via-kumkuma-red to-prakash-gold text-white";
  const secondaryClasses = "bg-transparent border-2 border-prakash-gold text-nidra-indigo hover:bg-prakash-gold/10";

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="inline-block"
    >
      <Link href={href} className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
          {variant === 'primary' && (
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </Link>
    </motion.div>
  );
}
