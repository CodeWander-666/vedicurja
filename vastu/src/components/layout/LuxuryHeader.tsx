'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LuxuryHeader() {
  const { play } = useSound();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'home', href: '/' },
    { key: 'freeAITools', href: '/free-tools' },
    { key: 'services', href: '/services' },
    { key: 'bookings', href: '/bookings' },
    { key: 'learnVastu', href: '/learn-vastu' },
    { key: 'blogs', href: '/insights' },
    { key: 'testimonials', href: '/client-stories' },
    { key: 'profile', href: '/dashboard' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled ? 'bg-vastu-parchment/95 backdrop-blur-xl shadow-luxury-md' : 'bg-transparent'
      } border-b border-prakash-gold/20`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <motion.span whileHover={{ scale: 1.05 }} className="font-serif text-2xl vedic-gradient-text">
            VedicUrja<span className="text-sacred-saffron">.</span>
          </motion.span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <Link key={item.key} href={item.href} className="relative px-4 py-2 font-sans text-sm text-nidra-indigo/80 hover:text-sacred-saffron transition-colors group" onMouseEnter={() => play('hoverSlide')}>
              {t(`common.${item.key}`)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sacred-saffron to-prakash-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/'); }} className="text-sm text-nidra-indigo/80 hover:text-kumkuma-red">Sign Out</button>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-nidra-indigo/80 hover:text-sacred-saffron">Sign In</Link>
              <Link href="/contact" className="luxury-button !py-2 !px-5 text-sm">{t('common.consult')}</Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
