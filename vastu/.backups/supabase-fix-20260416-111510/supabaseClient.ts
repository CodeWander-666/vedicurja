import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (typeof window === 'undefined') {
    // Server-side – return a dummy client (static export never runs server-side)
    return {} as SupabaseClient;
  }

  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.warn('Supabase URL or Anon Key missing');
      return {} as SupabaseClient;
    }
    _supabase = createBrowserClient(url, key, {
      cookieOptions: {
        name: 'sb-auth',
        lifetime: 60 * 60 * 24 * 30, // 30 days
        domain: '',
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    });
  }
  return _supabase;
};

export const supabase = getSupabase();
