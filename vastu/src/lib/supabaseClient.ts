import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

// Create a dummy client that returns empty data for static generation
const createDummyClient = (): SupabaseClient => {
  const dummyPromise = Promise.resolve({ data: [], error: null });
  return {
    from: () => ({
      select: () => ({ order: () => dummyPromise, eq: () => dummyPromise, single: () => Promise.resolve({ data: null, error: null }) }),
      insert: () => dummyPromise,
      update: () => dummyPromise,
      delete: () => dummyPromise,
      upsert: () => dummyPromise,
    }),
    channel: () => ({ on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }) }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithOAuth: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      exchangeCodeForSession: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
    rpc: () => Promise.resolve({ data: null, error: null }),
  } as unknown as SupabaseClient;
};

export const getSupabase = (): SupabaseClient => {
  // During static generation (no window) or when env vars are missing, return dummy client
  if (typeof window === 'undefined') {
    return createDummyClient();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars are missing in browser, log warning and return dummy
  if (!url || !key) {
    console.warn('Supabase URL or Anon Key missing – using dummy client');
    return createDummyClient();
  }

  if (!_supabase) {
    _supabase = createBrowserClient(url, key, {
      cookieOptions: {
        name: 'sb-auth',
        maxAge: 60 * 60 * 24 * 30,
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
