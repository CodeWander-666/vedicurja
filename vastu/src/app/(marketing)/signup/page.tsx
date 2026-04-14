'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { useSound } from '@/hooks/useSound';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { play } = useSound();

  // 3D tilt effect for the card
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    play('clickPrimary');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard',
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      play('clickSecondary');
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    play('clickPrimary');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) throw error;

      if (data.user) {
        play('success');
        router.push('/signin?message=Check your email to confirm your account');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      play('clickSecondary');
    }
  };

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <LuxuryHeader />
      <SmoothScroll>
        <main className="relative min-h-screen flex items-center justify-center px-6 py-24">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-vastu-parchment via-white to-vastu-parchment" />
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, #C88A5D20 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 70%, #E8B96020 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 30%, #C88A5D20 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          {/* 3D Tilt Card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-ganga-sandstone/30">
              {/* Logo / Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="font-serif text-4xl text-nidra-indigo mb-2">Join VedicUrja</h1>
                <p className="text-nidra-indigo/60">Begin your sacred journey</p>
              </motion.div>

              {/* Google Sign Up Button */}
              <motion.button
                onClick={handleGoogleSignUp}
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => play('hoverSlide')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-ganga-sandstone/30 rounded-xl p-4 mb-6 hover:shadow-lg transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-nidra-indigo">Continue with Google</span>
              </motion.button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-ganga-sandstone/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 text-nidra-indigo/50">or</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSignUp} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-4 bg-white/50 border border-ganga-sandstone/30 rounded-xl focus:border-ganga-sandstone focus:outline-none transition"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 bg-white/50 border border-ganga-sandstone/30 rounded-xl focus:border-ganga-sandstone focus:outline-none transition"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-4 bg-white/50 border border-ganga-sandstone/30 rounded-xl focus:border-ganga-sandstone focus:outline-none transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseEnter={() => play('hoverSlide')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-nidra-indigo/50 hover:text-ganga-sandstone transition"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </motion.div>

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
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => play('hoverSlide')}
                  className="w-full bg-gradient-to-r from-ganga-sandstone to-prakash-gold text-white py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    'Sign Up with Email'
                  )}
                </motion.button>
              </form>

              {/* Sign In Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-6 text-nidra-indigo/60"
              >
                Already have an account?{' '}
                <Link href="/signin" className="text-ganga-sandstone hover:underline">
                  Sign in
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
