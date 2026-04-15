'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Existing components
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { FreeToolCard3D } from '@/components/sections/tools/FreeToolCard3D';
import { TestimonialsSlider } from '@/components/sections/home/TestimonialsSlider';
import { MagneticButton } from '@/components/global/MagneticButton';

// Hooks
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { Testimonial } from '@/types/admin';

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

interface ToolComparison {
  category: string;
  kundali: string;
  vastu: string;
  name: string;
}

// ----------------------------------------------------------------------
// Section 1: Hero
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment to-white"
    >
      {/* Animated sacred geometry (CSS) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
          className="mandala-3d"
        >
          <div className="mandala-ring ring1" />
          <div className="mandala-ring ring2" />
          <div className="mandala-ring ring3" />
          <div className="mandala-core">🕉️</div>
        </motion.div>
      </div>

      <motion.div style={{ y }} className="container mx-auto px-6 relative z-10 text-center">
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

      <style jsx>{`
        .mandala-3d {
          position: relative;
          width: min(80vw, 800px);
          height: min(80vw, 800px);
          transform-style: preserve-3d;
        }
        .mandala-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(232, 185, 96, 0.3);
          box-shadow: 0 0 30px rgba(200, 138, 93, 0.2), inset 0 0 20px rgba(232, 185, 96, 0.1);
        }
        .ring1 { transform: rotateX(20deg) rotateY(10deg); }
        .ring2 { transform: rotateX(40deg) rotateY(30deg) scale(0.8); border-color: rgba(193, 0, 0, 0.2); }
        .ring3 { transform: rotateX(60deg) rotateY(50deg) scale(0.6); border-color: rgba(255, 153, 51, 0.2); }
        .mandala-core {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) translateZ(30px);
          font-size: 5rem;
          color: #E8B960;
          text-shadow: 0 0 30px #C88A5D;
        }
      `}</style>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Section 2: The Three Pillars (Tool Cards)
// ----------------------------------------------------------------------
const tools = [
  {
    name: 'AI Kundali',
    description: 'Vedic birth chart with nakshatra and planetary positions',
    icon: '🔮',
    href: '/free-tools/kundali',
    color: '#FF9933',
    rating: 4.9,
    users: '2.5k+',
  },
  {
    name: 'AI Vastu Scan',
    description: '16‑zone energy analysis with personalized remedies',
    icon: '🏠',
    href: '/free-tools/vastu-scan',
    color: '#C10000',
    rating: 4.8,
    users: '1.8k+',
  },
  {
    name: 'Name Suggestion',
    description: 'Auspicious syllables based on 27 Nakshatras',
    icon: '✨',
    href: '/free-tools/name-suggestion',
    color: '#E8B960',
    rating: 4.9,
    users: '3.2k+',
  },
];

function ToolsGridSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      id="tools-grid"
      ref={ref}
      style={{ opacity, y }}
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <motion.h2 className="text-center font-serif text-4xl md:text-5xl text-nidra-indigo mb-4">
          The Three Pillars
        </motion.h2>
        <p className="text-center text-nidra-indigo/60 max-w-2xl mx-auto mb-16">
          Choose your path to Vedic wisdom – all free, all powerful
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto place-items-center">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full flex flex-col items-center"
            >
              <FreeToolCard3D {...tool} />
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm font-medium text-nidra-indigo/70">
                  ★ {tool.rating}
                </span>
                <span className="text-sm text-nidra-indigo/50">•</span>
                <span className="text-sm text-nidra-indigo/70">{tool.users} reports</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Section 3: Accuracy & Trust Indicators
// ----------------------------------------------------------------------
const stats: StatItem[] = [
  {
    label: 'Kundali Accuracy',
    value: 92,
    suffix: '%',
    description: 'Match with professional Jyotish software',
  },
  {
    label: 'Vastu Scan Precision',
    value: 500,
    suffix: '+',
    description: 'Validated against real floor plans',
  },
  {
    label: 'Name Syllable Source',
    value: 100,
    suffix: '%',
    description: 'Direct from Brihat Parashara Hora Shastra',
  },
];

function AccuracySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.section ref={ref} style={{ y }} className="py-24 bg-vastu-stone/30">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-center font-serif text-4xl text-nidra-indigo mb-16">
          Rooted in Authenticity
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-md rounded-3xl p-8 text-center border border-prakash-gold/30 shadow-lg"
            >
              <div className="w-32 h-32 mx-auto mb-6">
                <CircularProgressbar
                  value={stat.value}
                  text={`${stat.value}${stat.suffix}`}
                  styles={buildStyles({
                    pathColor: '#C88A5D',
                    textColor: '#1A2A3A',
                    trailColor: '#F4EFE6',
                    textSize: '20px',
                  })}
                />
              </div>
              <h3 className="font-serif text-xl text-nidra-indigo mb-2">{stat.label}</h3>
              <p className="text-sm text-nidra-indigo/60">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Section 4: Global User Testimonials
// ----------------------------------------------------------------------
function TestimonialsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Fallback testimonials if none in Supabase
  const fallbackTestimonials: Testimonial[] = [
    {
      id: '1',
      client_name: 'Priya Sharma',
      location: 'London, UK',
      project_type: 'free_tool',
      rating: 5,
      content: 'My Kundali matched my Pandit\'s reading exactly! Incredible accuracy.',
      avatar_url: null,
      verified: true,
      order_index: 1,
      is_published: true,
    },
    {
      id: '2',
      client_name: 'James Whitmore',
      location: 'New York, USA',
      project_type: 'free_tool',
      rating: 5,
      content: 'The Vastu scan identified a problem I had felt for years. Remedies worked!',
      avatar_url: null,
      verified: true,
      order_index: 2,
      is_published: true,
    },
    {
      id: '3',
      client_name: 'Ananya Patel',
      location: 'Dubai, UAE',
      project_type: 'free_tool',
      rating: 5,
      content: 'Found the perfect name for my newborn. Thank you Acharya!',
      avatar_url: null,
      verified: true,
      order_index: 3,
      is_published: true,
    },
  ];

  const { items: testimonials } = useRealtimeContent<Testimonial>('testimonials', 'order_index');
  const displayTestimonials = testimonials.filter(t => t.project_type === 'free_tool' && t.is_published);
  const finalTestimonials = displayTestimonials.length > 0 ? displayTestimonials : fallbackTestimonials;

  return (
    <motion.section ref={ref} style={{ opacity }} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-center font-serif text-4xl text-nidra-indigo mb-4">
          Words of Gratitude
        </motion.h2>
        <p className="text-center text-nidra-indigo/60 mb-16">
          Hear from seekers who found clarity through our tools
        </p>
        <TestimonialsSlider testimonials={finalTestimonials} />
      </div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Section 5: Tool Comparison
// ----------------------------------------------------------------------
const comparisonRows: ToolComparison[] = [
  { category: 'Best for', kundali: 'Life path insights', vastu: 'Space energy analysis', name: 'Newborn / business naming' },
  { category: 'Input required', kundali: 'Birth date, time, place', vastu: 'Floor plan image + orientation', name: 'Nakshatra or birth details' },
  { category: 'Output delivered', kundali: 'Chart + Nakshatra', vastu: '16‑zone scores + remedies', name: '4 auspicious syllables' },
  { category: 'Time to result', kundali: 'Instant', vastu: '~10 seconds', name: 'Instant' },
  { category: 'Premium upgrade', kundali: '20‑page full report', vastu: 'Personalized consultation', name: '108+ full names' },
];

function ComparisonSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section ref={ref} style={{ y }} className="py-24 bg-gradient-to-b from-white to-vastu-parchment">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2 className="text-center font-serif text-4xl text-nidra-indigo mb-4">
          Find Your Perfect Tool
        </motion.h2>
        <p className="text-center text-nidra-indigo/60 mb-16">
          Compare features and choose the tool that resonates with your need
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-prakash-gold/30">
                <th className="py-4 px-6 text-left font-serif text-lg text-nidra-indigo">Category</th>
                <th className="py-4 px-6 text-center font-serif text-lg text-sacred-saffron">🔮 AI Kundali</th>
                <th className="py-4 px-6 text-center font-serif text-lg text-kumkuma-red">🏠 AI Vastu Scan</th>
                <th className="py-4 px-6 text-center font-serif text-lg text-prakash-gold">✨ Name Suggestion</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <motion.tr
                  key={row.category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-prakash-gold/10 hover:bg-prakash-gold/5 transition"
                >
                  <td className="py-4 px-6 font-medium text-nidra-indigo">{row.category}</td>
                  <td className="py-4 px-6 text-center text-nidra-indigo/70">{row.kundali}</td>
                  <td className="py-4 px-6 text-center text-nidra-indigo/70">{row.vastu}</td>
                  <td className="py-4 px-6 text-center text-nidra-indigo/70">{row.name}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Section 6: Final CTA & Global Reach
// ----------------------------------------------------------------------
function FinalCTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.section ref={ref} style={{ scale }} className="relative py-32 md:py-40 overflow-hidden bg-nidra-indigo text-white">
      <div className="absolute inset-0 opacity-20">
        <motion.div
          style={{ rotate: globeRotate }}
          className="globe-container absolute inset-0 flex items-center justify-center"
        >
          <div className="globe">
            <div className="globe-sphere" style={{ backgroundImage: 'url(/images/home/globe-texture.jpg)' }} />
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2 className="font-serif text-4xl md:text-6xl mb-6">
          Join 15,000+ Seekers Worldwide
        </motion.h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
          From New York to Mumbai, our tools have guided thousands towards clarity and harmony.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Try All Tools Free
            </button>
          </MagneticButton>
          <MagneticButton className="border-2 border-white text-white px-10 py-5 rounded-full text-lg hover:bg-white/10">
            <Link href="/bookings">Book Virtual Consult</Link>
          </MagneticButton>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/60">
          <span>🇺🇸 USA</span> <span>🇮🇳 India</span> <span>🇦🇪 UAE</span> <span>🇬🇧 UK</span> <span>🇦🇺 Australia</span>
        </div>
      </div>

      <style jsx>{`
        .globe-container {
          perspective: 1000px;
        }
        .globe {
          width: 500px;
          height: 500px;
          position: relative;
          transform-style: preserve-3d;
        }
        .globe-sphere {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-size: cover;
          box-shadow: 0 0 60px rgba(232,185,96,0.5), inset 0 0 50px rgba(0,0,0,0.5);
        }
      `}</style>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Main Page Component
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
          <AccuracySection />
          <TestimonialsSection />
          <ComparisonSection />
          <FinalCTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
