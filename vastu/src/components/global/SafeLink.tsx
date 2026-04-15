'use client';
import Link from 'next/link';
import { ComponentProps } from 'react';

export default function SafeLink({ href, ...props }: ComponentProps<typeof Link>) {
  const safeHref = href || '#';
  return <Link href={safeHref || '#'} {...props} />;
}
