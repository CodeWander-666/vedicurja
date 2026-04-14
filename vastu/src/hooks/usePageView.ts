'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export function usePageView() {
  const pathname = usePathname();
  const sessionId = useRef<string>();

  useEffect(() => {
    let sid = localStorage.getItem('session_id');
    if (!sid) {
      sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('session_id', sid);
      supabase.from('sessions').insert({ session_id: sid }).then();
    }
    sessionId.current = sid;

    supabase.from('page_views').insert({
      path: pathname,
      session_id: sid,
      user_agent: navigator.userAgent,
      referrer: document.referrer
    }).then();

    const handleUnload = () => {
      if (sessionId.current) {
        supabase.from('sessions').update({ ended_at: new Date().toISOString() }).eq('session_id', sessionId.current);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [pathname]);
}
