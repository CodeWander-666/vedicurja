'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentSimulationModal from './PaymentSimulationModal';

interface PremiumLockOverlayProps {
  isLocked: boolean;
  price: number;
  tool: string;
  children: React.ReactNode;
  onUnlock?: () => void;
}

export default function PremiumLockOverlay({
  isLocked,
  price,
  tool,
  children,
  onUnlock,
}: PremiumLockOverlayProps) {
  const [showPayment, setShowPayment] = useState(false);

  const handleUnlockClick = () => setShowPayment(true);
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    if (onUnlock) onUnlock();
  };

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="relative filter blur-[8px] pointer-events-none select-none opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-prakash-gold/40 text-center max-w-sm mx-4"
        >
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="font-serif text-2xl text-nidra-indigo mb-2">Premium Feature</h3>
          <p className="text-nidra-indigo/70 mb-6">
            Unlock the full {tool} report with detailed analysis and personalised recommendations.
          </p>
          <div className="bg-prakash-gold/10 rounded-2xl p-4 mb-6">
            <span className="text-3xl font-serif text-nidra-indigo">₹{price}</span>
            <span className="text-sm text-nidra-indigo/60 block">one‑time payment</span>
          </div>
          <button onClick={handleUnlockClick} className="w-full luxury-button py-3">
            Unlock Now
          </button>
        </motion.div>
      </div>
      <PaymentSimulationModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        tool={tool}
        amount={price}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
