'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 container mx-auto px-6 max-w-md">
        <h1 className="font-serif text-4xl text-[#1A2A3A] mb-8 text-center">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-4 border border-[#C88A5D]/30 rounded-xl" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-4 border border-[#C88A5D]/30 rounded-xl" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#C88A5D] text-white py-4 rounded-full font-medium">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p className="text-center mt-6 text-[#1A2A3A]/60">Don't have an account? <a href="/signup" className="text-[#C88A5D]">Sign Up</a></p>
      </main>
      <Footer />
    </>
  );
}
