'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { play } = useSound();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/signin'); return; }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
      setProfileImage(data?.avatar_url);
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  if (loading) return <div className="pt-32 text-center text-nidra-indigo/70">Loading...</div>;

  const isAdmin = profile?.role === 'admin';

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <LuxuryHeader />
      <SmoothScroll>
        <main className="relative z-10 pt-28 pb-20">
          <AnimatedGradientBackground />
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <h1 className="section-title">Your Profile</h1>
              <p className="text-nidra-indigo/70">Manage your account and preferences.</p>
            </motion.div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <LuxuryTiltCard>
                  <div className="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-md rounded-3xl p-8 border border-prakash-gold/20 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-prakash-gold flex items-center justify-center">
                        {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-6xl">🧘</span>}
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl text-nidra-indigo">{profile?.full_name || 'User'}</h3>
                    <div className="bg-gradient-to-r from-sacred-saffron to-prakash-gold p-[2px] rounded-full inline-block mt-4">
                      <div className="bg-white/70 dark:bg-dark-surface/70 rounded-full px-5 py-2 flex items-center gap-2">
                        <span className="text-xl">⭐</span>
                        <span className="font-sans font-bold text-nidra-indigo">{profile?.coins || 0} Coins</span>
                      </div>
                    </div>
                    {isAdmin && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                        <Link href="/admin" className="luxury-button inline-block w-full">⚡ Admin Panel</Link>
                      </motion.div>
                    )}
                  </div>
                </LuxuryTiltCard>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <LuxuryTiltCard>
                  <div className="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-md rounded-3xl p-6 border border-prakash-gold/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-nidra-indigo mb-2">My Courses</h4>
                        <p className="text-sm text-nidra-indigo/70">Continue your learning journey</p>
                      </div>
                      <Link href="/dashboard/library" className="text-prakash-gold hover:underline">View All →</Link>
                    </div>
                  </div>
                </LuxuryTiltCard>
                
                <LuxuryTiltCard>
                  <div className="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-md rounded-3xl p-6 border border-prakash-gold/20">
                    <h4 className="font-serif text-xl text-nidra-indigo mb-4">Preferences</h4>
                    {/* Theme & Language toggles kept minimal for brevity */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-nidra-indigo/70 mb-2">Theme</label>
                        <select value={theme} onChange={e => setTheme(e.target.value)} className="glass-input">
                          <option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-nidra-indigo/70 mb-2">Language</label>
                        <select value={language} onChange={e => setLanguage(e.target.value as any)} className="glass-input">
                          <option value="en">English</option><option value="hi">हिन्दी</option><option value="es">Español</option><option value="fr">Français</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </LuxuryTiltCard>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
