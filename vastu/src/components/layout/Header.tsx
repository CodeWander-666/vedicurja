'use client';
import Link from 'next/link';
import { MagneticButton } from '@/components/global/MagneticButton';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export function Header() {
  const { play } = useSound();
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setUser(session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

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
    <header className="fixed top-0 left-0 right-0 z-30 bg-bg-elevated backdrop-blur-md border-b border-prakash-gold/20">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-nidra-indigo">
          VedicUrja<span className="text-ganga-sandstone">.</span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              className="font-sans text-sm text-nidra-indigo/70 hover:text-ganga-sandstone transition-colors"
              onMouseEnter={() => play('hoverSlide')}
              onClick={() => play('clickSecondary')}
            >
              {t(`common.${item.key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={handleSignOut} className="text-sm text-nidra-indigo/70 hover:text-red-500">Sign Out</button>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-nidra-indigo/70 hover:text-ganga-sandstone">Sign In</Link>
              <MagneticButton className="bg-ganga-sandstone hover:bg-[#D4A373] text-white px-5 py-2 rounded-full text-sm">
                {t('common.consult')}
              </MagneticButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
