'use client';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function ContactPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="container mx-auto px-6">
            <h1 className="font-serif text-4xl text-center mb-8">Contact Acharya</h1><form className="max-w-lg mx-auto space-y-4"><input className="w-full p-3 border rounded" placeholder="Name" /><input className="w-full p-3 border rounded" placeholder="Email" /><textarea className="w-full p-3 border rounded" placeholder="Message"></textarea><button className="luxury-button w-full">Send</button></form>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
