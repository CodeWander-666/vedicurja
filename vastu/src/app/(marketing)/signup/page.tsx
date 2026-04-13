'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      if (error) setError(error.message);
      else if (data.user) router.push('/signin');
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
        <h1 className="font-serif text-4xl text-[#1A2A3A] mb-8 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full p-4 border border-[#C88A5D]/30 rounded-xl" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-4 border border-[#C88A5D]/30 rounded-xl" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-4 border border-[#C88A5D]/30 rounded-xl" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#C88A5D] text-white py-4 rounded-full font-medium">{loading ? 'Creating account...' : 'Sign Up'}</button>
        </form>
        <p className="text-center mt-6 text-[#1A2A3A]/60">Already have an account? <a href="/signin" className="text-[#C88A5D]">Sign In</a></p>
      </main>
      <Footer />
    </>
  );
}
