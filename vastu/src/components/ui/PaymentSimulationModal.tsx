'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tool: string;
  amount: number;
  userId?: string | null;
  onSuccess?: () => void;
}

export default function PaymentSimulationModal({ isOpen, onClose, tool, amount, userId, onSuccess }: Props) {
  const [step, setStep] = useState<'form' | 'processing'>('form');

  const handleSimulate = async () => {
    setStep('processing');
    // Simulate payment record
    await supabase.from('payments').insert({
      user_id: userId || null,
      amount,
      tool,
      status: 'simulated_success',
      created_at: new Date().toISOString(),
    });
    // Short delay for realism, then call onSuccess and close
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
      setStep('form'); // reset for next open
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 notranslate"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl border border-prakash-gold/30 notranslate"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl text-nidra-indigo mb-2 notranslate">Simulate Payment</h3>
            <p className="text-nidra-indigo/70 mb-4 notranslate">This is a demo. No real money will be charged.</p>
            <div className="bg-vastu-stone/50 p-4 rounded-xl mb-4 text-center notranslate">
              <span className="text-2xl font-serif notranslate">₹{amount}</span>
            </div>
            {step === 'form' ? (
              <>
                <input placeholder="Card Number" className="w-full p-3 border border-prakash-gold/30 rounded-xl mb-3 notranslate" defaultValue="4242 4242 4242 4242" />
                <div className="flex gap-3 mb-4 notranslate">
                  <input placeholder="MM/YY" className="w-1/2 p-3 border border-prakash-gold/30 rounded-xl notranslate" defaultValue="12/28" />
                  <input placeholder="CVC" className="w-1/2 p-3 border border-prakash-gold/30 rounded-xl notranslate" defaultValue="123" />
                </div>
                <button onClick={handleSimulate} className="w-full luxury-button notranslate">Pay ₹{amount}</button>
              </>
            ) : (
              <div className="text-center py-8 notranslate">
                <div className="w-12 h-12 border-4 border-sacred-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4 notranslate" />
                <p className="text-nidra-indigo/70 notranslate">Processing payment...</p>
              </div>
            )}
            {step === 'form' && (
              <button onClick={onClose} className="w-full mt-3 text-sm text-nidra-indigo/60 notranslate">Cancel</button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
