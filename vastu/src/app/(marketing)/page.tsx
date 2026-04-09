'use client';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/global/AmbientBackground';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { LineageSection } from '@/components/sections/home/LineageSection';
import { GlobalSection } from '@/components/sections/home/GlobalSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { FreeToolsSection } from '@/components/sections/home/FreeToolsSection';

export default function HomePage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative">
          <AmbientBackground />
          
          {/* Hero */}
          <section className="relative h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1A2A3A] mb-8 leading-tight"
              >
                Ancient Wisdom.<br />
                <span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">
                  Modern Precision.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-xl md:text-2xl text-[#1A2A3A]/70 max-w-2xl mx-auto mb-12"
              >
                Guided by Acharya [Name], rooted in the sacred geometry of Uttar Pradesh.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a
                  href="/services"
                  className="inline-block bg-transparent border-2 border-[#C88A5D] text-[#C88A5D] px-12 py-4 rounded-full font-sans text-lg font-medium hover:bg-[#C88A5D] hover:text-white transition-all duration-300"
                >
                  Discover Your Space
                </a>
              </motion.div>
            </div>
          </section>

          {/* Trust Marquee */}
          <section className="py-16 bg-white/40 backdrop-blur-sm">
            <div className="container mx-auto text-center">
              <p className="font-sans text-[#1A2A3A]/50 uppercase tracking-[0.3em] text-sm mb-6">Featured In</p>
              <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                {['ArchDaily', 'Vogue India', 'Times of India', 'Dezeen'].map(b => (
                  <span key={b} className="font-serif text-2xl md:text-3xl text-[#1A2A3A]/40">{b}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-24 container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-16"
            >
              Our Sacred Offerings
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: 'Residential Vastu', desc: 'Harmonize your home with cosmic principles.' },
                { title: 'Commercial Vastu', desc: 'Align your business for abundance.' },
                { title: 'Energy Audit', desc: 'Identify energetic imbalances.' }
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-[#C88A5D]/10 hover:border-[#C88A5D]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#C88A5D]/20 to-[#E8B960]/20 rounded-2xl mb-6" />
                  <h3 className="font-serif text-2xl text-[#1A2A3A] mb-3">{service.title}</h3>
                  <p className="font-sans text-[#1A2A3A]/60">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Lineage Section */}
          <LineageSection />

          {/* Global Section */}
          <GlobalSection />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Free Tools */}
          <FreeToolsSection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
