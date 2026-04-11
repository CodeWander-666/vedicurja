'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
] as const;

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const hasSelected = localStorage.getItem('language-selected');
    if (!hasSelected) {
      setIsOpen(true);
    }
  }, []);

  const handleSelect = (langCode: typeof languages[number]['code']) => {
    setLanguage(langCode);
    localStorage.setItem('language-selected', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#F9F6F0] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#C88A5D]/20"
          >
            <h3 className="font-serif text-2xl text-[#1A2A3A] mb-6 text-center">
              {t('language.select')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#C88A5D]/20 hover:border-[#C88A5D] hover:bg-[#C88A5D]/5 transition-all"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-sans text-[#1A2A3A]">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
