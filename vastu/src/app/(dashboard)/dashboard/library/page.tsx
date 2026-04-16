'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
  const router = useRouter();
  useEffect(() => { router.push('/learn-vastu'); }, [router]);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
