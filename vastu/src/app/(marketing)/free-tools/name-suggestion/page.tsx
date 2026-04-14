'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSound } from '@/hooks/useSound';
import PaymentModal from '@/components/ui/PaymentSimulationModal';
import { NameSuggestion } from '@/types/tools';

const LuxuryToolCard = dynamic(() => import('@/components/sections/tools/LuxuryToolCard'), { ssr: false });
const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

const nakshatras = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];

export default function NameSuggestionPage() {
  const [nakshatra, setNakshatra] = useState('');
  const [syllables, setSyllables] = useState<NameSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { play } = useSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); play('clickPrimary');
    try {
      const res = await fetch('/api/ai/name-suggestion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nakshatra }) });
      const data = await res.json();
      setSyllables(data.syllables); play('success');
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <>
      <Header />
      <main className="relative z-10 pt-32 pb-20 min-h-screen"><GradientBackground />
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl text-center text-[#1A2A3A] mb-8">AI Name Suggestion<span className="block text-xl font-sans text-[#C88A5D] mt-2">Auspicious Syllables Aligned with Your Birth Star</span></motion.h1>
          <LuxuryToolCard title="Select Your Nakshatra" icon="✨">
            <form onSubmit={handleSubmit} className="space-y-6">
              <select value={nakshatra} onChange={e => setNakshatra(e.target.value)} className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl" required>
                <option value="">Select Your Nakshatra</option>
                {nakshatras.map(n => <option key={n}>{n}</option>)}
              </select>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#C88A5D] to-[#E8B960] text-white font-medium py-4 rounded-full text-lg">{loading ? 'Finding...' : 'Get Auspicious Syllables (Free)'}</button>
            </form>
          </LuxuryToolCard>
          <AnimatePresence>
            {syllables.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-12">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#C88A5D]/30 shadow-2xl">
                  <h3 className="font-serif text-3xl text-[#1A2A3A] mb-6">Your Auspicious Syllables</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {syllables.map((s, i) => <div key={i} className="p-4 bg-[#F9F6F0] rounded-xl text-center"><p className="text-3xl font-serif text-[#1A2A3A]">{s.syllable}</p><p className="text-xs text-[#1A2A3A]/60 mt-1">{s.description}</p></div>)}
                  </div>
                  <div className="mt-8 text-center"><button onClick={() => setShowPayment(true)} className="bg-[#1A2A3A] text-white px-8 py-4 rounded-full text-lg font-medium shadow-md">Get 108+ Full Names & Analysis →</button></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} tool="name-suggestion" amount={299} purpose="Premium Name Report" />
    </>
  );
}
