'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import LenisSmoothScroll from './LenisSmoothScroll';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Disable Lenis on /bookings to prevent useScroll hydration errors
  if (pathname === '/bookings') {
    return <>{children}</>;
  }
  return <LenisSmoothScroll>{children}</LenisSmoothScroll>;
}
export default SmoothScroll;
