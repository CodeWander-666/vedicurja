'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { supabase } from '@/lib/supabaseClient';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="pt-32 pb-20 px-6 min-h-screen bg-vastu-parchment">
          <div className="max-w-md mx-auto">
            <h1 className="font-serif text-4xl text-nidra-indigo mb-8 text-center">Sign In</h1>
            <form onSubmit={handleSignIn} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 border border-prakash-gold/30 rounded-xl"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border border-prakash-gold/30 rounded-xl"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full luxury-button"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center mt-6 text-nidra-indigo/60">
              Don't have an account?{' '}
              <Link href="/signup" className="text-sacred-saffron">Sign Up</Link>
            </p>
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
