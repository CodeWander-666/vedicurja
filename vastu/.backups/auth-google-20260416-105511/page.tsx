'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      router.push('/signin?message=Check your email to confirm your account');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/dashboard' },
    });
  };

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-vastu-parchment via-white to-vastu-stone overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <Mandala3D />
          </div>
          <FloatingParticles />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md mx-auto px-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-prakash-gold/30">
              <div className="text-center mb-8">
                <h1 className="font-serif text-3xl text-nidra-indigo">Create Account</h1>
                <p className="text-nidra-indigo/60 text-sm mt-2">Join VedicUrja today</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6">
                {/* 3D Input - Full Name */}
                <div className="relative group">
                  <motion.div
                    whileFocus={{ scale: 1.02, rotateX: 2 }}
                    className="relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-prakash-gold/30 rounded-xl focus:border-prakash-gold outline-none transition-all text-nidra-indigo placeholder:text-nidra-indigo/40"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-prakash-gold/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* 3D Input - Email */}
                <div className="relative group">
                  <motion.div
                    whileFocus={{ scale: 1.02, rotateX: 2 }}
                    className="relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-prakash-gold/30 rounded-xl focus:border-prakash-gold outline-none transition-all text-nidra-indigo placeholder:text-nidra-indigo/40"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-prakash-gold/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* 3D Input - Password */}
                <div className="relative group">
                  <motion.div
                    whileFocus={{ scale: 1.02, rotateX: 2 }}
                    className="relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-prakash-gold/30 rounded-xl focus:border-prakash-gold outline-none transition-all text-nidra-indigo placeholder:text-nidra-indigo/40"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-prakash-gold/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full luxury-button py-4 text-lg disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Sign Up'}
                </motion.button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-prakash-gold/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white/80 text-nidra-indigo/60">Or continue with</span>
                </div>
              </div>

              <motion.button
                onClick={handleGoogleSignUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 p-4 border-2 border-prakash-gold/30 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-nidra-indigo font-medium">Google</span>
              </motion.button>

              <p className="text-center mt-6 text-nidra-indigo/60">
                Already have an account?{' '}
                <Link href="/signin" className="text-prakash-gold font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
