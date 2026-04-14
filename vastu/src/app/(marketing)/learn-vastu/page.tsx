'use client';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function LearnVastuPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="container mx-auto px-6">
            <h1 className="font-serif text-4xl text-center mb-8">Learn Vastu Shastra</h1><div className="grid md:grid-cols-4 gap-4"><div className="bg-white p-4 rounded-xl">Vastu Foundations</div><div className="bg-white p-4 rounded-xl">Advanced Vastu</div><div className="bg-white p-4 rounded-xl">Numerology Basics</div><div className="bg-white p-4 rounded-xl">Master Numerology</div></div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
