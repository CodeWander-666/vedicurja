'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import GradientBackground from '@/components/global/GradientBackground';
import { HeroButton } from '@/components/global/HeroButton';
import { useSound } from '@/hooks/useSound';
import { supabase } from '@/lib/supabaseClient';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ContactContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || 'website';
  const { play } = useSound();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    play('clickPrimary');
    
    // Store lead in Supabase
    await supabase.from('consultations').insert({
      ...formData,
      source,
      created_at: new Date()
    });
    
    setSubmitted(true);
    setLoading(false);
    play('success');
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">🙏</div>
        <h2 className="font-serif text-4xl text-[#1A2A3A] mb-4">Thank You!</h2>
        <p className="text-lg text-[#1A2A3A]/70 mb-8">Our team will contact you within 24 hours to schedule your consultation.</p>
        <HeroButton href="/">Return Home</HeroButton>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A2A3A] mb-4">
          Consult the Acharya
        </h1>
        <p className="text-xl font-sans text-[#C88A5D]">
          {source === 'kundali' && 'Complete your Kundali analysis with a personal session.'}
          {source === 'vastuscan' && 'Get expert remedies based on your Vastu scan.'}
          {source === 'namesuggestion' && 'Receive a full name report and consultation.'}
          {!source && 'Schedule a private consultation for personalized guidance.'}
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number (with country code)"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl"
            required
          />
          <textarea
            placeholder="Tell us about your needs or preferred time..."
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl h-32"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#C88A5D] to-[#E8B960] text-white font-medium py-4 rounded-full text-lg shadow-lg"
          >
            {loading ? 'Submitting...' : 'Request Consultation'}
          </button>
        </form>
      </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen">
          <GradientBackground />
          <div className="container mx-auto px-6 max-w-4xl">
            <Suspense fallback={<div>Loading...</div>}>
              <ContactContent />
            </Suspense>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
