'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSound } from '@/hooks/useSound';
import LocationAutocomplete from '@/components/ui/LocationAutocomplete';
import PaymentModal from '@/components/ui/PaymentSimulationModal';
import KundaliChartSVG from '@/components/kundali/KundaliChartSVG';
import { KundaliChart as KundaliChartType } from '@/types/tools';

const LuxuryToolCard = dynamic(() => import('@/components/sections/tools/LuxuryToolCard'), { ssr: false });
const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

export default function KundaliPage() {
  const [formData, setFormData] = useState({ name: '', birthDate: '', birthTime: '', location: null as any });
  const [chart, setChart] = useState<KundaliChartType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { play } = useSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) { setError('Please select a location'); return; }
    setLoading(true); setError(null); play('clickPrimary');
    try {
      const res = await fetch('/api/ai/kundali', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setChart(data.chart);
      play('success');
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <>
      <Header />
      <main className="relative z-10 pt-32 pb-20 min-h-screen"><GradientBackground />
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-serif text-6xl md:text-7xl text-[#1A2A3A] mb-4">AI Kundali</h1>
            <p className="text-xl font-sans text-[#C88A5D]">Your Cosmic Blueprint, Decoded with Precision</p>
          </motion.div>
          <LuxuryToolCard title="Enter Your Birth Details" icon="🔮">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl" required />
                <input type="date" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl" required />
                <input type="time" value={formData.birthTime} onChange={e => setFormData({...formData, birthTime: e.target.value})} className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl" required />
                <LocationAutocomplete onSelect={(loc) => setFormData({...formData, location: loc})} className="w-full" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#C88A5D] to-[#E8B960] text-white font-medium py-4 rounded-full text-lg disabled:opacity-50">{loading ? 'Calculating...' : 'Generate Free Chart'}</button>
            </form>
          </LuxuryToolCard>
          <AnimatePresence>
            {chart && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-12">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#C88A5D]/30 shadow-2xl">
                  <h3 className="font-serif text-3xl text-[#1A2A3A] mb-6">Your Vedic Birth Chart</h3>
                  <KundaliChartSVG planets={chart.planets} ascendant={chart.ascendant} />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-[#F9F6F0] p-4 rounded-xl text-center"><p className="text-xs text-[#C88A5D]">Ascendant</p><p className="text-xl font-serif">{chart.ascendant}</p></div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl text-center"><p className="text-xs text-[#C88A5D]">Moon Sign</p><p className="text-xl font-serif">{chart.moonSign}</p></div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl text-center"><p className="text-xs text-[#C88A5D]">Sun Sign</p><p className="text-xl font-serif">{chart.sunSign}</p></div>
                    <div className="bg-[#F9F6F0] p-4 rounded-xl text-center"><p className="text-xs text-[#C88A5D]">Nakshatra</p><p className="text-xl font-serif">{chart.nakshatra}</p></div>
                  </div>
                  <div className="text-center mt-8">
                    <button onClick={() => setShowPayment(true)} className="bg-[#1A2A3A] text-white px-8 py-4 rounded-full text-lg font-medium shadow-md">Unlock Full Report & Personalized Remedies →</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} tool="kundali" amount={499} purpose="Premium Kundali Report" />
    </>
  );
}
