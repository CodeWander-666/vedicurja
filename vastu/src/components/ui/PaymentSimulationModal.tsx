'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface PaymentSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: string;
  amount: number;
  purpose: string;
}

export default function PaymentSimulationModal({ isOpen, onClose, tool, amount, purpose }: PaymentSimulationModalProps) {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const { play } = useSound();

  const handleSimulatePayment = () => {
    setStep('processing');
    play('clickPrimary');
    
    setTimeout(() => {
      setStep('success');
      play('success');
      
      setTimeout(() => {
        onClose();
        setStep('details');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-white to-[#F9F6F0] p-8 rounded-3xl max-w-md w-full shadow-2xl border border-[#E8B960]/50"
            onClick={(e) => e.stopPropagation()}
          >
            {step === 'details' && (
              <>
                <div className="text-6xl mb-4">💳</div>
                <h3 className="font-serif text-2xl text-[#1A2A3A] mb-2">Complete Payment</h3>
                <p className="text-[#1A2A3A]/70 mb-6">{purpose}</p>
                
                <div className="bg-[#C88A5D]/10 p-4 rounded-2xl mb-6">
                  <p className="text-sm uppercase tracking-wider text-[#C88A5D]">Total Amount</p>
                  <p className="font-serif text-3xl text-[#1A2A3A]">₹{amount}</p>
                </div>
                
                <p className="text-xs text-center text-[#1A2A3A]/50 mb-4">
                  This is a demo – click below to simulate a successful payment.
                </p>
                
                <button
                  onClick={handleSimulatePayment}
                  className="w-full bg-gradient-to-r from-[#C88A5D] to-[#E8B960] text-white font-medium py-3 rounded-full"
                >
                  Simulate Payment
                </button>
              </>
            )}
            
            {step === 'processing' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-[#C88A5D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-serif text-xl">Processing Payment...</p>
              </div>
            )}
            
            {step === 'success' && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="font-serif text-2xl text-[#1A2A3A] mb-2">Payment Successful!</h3>
                <p className="text-[#1A2A3A]/70">Your premium access has been unlocked.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
