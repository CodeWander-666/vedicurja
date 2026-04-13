'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { HeroButton } from '@/components/global/HeroButton';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

const tools = [
  {
    id: 'kundali',
    name: 'AI Kundali',
    tagline: 'Your Cosmic Blueprint, Decoded',
    description: 'Generate a precise Vedic birth chart using advanced astronomical algorithms. Understand your planetary influences, ascendant, moon sign, and Nakshatra in seconds.',
    features: [
      'Accurate ascendant and planetary positions',
      'Detailed Nakshatra and Dasha analysis',
      'Personalized remedial recommendations',
      'Downloadable PDF report',
    ],
    image: 'https://images.pexels.com/photos/374044/pexels-photo-374044.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#C88A5D',
  },
  {
    id: 'vastu-scan',
    name: 'AI Vastu Scan',
    tagline: 'Optimize Your Space with AI Precision',
    description: 'Upload your floor plan and receive an instant directional energy audit. Our AI detects zones, identifies Vastu defects, and suggests non‑destructive remedies.',
    features: [
      'Instant zone detection from uploaded images',
      '16‑zone Vastu Purusha Mandala overlay',
      'Color‑coded energy heatmaps',
      'Remedial measures without demolition',
    ],
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#8B5A2B',
  },
  {
    id: 'name-suggestion',
    name: 'AI Name Suggestion',
    tagline: 'Auspicious Names Aligned with Your Stars',
    description: 'Discover names that resonate with your birth Nakshatra and numerology. Perfect for newborns, business ventures, or personal rebranding.',
    features: [
      'Nakshatra‑based syllable matching',
      'Chaldean and Pythagorean numerology',
      '108+ auspicious name suggestions',
      'Meaning and origin included',
    ],
    image: 'https://images.pexels.com/photos/2674052/pexels-photo-2674052.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#1985A1',
  },
];

function TiltImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tilt-container">
      <div className="tilt-inner">
        <Image src={src} alt={alt} fill className="object-cover rounded-3xl" />
      </div>
    </div>
  );
}

export default function FreeToolsPage() {
  const { play } = useSound();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
          <GradientBackground />
          
          {/* HERO SECTION */}
          <motion.section
            style={{ opacity: heroOpacity }}
            className="relative min-h-screen flex items-center justify-center px-6 pt-24"
          >
            <div className="text-center max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1A2A3A] mb-6 leading-tight"
              >
                Ancient Wisdom.<br />
                <span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">
                  AI‑Powered Precision.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-xl md:text-2xl text-[#1A2A3A]/70 max-w-3xl mx-auto mb-12"
              >
                Trusted by seekers worldwide—experience the most advanced free Vedic AI tools available.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <HeroButton href="#tools">Explore Tools</HeroButton>
              </motion.div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-[#C88A5D]/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#C88A5D] rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </motion.section>

          {/* TRUST BANNER */}
          <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-[#C88A5D]/20">
            <div className="container mx-auto px-6 text-center">
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#1A2A3A]/50 mb-6">Globally Recognized</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {['500k+ Reports Generated', '150+ Countries', '4.9 ★ Rating'].map(stat => (
                  <span key={stat} className="font-serif text-2xl md:text-3xl text-[#1A2A3A]/60">
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* DETAILED TOOL SECTIONS */}
          <div id="tools">
            {tools.map((tool, index) => (
              <section key={tool.id} className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F6F0]'}`}>
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                      <span className="text-[#C88A5D] font-sans text-sm uppercase tracking-widest">{tool.tagline}</span>
                      <h2 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mt-4 mb-6">{tool.name}</h2>
                      <p className="text-lg text-[#1A2A3A]/70 leading-relaxed mb-8">{tool.description}</p>
                      <ul className="space-y-4 mb-8">
                        {tool.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#C88A5D] mt-2" />
                            <span className="font-sans text-[#1A2A3A]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/free-tools/${tool.id}`}
                        onClick={() => play('clickPrimary')}
                        className="inline-block bg-[#C88A5D] hover:bg-[#A06A3D] text-white px-8 py-4 rounded-full font-sans text-sm font-medium transition-all shadow-lg"
                      >
                        Try {tool.name} Free
                      </Link>
                    </div>
                    <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                      <TiltImage src={tool.image} alt={tool.name} />
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* FAQ SECTION */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-16"
              >
                Frequently Asked Questions
              </motion.h2>
              <div className="space-y-6">
                {[
                  { q: 'Are these tools really free?', a: 'Yes, all basic features are completely free. Advanced reports are available for a small fee.' },
                  { q: 'How accurate is the AI Kundali?', a: 'We use Swiss Ephemeris, the same astronomical data used by professional astrologers worldwide.' },
                  { q: 'Can I use the Vastu Scan on my phone?', a: 'Absolutely. Our tool works on any device with a camera or file upload capability.' },
                  { q: 'How many names does the Name Suggestion tool provide?', a: 'The free version provides 3 auspicious names; the paid version provides 108+ names with detailed meanings.' },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-[#C88A5D]/20 pb-6"
                  >
                    <h4 className="font-serif text-xl text-[#1A2A3A] mb-2">{faq.q}</h4>
                    <p className="font-sans text-[#1A2A3A]/70">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-32 bg-gradient-to-r from-[#1A2A3A] to-[#1A2A3A]/90 text-white">
            <div className="container mx-auto px-6 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="font-serif text-4xl md:text-6xl mb-6"
              >
                Ready to Unlock Your Cosmic Potential?
              </motion.h2>
              <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">
                Join thousands who have discovered clarity through our AI‑powered Vedic tools.
              </p>
              <HeroButton href="#tools">Start Your Free Journey</HeroButton>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>

      {/* CSS for 3D Tilt Effect */}
      <style jsx global>{`
        .tilt-container {
          perspective: 1000px;
          width: 100%;
          height: 500px;
          border-radius: 24px;
        }
        .tilt-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
          transform-style: preserve-3d;
          border-radius: 24px;
          box-shadow: 0 30px 40px -15px rgba(0,0,0,0.2);
        }
        .tilt-container:hover .tilt-inner {
          transform: rotateX(5deg) rotateY(-8deg);
        }
      `}</style>
    </>
  );
}
