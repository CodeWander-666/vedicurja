'use client';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function BookingsPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="container mx-auto px-6">
            <h1 className="font-serif text-4xl text-center mb-8">Virtual Consultation</h1><p className="text-center text-nidra-indigo/70 max-w-2xl mx-auto">Connect with Acharya from anywhere in the world via secure video call.</p>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
