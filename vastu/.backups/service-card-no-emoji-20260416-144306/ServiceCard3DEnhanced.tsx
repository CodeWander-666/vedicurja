'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';

interface ServiceCard3DEnhancedProps {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  href: string;
  colorGradient: string;
  imagePlaceholder: string;
}

export default function ServiceCard3DEnhanced({
  title,
  description,
  icon,
  benefits,
  href,
  colorGradient,
  imagePlaceholder,
}: ServiceCard3DEnhancedProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { play, playSpatial } = useSound();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseEnter = () => { play('hoverCard'); };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative w-full max-w-sm h-[480px] perspective-1000 group"
    >
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-15px_rgba(200,138,93,0.5)]"
        style={{ background: colorGradient }}
      >
        {/* Image Background Layer */}
        <div className="absolute inset-0">
          <img 
            src={imagePlaceholder} 
            alt={title}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
          />
        </div>
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] rounded-3xl" />
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="text-5xl mb-4 drop-shadow-lg">{icon}</div>
          <h3 className="font-serif text-2xl text-nidra-indigo mb-2">{title}</h3>
          <p className="text-sm text-nidra-indigo/70 mb-4">{description}</p>
          
          {/* Benefits */}
          <div className="space-y-2 mb-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-prakash-gold" />
                <span className="text-xs text-nidra-indigo/80">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Link
            href={href}
            className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-nidra-indigo font-medium border border-prakash-gold/30 hover:bg-prakash-gold hover:text-white transition-all group/link"
            onClick={() => play('clickPrimary')}
          >
            Learn More
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {/* Floating rings */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-prakash-gold/20 animate-spin-slow" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full border border-sacred-saffron/20 animate-reverse-spin" />
      </div>
    </motion.div>
  );
}
