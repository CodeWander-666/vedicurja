'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface PaywallOverlayProps {
  isVisible: boolean;
  onUpgrade: () => void;
  price: string;
}

export default function PaywallOverlay({ isVisible, onUpgrade, price }: PaywallOverlayProps) {
  const { play } = useSound();
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => onUpgrade()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-[#F9F6F0] p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-[#E8B960]/50"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🔓</div>
        <h3 className="font-serif text-3xl text-[#1A2A3A] mb-3">Unlock Full Potential</h3>
        <p className="text-[#1A2A3A]/70 mb-6">
          Get a detailed personalized report with expert remedies and lifetime access.
        </p>
        <div className="bg-[#C88A5D]/10 p-4 rounded-2xl mb-6">
          <p className="text-sm uppercase tracking-wider text-[#C88A5D]">Premium Report</p>
          <p className="font-serif text-4xl text-[#1A2A3A]">{price}</p>
        </div>
        <button
          onClick={() => { play('clickPrimary'); onUpgrade(); }}
          className="w-full bg-gradient-to-r from-[#C88A5D] to-[#E8B960] text-white font-medium py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition"
        >
          Upgrade & Consult Acharya
        </button>
        <p className="text-xs text-[#1A2A3A]/50 mt-4">Secure payment • Satisfaction guaranteed</p>
      </motion.div>
    </motion.div>
  );
}
