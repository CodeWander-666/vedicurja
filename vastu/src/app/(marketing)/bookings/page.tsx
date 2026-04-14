'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { VirtualConsultSection } from '@/types/admin';

const ProcessStep = ({ number, title, description, delay }: { number: number; title: string; description: string; delay: number }) => (
  <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay }} className="flex gap-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sacred-saffron to-prakash-gold flex items-center justify-center text-white font-serif text-xl font-bold shadow-luxury-md">{number}</div>
    <div><h3 className="font-serif text-2xl text-nidra-indigo mb-2">{title}</h3><p className="text-nidra-indigo/70 leading-relaxed">{description}</p></div>
  </motion.div>
);

export default function BookingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items: sections } = useRealtimeContent<VirtualConsultSection>('virtual_consult_content', 'order_index');
  const getSection = (key: string) => sections.find(s => s.section_key === key);
  const hero = getSection('hero');

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main ref={containerRef} className="relative z-10">
          <VideoBackground src="/videos/global-connection.mp4" fallbackKey="vastuConsultation" overlayOpacity="30" />
          <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <LuxuryTiltCard className="max-w-5xl mx-auto text-center p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30">
              <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                {hero?.title || 'Virtual Consultation'}<br />
                <span className="vedic-gradient-text">Ancient Wisdom, Modern Connection</span>
              </motion.h1>
              <p className="font-sans text-xl text-white/90 max-w-3xl mx-auto mb-12">{hero?.description || 'Experience personalized Vastu guidance from anywhere in the world.'}</p>
              <HeroButton href="/contact?source=bookings">Book Your Session →</HeroButton>
            </LuxuryTiltCard>
          </section>

          <section className="py-24 bg-vastu-parchment">
            <div className="container mx-auto px-6 max-w-4xl">
              <SectionTitle title="How It Works" subtitle="Seamless, secure, and deeply personal" />
              <div className="space-y-12">
                <ProcessStep number={1} title="Book Your Slot" description="Choose a convenient time from Acharya's calendar. You'll receive an instant confirmation with a secure video link." delay={0.1} />
                <ProcessStep number={2} title="Prepare Your Space" description="Walk through your home or office with your smartphone or share your floor plans. No special equipment needed." delay={0.2} />
                <ProcessStep number={3} title="Live Video Consultation" description="Connect with Acharya for a 60‑minute deep‑dive session. Discuss your concerns, show your space, and receive immediate insights." delay={0.3} />
                <ProcessStep number={4} title="Receive Your Report" description="Within 48 hours, you'll receive a detailed written report with personalized remedies and follow‑up recommendations." delay={0.4} />
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle title="Trusted Globally" subtitle="Join thousands who have transformed their lives through virtual Vastu" />
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                {[{ value:'50+', label:'Countries Served' },{ value:'5,000+', label:'Virtual Consultations' },{ value:'4.9 ★', label:'Average Rating' }].map((stat,i)=>(
                  <LuxuryTiltCard key={i}>
                    <div className="p-8 bg-white rounded-3xl border border-prakash-gold/20">
                      <p className="font-serif text-5xl text-prakash-gold mb-2">{stat.value}</p>
                      <p className="text-nidra-indigo/70">{stat.label}</p>
                    </div>
                  </LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Transform Your Space?</motion.h2>
            <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">Book your virtual consultation today and experience the power of authentic Vastu from anywhere.</p>
            <HeroButton href="/contact?source=bookings">Schedule Your Session →</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
