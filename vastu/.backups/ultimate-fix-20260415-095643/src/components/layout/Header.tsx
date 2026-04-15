'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
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
    <header className="fixed top-0 left-0 right-0 z-30 bg-vastu-parchment/95 backdrop-blur-xl shadow-md border-b border-prakash-gold/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl vedic-gradient-text">VedicUrja<span className="text-sacred-saffron">.</span></Link>
        <nav className="hidden lg:flex items-center space-x-4">
          {menuItems.map((item) => (
            <Link key={item.key} href={item.href || "#"} className="text-sm text-nidra-indigo/80 hover:text-sacred-saffron">
              {t(`common.${item.key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="text-sm text-nidra-indigo/80 hover:text-sacred-saffron">Sign In</Link>
          <Link href="/contact" className="luxury-button !py-2 !px-5 text-sm">{t('common.consult')}</Link>
        </div>
      </div>
    </header>
  );
}
