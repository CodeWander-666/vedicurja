'use client';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';
import { useState, useEffect } from 'react';
import './HeroButton.css';

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
}

export function HeroButton({ href, children }: HeroButtonProps) {
  const { play } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="hero-button-placeholder">
        {children}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="hero-button"
      onMouseEnter={() => play('hoverSlide')}
      onClick={() => play('clickPrimary')}
    >
      <span className="hero-button-text">{children}</span>
    </Link>
  );
}

export default HeroButton;
