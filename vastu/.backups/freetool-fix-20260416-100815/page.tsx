'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { MagneticButton } from '@/components/global/MagneticButton';
import FreeToolCard3D from '@/components/sections/tools/FreeToolCard3D';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { FreeTool } from '@/types/admin';

// ----------------------------------------------------------------------
// Hero Section with Loader Mandala
// ----------------------------------------------------------------------
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment via-white to-vastu-parchment"
    >
      <Mandala3D />
      <FloatingParticles />
      <motion.div style={{ y }} className="container mx-auto px-6 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sacred-saffron uppercase tracking-[0.3em] text-sm mb-4 block"
        >
          Free Vedic Tools
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-6 leading-tight"
        >
          <span className="vedic-gradient-text">Sacred Tools,</span>
          <br />
          <span className="text-prakash-gold">Modern Precision</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-sans text-lg md:text-xl text-nidra-indigo/70 max-w-2xl mx-auto mb-10"
        >
          Free, accurate, and trusted by seekers across 20+ countries.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton className="luxury-button">
            <button onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Tools
            </button>
          </MagneticButton>
          <MagneticButton className="bg-transparent border-2 border-prakash-gold text-nidra-indigo hover:bg-prakash-gold/10 px-8 py-4 rounded-full">
            <Link href="/contact">Consult Acharya</Link>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Tools Grid Section
// ----------------------------------------------------------------------
function ToolsGridSection() {
  const { items: tools } = useRealtimeContent<FreeTool>('free_tools', 'order_index');
  const publishedTools = tools.filter(t => t.is_published);

  return (
    <section id="tools-grid" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">The Three Pillars</h2>
        <p className="text-center text-nidra-indigo/60 mb-16">Choose your path to Vedic wisdom – all free, all powerful</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto place-items-center">
          {publishedTools.map((tool) => (
            <FreeToolCard3D
              key={tool.id}
              name={tool.title}
              description={tool.description}
              icon={'🔮'}
              href={`/free-tools/${tool.tool_key}`}
              color={'#FF9933'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Final CTA
// ----------------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="py-32 bg-nidra-indigo text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-6xl mb-6">Ready for Deeper Insight?</h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
          Book a private consultation with Acharya KK Nagaich ji for personalised guidance.
        </p>
        <Link href="/contact" className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg transition">
          Consult Acharya
        </Link>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function FreeToolsPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <HeroSection />
          <ToolsGridSection />
          <FinalCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
