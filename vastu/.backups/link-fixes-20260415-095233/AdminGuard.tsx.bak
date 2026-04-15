'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [profile, loading, router]);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  return <>{children}</>;
}
