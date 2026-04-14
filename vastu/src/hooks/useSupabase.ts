'use client';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export function useSupabase() {
  const [client, setClient] = useState<typeof supabase | null>(supabase);
  
  useEffect(() => {
    // Once mounted on client, ensure client is available
    if (typeof window !== 'undefined' && !client) {
      // Re-initialize if needed
      import('@/lib/supabaseClient').then(module => {
        setClient(module.supabase);
      });
    }
  }, [client]);
  
  return client;
}
