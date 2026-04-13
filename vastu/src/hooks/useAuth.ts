'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  coins: number;
  role: 'client' | 'admin';
}

export function useAuth(requiredRole?: 'client' | 'admin') {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (requiredRole) router.push('/signin');
        setLoading(false);
        return;
      }
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setUser(session.user);
      setProfile(profileData);
      
      if (requiredRole && profileData?.role !== requiredRole) {
        router.push('/');
      }
      setLoading(false);
    };
    
    getUser();
    
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && requiredRole) router.push('/signin');
    });
    
    return () => listener.subscription.unsubscribe();
  }, [requiredRole, router]);

  return { user, profile, loading };
}
