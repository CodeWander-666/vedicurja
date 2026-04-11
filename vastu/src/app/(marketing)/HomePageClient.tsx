'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroButton } from '@/components/global/HeroButton';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

const LuxuryGradientBackground = dynamic(() => import('@/components/global/LuxuryGradientBackground'), { ssr: false });
const LuxuryCursor = dynamic(() => import('@/components/global/LuxuryCursor'), { ssr: false });
const SoundController = dynamic(() => import('@/components/global/SoundController'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/global/ScrollSmoother'), { ssr: false });
const BrandCarousel3D = dynamic(() => import('@/components/sections/home/BrandCarousel3D'), { ssr: false });
const ServicesGrid = dynamic(() => import('@/components/sections/home/ServicesGrid'), { ssr: false });
const LineageSection = dynamic(() => import('@/components/sections/home/LineageSection'), { ssr: false });
const GlobalSection = dynamic(() => import('@/components/sections/home/GlobalSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/sections/home/TestimonialsSection'), { ssr: false });
const FreeToolsSection = dynamic(() => import('@/components/sections/home/FreeToolsSection'), { ssr: false });
const BlogPreview = dynamic(() => import('@/components/sections/home/BlogPreview'), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/home/CTASection'), { ssr: false });

export default function HomePageClient() {
  const { play } = useSound();
  const { t } = useLanguage();

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
          <section id="hero" className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
            <LuxuryGradientBackground />
            <div className="text-center max-w-5xl relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1A2A3A] mb-8 leading-tight drop-shadow-sm"
                onMouseEnter={() => play('softGlow')}
              >
                {t('hero.title1')}<br />
                <span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">
                  {t('hero.title2')}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-xl md:text-2xl text-[#1A2A3A]/80 max-w-2xl mx-auto mb-12"
                onMouseEnter={() => play('whisper')}
              >
                {t('hero.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <HeroButton href="#services">
                  {t('hero.cta')}
                </HeroButton>
              </motion.div>
            </div>
          </section>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF9] to-[#F5EDE3] -z-10" />
            <div className="relative z-10">
              <BrandCarousel3D />
              <div id="services"><ServicesGrid /></div>
              <div id="lineage"><LineageSection /></div>
              <div id="global"><GlobalSection /></div>
              <div id="testimonials"><TestimonialsSection /></div>
              <div id="tools"><FreeToolsSection /></div>
              <div id="insights"><BlogPreview /></div>
              <div id="contact"><CTASection /></div>
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
