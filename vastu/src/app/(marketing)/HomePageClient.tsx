'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { MediaContainer } from '@/components/ui/MediaContainer';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { HomeSection } from '@/types/admin';

const LuxuryCursor = dynamic(() => import('@/components/global/LuxuryCursor'), { ssr: false });
const SoundController = dynamic(() => import('@/components/global/SoundController'), { ssr: false });
const BrandCarousel3D = dynamic(() => import('@/components/sections/home/BrandCarousel3D'), { ssr: false });
const ServicesGrid = dynamic(() => import('@/components/sections/home/ServicesGrid'), { ssr: false });
const LineageSection = dynamic(() => import('@/components/sections/home/LineageSection'), { ssr: false });
const GlobalSection = dynamic(() => import('@/components/sections/home/GlobalSection'), { ssr: false });
const TestimonialsSlider = dynamic(() => import('@/components/sections/home/TestimonialsSlider'), { ssr: false });
const FreeToolsSection = dynamic(() => import('@/components/sections/home/FreeToolsSection'), { ssr: false });
const BlogPreview = dynamic(() => import('@/components/sections/home/BlogPreview'), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/home/CTASection'), { ssr: false });

export default function HomePageClient() {
  const { play } = useSound();
  const { t } = useLanguage();
  const { items: homeSections } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const getSection = (key: string) => homeSections.find(s => s.section_key === key);
  const hero = getSection('hero');

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <LuxuryHeader />
      <SmoothScroll>
        <main className="relative z-10">
          <section id="hero" className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
            <VideoBackground src="/videos/hero-background.mp4" fallbackKey="vastuConsultation" overlayOpacity="30" />
            <div className="text-center max-w-5xl relative z-10">
              <LuxuryTiltCard className="inline-block p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30" glareEnabled={false}>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight drop-shadow-lg"
                  onMouseEnter={() => play('softGlow')}
                >
                  {hero?.title || t('hero.title1')}<br />
                  <span className="vedic-gradient-text drop-shadow-md">{hero?.subtitle || t('hero.title2')}</span>
                </motion.h1>
              </LuxuryTiltCard>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 drop-shadow"
              >
                {hero?.description || t('hero.subtitle')}
              </motion.p>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <HeroButton href={hero?.button_link || '#services'}>{hero?.button_text || t('hero.cta')}</HeroButton>
              </motion.div>
            </div>
          </section>
          <div className="relative bg-vastu-parchment">
            <BrandCarousel3D />
            <div id="services"><ServicesGrid /></div>
            <div id="lineage"><LineageSection /></div>
            <div id="global"><GlobalSection /></div>
            <div id="testimonials"><TestimonialsSlider /></div>
            <div id="tools"><FreeToolsSection /></div>
            <div id="insights"><BlogPreview /></div>
            <div id="contact"><CTASection /></div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
