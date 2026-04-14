'use client';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function FreeToolsPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="container mx-auto px-6">
            <h1 className="font-serif text-4xl text-center mb-8">Free AI Tools</h1><div className="grid md:grid-cols-3 gap-6"><div className="bg-white p-6 rounded-xl shadow">AI Kundali</div><div className="bg-white p-6 rounded-xl shadow">Vastu Scan</div><div className="bg-white p-6 rounded-xl shadow">Name Suggestion</div></div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
