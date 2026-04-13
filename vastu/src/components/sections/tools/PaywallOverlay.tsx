'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface PaywallOverlayProps { isVisible: boolean; onUpgrade: () => void; price: string; }
export default function PaywallOverlay({ isVisible, onUpgrade, price }: PaywallOverlayProps) {
  const { play } = useSound();
  if (!isVisible) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-2xl text-center max-w-xs">
        <h4 className="font-serif text-2xl mb-2">Unlock Full Report</h4>
        <p className="text-sm text-[#1A2A3A]/60 mb-4">Get detailed insights and personalized remedies.</p>
        <p className="font-bold text-2xl text-[#C88A5D] mb-4">{price}</p>
        <button onClick={onUpgrade} className="bg-[#C88A5D] text-white px-6 py-2 rounded-full w-full" onMouseEnter={() => play('hoverSlide')} onClickCapture={() => play('clickPrimary')}>Upgrade Now</button>
      </div>
    </motion.div>
  );
}
