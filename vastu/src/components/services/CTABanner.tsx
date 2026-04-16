'use client';
import { motion } from 'framer-motion';
import { HeroButton } from '@/components/global/HeroButton';
import { useSound } from '@/hooks/useSound';

export default function CTABanner() {
  const { play } = useSound();
  return (
    <section className="py-32 bg-gradient-to-r from-[#1A2A3A] to-[#1A2A3A]/90 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Transform Your Space?</motion.h2>
        <p className="font-sans text-xl text-white/70 max-w-3xl mx-auto mb-10">Book a private consultation with Acharya KK Nagaich ji and discover how VedicUrja can unlock the hidden potential of your environment.</p>
        <HeroButton href="/contact">Schedule Your Consultation</HeroButton>
      </div>
    </section>
  );
}
