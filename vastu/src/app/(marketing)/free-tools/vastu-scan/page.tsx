'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import VastuScanProcessor from '@/components/vastu/VastuScanProcessor';

const LuxuryToolCard = dynamic(() => import('@/components/sections/tools/LuxuryToolCard'), { ssr: false });
const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

export default function VastuScanPage() {
  return (
    <>
      <Header />
      <main className="relative z-10 pt-32 pb-20 min-h-screen"><GradientBackground />
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl text-center text-[#1A2A3A] mb-8">AI Vastu Scan<span className="block text-xl font-sans text-[#C88A5D] mt-2">Optimize Your Space with AI Precision</span></motion.h1>
          <LuxuryToolCard title="Upload Floor Plan" icon="🏠"><VastuScanProcessor /></LuxuryToolCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
