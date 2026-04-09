'use client';
import Link from 'next/link';
import { MagneticButton } from '@/components/global/MagneticButton';
import { AnimatedLogo } from '@/components/global/AnimatedLogo';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[#F9F6F0]/80 backdrop-blur-md border-b border-[#C88A5D]/20">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogo className="w-12 h-12" />
          <span className="font-serif text-2xl text-[#1A2A3A]">Vastu<span className="text-[#C88A5D]">.</span></span>
        </Link>
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/about" className="font-sans text-[#1A2A3A]/80 hover:text-[#C88A5D] transition-colors">About</Link>
          <Link href="/services" className="font-sans text-[#1A2A3A]/80 hover:text-[#C88A5D] transition-colors">Services</Link>
          <Link href="/library" className="font-sans text-[#1A2A3A]/80 hover:text-[#C88A5D] transition-colors">Library</Link>
          <Link href="/insights" className="font-sans text-[#1A2A3A]/80 hover:text-[#C88A5D] transition-colors">Insights</Link>
        </nav>
        <MagneticButton className="bg-[#C88A5D] hover:bg-[#D4A373] text-white px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-colors shadow-md">
          Consult the Acharya
        </MagneticButton>
      </div>
    </header>
  );
}
