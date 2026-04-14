'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
import { MediaContainer } from '@/components/ui/MediaContainer';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { Service } from '@/types/admin';
import { media } from '@/lib/mediaConfig';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

const journeySteps = [
  { step: '01', title: 'Discovery Call', desc: 'We begin with a deep conversation to understand your space and aspirations.' },
  { step: '02', title: 'Site Analysis', desc: 'Using advanced tools and ancient wisdom, we analyze your floor plans or conduct a virtual walkthrough.' },
  { step: '03', title: 'Energy Mapping', desc: 'We overlay the 16‑zone Vastu Purusha Mandala and identify imbalances.' },
  { step: '04', title: 'Customized Remedies', desc: 'You receive a detailed report with non‑destructive corrections tailored to your space.' },
  { step: '05', title: 'Implementation Guidance', desc: 'We walk you through every remedy, ensuring easy application.' },
  { step: '06', title: 'Follow‑up & Support', desc: 'We stay connected to monitor the transformation.' },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const { items: services } = useRealtimeContent<Service>('services', 'order_index');

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main ref={containerRef} className="relative z-10">
          <VideoBackground src="/videos/luxury-home.mp4" fallbackKey="luxuryHome" overlayOpacity="30" />
          <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="text-center max-w-5xl relative z-10">
              <LuxuryTiltCard className="inline-block p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30">
                <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg">
                  Sacred Spaces.<br /><span className="vedic-gradient-text">Limitless Potential.</span>
                </motion.h1>
              </LuxuryTiltCard>
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }} className="font-sans text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
                India's Most Trusted Vastu Consultants — Serving Homes, Businesses, and Industries.
              </motion.p>
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.6 }}>
                <HeroButton href="#journey">Begin Your Journey</HeroButton>
              </motion.div>
            </div>
          </motion.section>

          <section id="journey" className="py-24 bg-vastu-parchment">
            <div className="container mx-auto px-6 max-w-6xl">
              <SectionTitle title="Our Proven 6‑Step Journey" subtitle="A seamless path to a harmonious and prosperous space" />
              <div className="grid md:grid-cols-3 gap-8">
                {journeySteps.map((step, i) => (
                  <LuxuryTiltCard key={i} className="h-full">
                    <div className="bg-white p-8 rounded-3xl border border-prakash-gold/20 h-full">
                      <span className="text-5xl font-serif text-prakash-gold/30">{step.step}</span>
                      <h3 className="font-serif text-2xl text-nidra-indigo mt-4 mb-3">{step.title}</h3>
                      <p className="text-nidra-indigo/70">{step.desc}</p>
                    </div>
                  </LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>

          {services.map((service, index) => (
            <section key={service.id} id={service.slug} className={`py-24 ${index%2===0?'bg-white':'bg-vastu-stone'}`}>
              <div className="container mx-auto px-6 max-w-7xl">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${index%2!==0?'lg:flex-row-reverse':''}`}>
                  <div className={index%2!==0?'lg:order-2':''}>
                    <span className="text-sacred-saffron font-sans text-sm uppercase tracking-widest">{service.tagline}</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo mt-4 mb-6">{service.title}</h2>
                    <p className="text-lg text-nidra-indigo/80 leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-4 mb-8">
                      {service.benefits?.map((b,i)=><li key={i} className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-prakash-gold mt-2"/><span className="font-sans text-nidra-indigo">{b}</span></li>)}
                    </ul>
                    <div className="bg-prakash-gold/5 border-l-4 border-prakash-gold p-6 rounded-r-xl mb-8">
                      <p className="font-serif text-nidra-indigo italic">"{service.use_case}"</p>
                      <p className="text-sm text-prakash-gold mt-2">— Real Client Case Study</p>
                    </div>
                    <HeroButton href={`/contact?service=${service.slug}`}>Request {service.title} Consultation</HeroButton>
                  </div>
                  <div className={index%2!==0?'lg:order-1':''}>
                    <LuxuryTiltCard>
                      <MediaContainer src={service.image_url} type="image" fallbackKey="luxuryLivingRoom" className="w-full h-[400px] object-cover rounded-3xl shadow-luxury-xl" />
                    </LuxuryTiltCard>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="py-32 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Transform Your Space?</motion.h2>
            <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">Book a private consultation with Acharya and unlock the hidden potential of your environment.</p>
            <HeroButton href="/contact">Schedule Your Consultation</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
