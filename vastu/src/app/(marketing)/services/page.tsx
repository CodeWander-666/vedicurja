'use client';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function ServicesPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="container mx-auto px-6">
            <h1 className="font-serif text-4xl text-center mb-8">Sacred Services</h1><div className="grid md:grid-cols-2 gap-8"><div className="bg-white p-8 rounded-2xl shadow"><h2 className="font-serif text-2xl mb-4">Residential Vastu</h2><p>Transform your home into a sanctuary.</p></div><div className="bg-white p-8 rounded-2xl shadow"><h2 className="font-serif text-2xl mb-4">Commercial Vastu</h2><p>Engineer your business for growth.</p></div></div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
