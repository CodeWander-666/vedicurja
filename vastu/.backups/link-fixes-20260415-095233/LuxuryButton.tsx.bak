'use client';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';

interface LuxuryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LuxuryButton({ href, children, className = '' }: LuxuryButtonProps) {
  const { play } = useSound();

  return (
    <Link
      href={href}
      onMouseEnter={() => play('hoverSlide')}
      onClick={() => play('clickSecondary')}
      className={`group relative inline-flex items-center h-12 px-6 text-base font-medium rounded-lg overflow-hidden transition-all duration-500 border border-[#C88A5D]/30 bg-[#1A2A3A] text-white hover:text-[#E8B960] underline underline-offset-2 hover:underline hover:underline-offset-4 hover:decoration-2 origin-left ${className}`}
    >
      {/* Animated glow effects */}
      <span className="absolute w-12 h-12 content-[''] right-1 top-1 z-10 bg-[#C88A5D] rounded-full blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="absolute w-20 h-20 content-[''] right-8 top-3 z-10 bg-[#E8B960] rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
      
      {/* Hover animations */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#C88A5D]/0 via-[#E8B960]/10 to-[#C88A5D]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      
      <span className="relative z-20">{children}</span>
      
      <svg
        className="relative z-20 ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}
