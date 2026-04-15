'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useSound } from '@/hooks/useSound';

interface ParallaxServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  features: string[];
  reverse: boolean;
}

export default function ParallaxServiceSection({
  id, title, subtitle, description, image, video, features, reverse
}: ParallaxServiceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const { play } = useSound();

  return (
    <motion.section ref={containerRef} id={id} style={{ opacity }} className={`py-24 overflow-hidden ${reverse ? 'bg-white' : 'bg-[#F9F6F0]'}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#C88A5D] font-sans text-sm uppercase tracking-wider">{subtitle}</motion.span>
            <motion.h2 initial={{ opacity: 0, x: reverse ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mt-4 mb-6">{title}</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-lg text-[#1A2A3A]/70 leading-relaxed mb-8">{description}</motion.p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div key={feature} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3" onMouseEnter={() => play('hoverSlide')}>
                  <div className="w-2 h-2 rounded-full bg-[#C88A5D]" />
                  <span className="font-sans text-[#1A2A3A]">{feature}</span>
                </motion.div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => play('clickPrimary')} className="bg-[#C88A5D] hover:bg-[#A06A3D] text-white px-8 py-4 rounded-full font-sans text-sm font-medium shadow-lg">
              Request {title} Consultation
            </motion.button>
          </div>
          <motion.div style={{ y }} className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl ${reverse ? 'lg:order-1' : ''}`}>
            {video ? (
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" poster={image}>
                <source src={video} type="video/mp4" />
              </video>
            ) : (
              <Image src={image} alt={title} fill className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
