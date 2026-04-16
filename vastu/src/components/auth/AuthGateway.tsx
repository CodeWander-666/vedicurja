'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';

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
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [step, setStep] = useState<'loading' | 'auth' | 'language' | 'ready'>('loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [skipAuth, setSkipAuth] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const skipped = localStorage.getItem('vedicurja_skip_auth') === 'true';
    if (skipped) setSkipAuth(true);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (skipAuth) {
      setStep('ready');
      return;
    }
    if (!user) {
      setStep('auth');
    } else if (!localStorage.getItem('vedicurja_language')) {
      setStep('language');
    } else {
      // Redirect admin users to /admin
      if (profile?.role === 'admin') {
        router.push('/admin');
        return;
      }
      setStep('ready');
    }
  }, [user, profile, loading, skipAuth, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    setVerificationSent(false);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
          },
        });
        if (error) throw error;
        setVerificationSent(true);
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

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/confirm` },
    });
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('vedicurja_language', langCode);
    if (user) {
      supabase.from('profiles').update({ language_preference: langCode }).eq('id', user.id);
    }
    // Admin check after language selection
    if (profile?.role === 'admin') {
      router.push('/admin');
      return;
    }
    setStep('ready');
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('vedicurja_skip_auth', 'true');
    setSkipAuth(true);
    setStep('ready');
  };

  const handleClose = () => handleContinueAsGuest();

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
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-prakash-gold/30 relative"
        >
          <button onClick={handleClose} className="absolute top-4 right-4 text-nidra-indigo/40 hover:text-nidra-indigo transition" aria-label="Continue as guest">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl text-nidra-indigo">VedicUrja</h1>
            <p className="text-nidra-indigo/60 text-sm mt-1">Ancient Wisdom. Modern Precision.</p>
          </div>
          <h2 className="font-serif text-2xl text-center text-nidra-indigo mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {verificationSent ? (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center py-8">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="font-serif text-xl text-nidra-indigo mb-2">Verify Your Email</h3>
              <p className="text-nidra-indigo/70">We've sent a confirmation link to <strong>{email}</strong>. Please check your inbox.</p>
              <button onClick={() => { setIsSignUp(false); setVerificationSent(false); }} className="mt-6 text-prakash-gold hover:underline">Return to Sign In</button>
            </motion.div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-4 border border-prakash-gold/30 rounded-xl bg-white/50 focus:border-prakash-gold outline-none" />
              )}
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 border border-prakash-gold/30 rounded-xl bg-white/50 focus:border-prakash-gold outline-none" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 border border-prakash-gold/30 rounded-xl bg-white/50 focus:border-prakash-gold outline-none" />
              {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
              <button type="submit" disabled={submitting} className="w-full luxury-button py-4 disabled:opacity-50">
                {submitting ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>
            </form>
          )}

          {!verificationSent && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-prakash-gold/20"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white/90 text-nidra-indigo/60">Or continue with</span></div>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 p-4 border border-prakash-gold/30 rounded-xl bg-white/50 hover:bg-white transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="text-nidra-indigo font-medium">Google</span>
              </button>
              <p className="text-center mt-6 text-nidra-indigo/60">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-prakash-gold font-medium hover:underline">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
              </p>
              <button onClick={handleContinueAsGuest} className="w-full mt-4 text-sm text-nidra-indigo/50 hover:text-nidra-indigo transition">Continue as Guest →</button>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  if (step === 'language') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-vastu-parchment via-white to-vastu-stone overflow-auto py-10">
        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 border border-prakash-gold/30">
          <h2 className="font-serif text-3xl text-center text-nidra-indigo mb-2">Choose Your Language</h2>
          <p className="text-center text-nidra-indigo/60 mb-8">Select your preferred language for VedicUrja</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map(lang => (
              <motion.button key={lang.code} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }} onClick={() => handleLanguageSelect(lang.code)} className={`p-4 rounded-xl border-2 transition-all ${selectedLanguage===lang.code ? 'border-prakash-gold bg-prakash-gold/10 shadow-md' : 'border-prakash-gold/20 hover:border-prakash-gold/50'}`}>
                <span className="text-3xl mb-2 block">{lang.flag}</span>
                <span className="font-medium text-nidra-indigo block">{lang.nativeName}</span>
                <span className="text-xs text-nidra-indigo/60">{lang.name}</span>
              </motion.button>
            ))}
          </div>
          <button onClick={() => handleLanguageSelect(selectedLanguage)} className="w-full luxury-button py-4 mt-8">Continue</button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
