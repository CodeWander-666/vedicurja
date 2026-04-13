'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { if (!localStorage.getItem('language-selected')) setIsOpen(true); }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} className="bg-[#F9F6F0] p-8 rounded-3xl">
            <h3 className="font-serif text-2xl mb-4">Select your language</h3>
            <button onClick={() => { localStorage.setItem('language-selected','true'); setIsOpen(false); }} className="w-full p-3 text-left hover:bg-[#C88A5D]/10">🇬🇧 English</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
