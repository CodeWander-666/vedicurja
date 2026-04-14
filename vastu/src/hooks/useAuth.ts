'use client';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  coins: number;
  role: 'client' | 'admin';
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useAuth(requiredRole?: 'client' | 'admin') {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (requiredRole) router.push('/signin');
        setLoading(false);
        return;
      }
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setUser(user);
      setProfile(profileData);
      if (requiredRole && profileData?.role !== requiredRole) {
        router.push('/');
      }
      setLoading(false);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (!session && requiredRole) router.push('/signin');
      }
    );
    return () => listener.subscription.unsubscribe();
  }, [requiredRole, router]);

  return { user, profile, loading };
}
