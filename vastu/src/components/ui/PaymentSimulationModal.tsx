'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tool: string;
  amount: number;
  userId?: string;
}

export default function PaymentSimulationModal({ isOpen, onClose, tool, amount, userId }: Props) {
  const [step, setStep] = useState<'form' | 'processing'>('form');
  const router = useRouter();

  const handleSimulate = async () => {
    setStep('processing');
    await supabase.from('payments').insert({
      user_id: userId || null,
      amount,
      tool,
      status: 'simulated_success',
      created_at: new Date().toISOString(),
    });
    setTimeout(() => {
      router.push('/payment/status?success=true');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} className="bg-white p-8 rounded-3xl max-w-md w-full">
            <h3 className="font-serif text-2xl mb-4">Simulate Payment</h3>
            <p className="mb-4">Amount: ₹{amount}</p>
            {step === 'form' ? (
              <>
                <input placeholder="Card Number (dummy)" className="w-full p-3 border rounded mb-3" defaultValue="4242 4242 4242 4242" />
                <div className="flex gap-3 mb-4">
                  <input placeholder="MM/YY" className="w-1/2 p-3 border rounded" defaultValue="12/28" />
                  <input placeholder="CVC" className="w-1/2 p-3 border rounded" defaultValue="123" />
                </div>
                <button onClick={handleSimulate} className="w-full luxury-button">Pay ₹{amount} (Simulated)</button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-sacred-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Processing payment...</p>
              </div>
            )}
            <button onClick={onClose} className="w-full mt-3 text-sm text-nidra-indigo/60">Cancel</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
