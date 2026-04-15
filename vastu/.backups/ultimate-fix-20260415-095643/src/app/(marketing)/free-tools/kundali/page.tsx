'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import PremiumLockOverlay from '@/components/ui/PremiumLockOverlay';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { supabase } from '@/lib/supabaseClient';
import KundaliForm from '@/components/sections/tools/KundaliForm';
import KundaliChart3D from '@/components/sections/tools/KundaliChart3D';
import PlanetaryStrengthBars from '@/components/sections/tools/PlanetaryStrengthBars';
import type { KundaliChart } from '@/types/tools';

interface FreeTool {
  id: string;
  tool_key: string;
  title: string;
  tagline: string;
  description: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  premium_price: number;
  premium_description: string | null;
  is_published: boolean;
}

const fallbackTool: FreeTool = {
  id: 'fallback',
  tool_key: 'kundali',
  title: 'AI Kundali',
  tagline: '',
  description: '',
  hero_title: null,
  hero_subtitle: null,
  premium_price: 499,
  premium_description: null,
  is_published: true,
};

export default function ToolPage() {
  const [result, setResult] = useState<any>(null);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  const { items } = useRealtimeContent<FreeTool>('free_tools', 'order_index');
  const toolData = items.find(t => t.tool_key === 'kundali') || fallbackTool;

  useEffect(() => {
    let sid = localStorage.getItem('vedicurja_session_id');
    if (!sid) {
      sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('vedicurja_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const logUsage = async (resultData: any, isPremium: boolean = false) => {
    if (!sessionId) return;
    const { data: user } = await supabase.auth.getUser();
    await supabase.from('tool_usage').insert({
      tool_type: 'kundali',
      user_id: user?.user?.id || null,
      session_id: sessionId,
      result_summary: resultData,
      is_premium: isPremium,
    });
  };

  const handleResult = (data: any) => {
    setResult(data);
    logUsage(data, false);
  };

  const handlePremiumUnlock = () => {
    setIsPremiumUnlocked(true);
    if (result) logUsage(result, true);
  };

  const heroTitle = toolData.hero_title || toolData.title;
  const heroSubtitle = toolData.hero_subtitle || toolData.description;

  if (!toolData.is_published) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 text-center"><p>This tool is currently unavailable.</p></main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="pt-28 pb-20 px-6 min-h-screen bg-vastu-parchment">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl text-center text-nidra-indigo mb-4"
            >
              {heroTitle}
            </motion.h1>
            <p className="text-center text-nidra-indigo/60 mb-12 max-w-2xl mx-auto">
              {heroSubtitle}
            </p>

            <KundaliForm onChartGenerated={handleResult} />
            {result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 space-y-12">
                <section>
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6">Your Kundali Chart</h2>
                  <KundaliChart3D chart={result} />
                </section>
                <section>
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6">Planetary Positions</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white/50 rounded-2xl overflow-hidden shadow-md">
                      <thead className="bg-nidra-indigo/5">
                        <tr>
                          <th className="py-3 px-4 text-left">Planet</th>
                          <th className="py-3 px-4 text-left">Sign</th>
                          <th className="py-3 px-4 text-left">House</th>
                          <th className="py-3 px-4 text-left">Degree</th>
                          <th className="py-3 px-4 text-left">Retrograde</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.planets.map((p: any) => (
                          <tr key={p.name} className="border-t border-prakash-gold/20">
                            <td className="py-3 px-4 font-medium">{p.name}</td>
                            <td className="py-3 px-4">{p.sign}</td>
                            <td className="py-3 px-4">{p.house}</td>
                            <td className="py-3 px-4">{p.degree.toFixed(1)}°</td>
                            <td className="py-3 px-4">{p.retrograde ? 'Yes' : 'No'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
                <section>
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6">Planetary Strengths (Shadbala)</h2>
                  <PlanetaryStrengthBars planets={result.planets} />
                </section>
              </motion.div>
            )}

            {result && (
              <PremiumLockOverlay
                isLocked={!isPremiumUnlocked}
                price={toolData.premium_price}
                tool={toolData.title}
                onUnlock={handlePremiumUnlock}
              >
                <section>
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6">Dasha Timeline & Predictions</h2>
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-nidra-indigo/70">
                      [Premium] Detailed Vimshottari Dasha periods, transit predictions, and personalised remedies.
                    </p>
                    <div className="mt-4 h-40 bg-gradient-to-r from-prakash-gold/10 to-sacred-saffron/10 rounded-xl" />
                  </div>
                </section>
                <section className="mt-8">
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6">Yogas & Gemstone Suggestions</h2>
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-nidra-indigo/70">
                      [Premium] Identify auspicious yogas and receive gemstone recommendations tailored to your chart.
                    </p>
                    <div className="mt-4 h-40 bg-gradient-to-r from-prakash-gold/10 to-sacred-saffron/10 rounded-xl" />
                  </div>
                </section>
              </PremiumLockOverlay>
            )}
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
