'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import PremiumLockOverlay from '@/components/ui/PremiumLockOverlay';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { supabase } from '@/lib/supabaseClient';
import NameSuggestionForm from '@/components/sections/tools/NameSuggestionForm';
import SyllableCard3D from '@/components/sections/tools/SyllableCard3D';
import nakshatraData from '@/data/nakshatra-syllables.json';

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
  tool_key: 'name_suggestion',
  title: 'AI Name Suggestion',
  tagline: '',
  description: '',
  hero_title: null,
  hero_subtitle: null,
  premium_price: 299,
  premium_description: null,
  is_published: true,
};

export default function ToolPage() {
  const [result, setResult] = useState<any>(null);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  const { items } = useRealtimeContent<FreeTool>('free_tools', 'order_index');
  const toolData = items.find(t => t.tool_key === 'name_suggestion') || fallbackTool;

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
      tool_type: 'name_suggestion',
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

            <NameSuggestionForm onSuggest={(nakshatra: string) => {
                const raw = (nakshatraData as Record<string, string[]>)[nakshatra] || [];
                const syllables = raw.map((s: string) => ({ hindi: s, english: s, meaning: 'Auspicious sound' }));
                handleResult({ nakshatra, syllables });
              }} />
            {result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
                <section>
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6 text-center">Auspicious Syllables</h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    {result.syllables.map((s: any, i: number) => (
                      <SyllableCard3D key={i} syllable={s} index={i} />
                    ))}
                  </div>
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
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-6 text-center">108+ Full Names</h2>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl text-center shadow-sm border border-prakash-gold/20">
                        <p className="font-medium text-nidra-indigo">Aarav</p>
                        <p className="text-xs text-nidra-indigo/60">Peaceful</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-nidra-indigo/60 mt-4">+ 90 more names unlocked!</p>
                </section>
              </PremiumLockOverlay>
            )}
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
