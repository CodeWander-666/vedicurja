'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { useSound } from '@/hooks/useSound';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { FreeTool } from '@/types/admin';
import { media } from '@/lib/mediaConfig';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

const premiumSteps = [
  { title: 'Free Basic Analysis', desc: 'Get a glimpse of your cosmic blueprint with our AI tools.', icon: '🔮' },
  { title: 'Identify Key Areas', desc: 'Understand critical aspects affecting your space.', icon: '📍' },
  { title: 'Premium Report Preview', desc: 'See a sample of in‑depth insights available.', icon: '📄' },
  { title: 'Personalized Remedies', desc: 'Unlock detailed, actionable recommendations.', icon: '✨' },
  { title: 'Expert Review', desc: 'Have your report enhanced by Acharya himself.', icon: '🧘' },
  { title: 'Ongoing Support', desc: 'Access priority support and follow‑ups.', icon: '🤝' },
];

export default function FreeToolsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const { play } = useSound();
  const { items: tools } = useRealtimeContent<FreeTool>('free_tools', 'order_index');

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main ref={containerRef} className="relative z-10">
          <VideoBackground src="/videos/numerology.mp4" fallbackKey="numerology" overlayOpacity="40" />
          <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="text-center max-w-5xl relative z-10">
              <LuxuryTiltCard className="inline-block p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30">
                <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg">
                  Ancient Wisdom.<br /><span className="vedic-gradient-text">AI‑Powered Precision.</span>
                </motion.h1>
              </LuxuryTiltCard>
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }} className="font-sans text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
                Trusted by seekers worldwide—experience the most advanced free Vedic AI tools.
              </motion.p>
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.6 }}>
                <HeroButton href="#tools">Explore Tools</HeroButton>
              </motion.div>
            </div>
          </motion.section>

          <section className="py-24 bg-vastu-parchment">
            <div className="container mx-auto px-6 max-w-6xl">
              <SectionTitle title="Your Path to Premium Insights" subtitle="Start free, upgrade for life‑changing clarity" />
              <div className="grid md:grid-cols-3 gap-6">
                {premiumSteps.map((step, i) => (
                  <LuxuryTiltCard key={i} className="h-full">
                    <div className="bg-white p-6 rounded-2xl border border-prakash-gold/20 shadow-luxury-md h-full">
                      <span className="text-4xl">{step.icon}</span>
                      <h3 className="font-serif text-xl text-nidra-indigo mt-4 mb-2">{step.title}</h3>
                      <p className="text-nidra-indigo/70 text-sm">{step.desc}</p>
                    </div>
                  </LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>

          <div id="tools">
            {tools.map((tool, index) => (
              <section key={tool.id} className={`py-24 ${index%2===0?'bg-white':'bg-vastu-stone'}`}>
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${index%2!==0?'lg:flex-row-reverse':''}`}>
                    <div className={index%2!==0?'lg:order-2':''}>
                      <span className="text-sacred-saffron font-sans text-sm uppercase tracking-widest">{tool.tagline}</span>
                      <h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo mt-4 mb-6">{tool.title}</h2>
                      <p className="text-lg text-nidra-indigo/80 leading-relaxed mb-8">{tool.description}</p>
                      <ul className="space-y-4 mb-8">
                        {tool.features?.map((f,i)=><li key={i} className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-prakash-gold mt-2"/><span className="font-sans text-nidra-indigo">{f}</span></li>)}
                      </ul>
                      <Link href={`/free-tools/${tool.tool_key}`} onClick={()=>play('clickPrimary')} className="luxury-button inline-block">Try {tool.title} Free</Link>
                    </div>
                    <div className={index%2!==0?'lg:order-1':''}>
                      <LuxuryTiltCard>
                        <MediaContainer src={tool.image_url} type="image" fallbackKey="kundaliChart" className="w-full h-[300px] object-cover rounded-3xl shadow-luxury-xl" />
                      </LuxuryTiltCard>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="py-32 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Unlock Your Cosmic Potential?</motion.h2>
            <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">Join thousands who have discovered clarity through our AI‑powered Vedic tools.</p>
            <HeroButton href="/contact">Start Your Free Journey</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
