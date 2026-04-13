'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import GradientBackground from '@/components/global/GradientBackground';
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    const fileExt = file.name.split('.').pop();
    const fileName = `${profile.id}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });
    if (uploadError) return;
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
    await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
    setProfileImage(publicUrl);
    play('success');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-28 pb-20">
          <GradientBackground />
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex justify-between items-center">
              <div>
                <h1 className="font-serif text-4xl text-[#1A2A3A]">Your Profile</h1>
                <p className="font-sans text-[#1A2A3A]/60 mt-1">Manage your account and preferences.</p>
              </div>
              <button onClick={handleSignOut} className="text-red-500 hover:underline">Sign Out</button>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <motion.div className="bg-white rounded-3xl p-8 shadow-xl border border-[#C88A5D]/20 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#C88A5D] bg-[#F9F6F0] flex items-center justify-center">
                      {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-6xl">🧘</span>}
                    </div>
                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-10 h-10 bg-[#C88A5D] text-white rounded-full flex items-center justify-center shadow-lg"><span>📷</span></button>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A2A3A]">{profile?.full_name || 'User'}</h3>
                  <div className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] p-[2px] rounded-full inline-block mt-4">
                    <div className="bg-white rounded-full px-5 py-2 flex items-center gap-2">
                      <span className="text-xl">⭐</span>
                      <span className="font-sans font-bold text-[#1A2A3A]">{profile?.coins || 0} Coins</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                {/* My Courses Card */}
                <motion.div className="bg-white rounded-3xl p-6 shadow-xl border border-[#C88A5D]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl text-[#1A2A3A] mb-2">My Courses</h4>
                      <p className="text-sm text-[#1A2A3A]/60">Continue your learning journey</p>
                    </div>
                    <Link href="/dashboard/library" className="bg-[#C88A5D] text-white px-5 py-2 rounded-full text-sm">
                      View All →
                    </Link>
                  </div>
                </motion.div>
                {/* Preferences Card (existing) */}
                <motion.div className="bg-white rounded-3xl p-6 shadow-xl border border-[#C88A5D]/20">
                  <h4 className="font-serif text-xl text-[#1A2A3A] mb-4">Preferences</h4>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-[#1A2A3A]/70 block mb-2">Theme</label>
                    <div className="relative">
                      <button onClick={() => setShowThemeDropdown(!showThemeDropdown)} className="w-full p-3 bg-[#F9F6F0] border border-[#C88A5D]/30 rounded-xl text-left flex justify-between items-center">
                        <span>{theme === 'light' ? 'Bright' : theme === 'dark' ? 'Dark' : 'System'}</span>
                        <span className="text-[#C88A5D]">{showThemeDropdown ? '▲' : '▼'}</span>
                      </button>
                      <AnimatePresence>
                        {showThemeDropdown && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute z-20 w-full mt-2 bg-white border border-[#C88A5D]/20 rounded-xl shadow-lg overflow-hidden">
                            {['light', 'dark', 'system'].map(opt => (
                              <button key={opt} onClick={() => { setTheme(opt); setShowThemeDropdown(false); }} className="w-full p-3 text-left hover:bg-[#C88A5D]/10">{opt === 'light' ? 'Bright' : opt === 'dark' ? 'Dark' : 'System'}</button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-[#1A2A3A]/70 block mb-2">Language</label>
                    <div className="relative">
                      <button onClick={() => setShowLangDropdown(!showLangDropdown)} className="w-full p-3 bg-[#F9F6F0] border border-[#C88A5D]/30 rounded-xl text-left flex justify-between items-center">
                        <span>{language === 'en' ? 'English' : language}</span>
                        <span className="text-[#C88A5D]">{showLangDropdown ? '▲' : '▼'}</span>
                      </button>
                      <AnimatePresence>
                        {showLangDropdown && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute z-20 w-full mt-2 bg-white border border-[#C88A5D]/20 rounded-xl shadow-lg overflow-hidden">
                            {['en', 'hi', 'es', 'fr'].map(lang => (
                              <button key={lang} onClick={() => { setLanguage(lang as any); setShowLangDropdown(false); }} className="w-full p-3 text-left hover:bg-[#C88A5D]/10">{lang === 'en' ? 'English' : lang}</button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
