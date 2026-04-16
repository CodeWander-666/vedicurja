'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { MagneticButton } from '@/components/global/MagneticButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const menuItems = [
    { key: 'home', href: '/' },
    { key: 'freeAITools', href: '/free-tools' },
    { key: 'services', href: '/services' },
    { key: 'bookings', href: '/bookings' },
    { key: 'learnVastu', href: '/learn-vastu' },
    { key: 'blogs', href: '/insights' },
    { key: 'testimonials', href: '/client-stories' },
    { key: 'about', href: '/about' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    window.location.href = '/';
  };

  const avatarUrl = profile?.avatar_url;
  const userInitial = profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U';
  const isAdmin = profile?.role === 'admin';

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-sacred-saffron/95 via-kumkuma-red/95 to-prakash-gold/95 backdrop-blur-xl shadow-md border-b border-white/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {!imgError ? (
            <Image
              src="/logo/logo.png"
              alt="VedicUrja"
              width={140}
              height={36}
              className="h-9 w-auto"
              onError={() => setImgError(true)}
              priority
            />
          ) : (
            <span className="font-serif text-2xl text-white drop-shadow-md">
              VedicUrja<span className="text-white">.</span>
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors drop-shadow"
            >
              {t(`common.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/70 hover:border-white transition-all focus:outline-none"
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Profile" width={40} height={40} className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-medium text-lg">
                    {userInitial}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 overflow-hidden"
                  >
                    <div className="p-3 border-b border-white/20">
                      <p className="font-medium text-nidra-indigo">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-nidra-indigo/60 truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-3 hover:bg-prakash-gold/10 transition text-nidra-indigo">Dashboard</Link>
                    <Link href="/dashboard/library" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-3 hover:bg-prakash-gold/10 transition text-nidra-indigo">My Library</Link>
                    <Link href="/dashboard/account" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-3 hover:bg-prakash-gold/10 transition text-nidra-indigo">Account Settings</Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-3 hover:bg-prakash-gold/10 transition border-t border-white/20 text-nidra-indigo">🛡️ Admin Panel</Link>
                    )}
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition">Sign Out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <MagneticButton className="bg-white/20 backdrop-blur-sm border border-white/50 text-white font-medium px-5 py-2 rounded-full hover:bg-white hover:text-nidra-indigo transition">
              <Link href="/signin">Sign In</Link>
            </MagneticButton>
          )}

          {isAdmin && (
            <Link href="/admin" className="hidden sm:block text-xs bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/50">Admin</Link>
          )}

          <MagneticButton className="hidden sm:block bg-white text-nidra-indigo font-medium px-5 py-2 rounded-full shadow-md hover:shadow-lg transition">
            <Link href="/contact">{t('common.consult')}</Link>
          </MagneticButton>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden relative w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="block w-full h-0.5 bg-white rounded-full" />
              <span className="block w-full h-0.5 bg-white rounded-full" />
              <span className="block w-full h-0.5 bg-white rounded-full" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Full‑Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden flex items-center justify-center p-4 pt-16"
          >
            {/* Blurred Background Overlay */}
            <div 
              className="absolute inset-0 bg-nidra-indigo/80 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl bg-gradient-to-b from-sacred-saffron via-kumkuma-red to-prakash-gold shadow-2xl border-2 border-prakash-gold/50 p-5 sm:p-6"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white text-2xl">✕</span>
                </motion.button>
              </div>

              {/* User Profile Section (if logged in) */}
              {user && (
                <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/70 bg-white/30 flex items-center justify-center">
                      {avatarUrl ? (
                        <Image src={avatarUrl} alt="Profile" width={56} height={56} className="object-cover" />
                      ) : (
                        <span className="text-white text-2xl font-medium">{userInitial}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{profile?.full_name || 'User'}</p>
                      <p className="text-white/80 text-sm truncate">{user.email}</p>
                      {isAdmin && <span className="text-xs bg-white/30 text-white px-2 py-0.5 rounded-full">Admin</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-3 mb-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-5 py-4 sm:px-6 sm:py-5 bg-white/90 backdrop-blur-sm border-2 border-white rounded-2xl text-nidra-indigo font-bold text-lg sm:text-xl shadow-lg hover:bg-white hover:shadow-xl transition-all"
                    >
                      {t(`common.${item.key}`)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3 border-t border-white/30 pt-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-3 sm:py-4 bg-white text-nidra-indigo rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center py-3 sm:py-4 bg-white/90 text-nidra-indigo rounded-full font-bold text-base sm:text-lg border-2 border-white shadow-lg hover:bg-white transition-all"
                      >
                        🛡️ Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-center py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition-all"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-3 sm:py-4 bg-white text-nidra-indigo rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 sm:py-4 bg-white text-nidra-indigo rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {t('common.consult')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
