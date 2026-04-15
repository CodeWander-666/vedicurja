'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/signin');
    }
  };

  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="pt-32 pb-20 px-6 min-h-screen bg-vastu-parchment">
          <div className="max-w-md mx-auto">
            <h1 className="font-serif text-4xl text-nidra-indigo mb-8 text-center">Sign Up</h1>
            <form onSubmit={handleSignUp} className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-4 border border-prakash-gold/30 rounded-xl"
              />
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
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
            <p className="text-center mt-6 text-nidra-indigo/60">
              Already have an account?{' '}
              <Link href="/signin" className="text-sacred-saffron">Sign In</Link>
            </p>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
