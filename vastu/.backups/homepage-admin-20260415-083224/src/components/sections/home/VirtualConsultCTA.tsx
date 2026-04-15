'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export function VirtualConsultCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.section ref={ref} style={{ scale }} className="relative py-32 md:py-40 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src="https://videos.pexels.com/video-files/3196307/3196307-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-nidra-indigo/70" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.h2 className="font-serif text-4xl md:text-6xl mb-6">Connect with Acharya, Virtually</motion.h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">Secure video consultation from anywhere in the world. Experience personalised Vastu guidance.</p>
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link href="/bookings" className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg shadow-2xl transition-all">
            Book Virtual Consultation
          </Link>
        </motion.div>
        <div className="mt-8 text-white/60 text-sm">4.9 ★ (200+ consultations)</div>
      </div>
    </motion.section>
  );
}
export default VirtualConsultCTA;
