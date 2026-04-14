'use client';
import { ReactNode } from 'react';
export default function LuxuryTiltCard({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
