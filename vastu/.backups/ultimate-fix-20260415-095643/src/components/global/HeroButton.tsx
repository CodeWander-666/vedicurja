'use client'; import Link from 'next/link'; import { useSound } from '@/hooks/useSound'; import { useState, useEffect } from 'react';
interface HeroButtonProps { href: string; children: React.ReactNode; }
export function HeroButton({ href, children }: HeroButtonProps) { const { play } = useSound(); const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="inline-block px-10 py-4 rounded-full border-2 border-[#C88A5D] text-[#C88A5D] text-lg font-medium">{children}</div>;
  return (<Link href={href || "#"} onMouseEnter={() => play('hoverSlide')} onClick={() => play('clickPrimary')} className="group relative inline-block border-2 border-[#C88A5D] text-[#C88A5D] px-10 py-4 rounded-full text-lg font-medium overflow-hidden transition-all duration-500 hover:text-white"><span className="absolute inset-0 bg-gradient-to-r from-[#C88A5D] to-[#E8B960] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" /><span className="relative z-10">{children}</span></Link>);
}
export default HeroButton;
