'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
];

export default function AuthGateway({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const [step, setStep] = useState<'loading' | 'auth' | 'language' | 'ready'>('loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setStep('auth');
    } else if (!profile?.language_preference) {
      setStep('language');
    } else {
      setStep('ready');
    }
  }, [user, profile, loading]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLanguageSelect = async (langCode: string) => {
    setSelectedLanguage(langCode);
    if (user) {
      await supabase.from('profiles').update({ language_preference: langCode }).eq('id', user.id);
      localStorage.setItem('vedicurja_language', langCode);
    }
    setStep('ready');
  };

  if (step === 'loading') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-vastu-parchment">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-nidra-indigo/60 font-serif">Loading VedicUrja...</p>
        </div>
      </div>
    );
  }

  if (step === 'auth') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-vastu-parchment via-white to-vastu-stone overflow-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-prakash-gold/30"
        >
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl text-nidra-indigo">VedicUrja</h1>
            <p className="text-nidra-indigo/60 text-sm mt-1">Ancient Wisdom. Modern Precision.</p>
          </div>
          <h2 className="font-serif text-2xl text-center text-nidra-indigo mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full p-4 border border-prakash-gold/30 rounded-xl bg-white/50 focus:border-prakash-gold outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-prakash-gold/30 rounded-xl bg-white/50 focus:border-prakash-gold outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-prakash-gold/30 rounded-xl bg-white/50 focus:border-prakash-gold outline-none"
            />
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full luxury-button py-4 disabled:opacity-50"
            >
              {submitting ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>
          <p className="text-center mt-6 text-nidra-indigo/60">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-prakash-gold font-medium hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  if (step === 'language') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-vastu-parchment via-white to-vastu-stone overflow-auto py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 border border-prakash-gold/30"
        >
          <h2 className="font-serif text-3xl text-center text-nidra-indigo mb-2">Choose Your Language</h2>
          <p className="text-center text-nidra-indigo/60 mb-8">Select your preferred language for VedicUrja</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map(lang => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLanguage === lang.code
                    ? 'border-prakash-gold bg-prakash-gold/10 shadow-md'
                    : 'border-prakash-gold/20 hover:border-prakash-gold/50'
                }`}
              >
                <span className="text-3xl mb-2 block">{lang.flag}</span>
                <span className="font-medium text-nidra-indigo block">{lang.nativeName}</span>
                <span className="text-xs text-nidra-indigo/60">{lang.name}</span>
              </motion.button>
            ))}
          </div>
          <button
            onClick={() => handleLanguageSelect(selectedLanguage)}
            className="w-full luxury-button py-4 mt-8"
          >
            Continue
          </button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
