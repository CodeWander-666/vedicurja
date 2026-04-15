'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ServiceCard3D } from './ServiceCard3D';

const services = [
  {
    title: 'Residential Vastu',
    description: 'Harmonise your home',
    icon: '🏡',
    benefits: ['Better Sleep', 'Family Harmony', 'Financial Flow'],
    href: '/services/residential',
    colorGradient: 'linear-gradient(145deg, #F9F6F0 0%, #E8B960 100%)',
  },
  {
    title: 'Commercial Vastu',
    description: 'Align your business',
    icon: '🏢',
    benefits: ['Revenue Growth', 'Team Cohesion', 'Client Retention'],
    href: '/services/commercial',
    colorGradient: 'linear-gradient(145deg, #F9F6F0 0%, #C88A5D 100%)',
  },
  {
    title: 'Land & Plot Selection',
    description: 'Auspicious foundations',
    icon: '🌍',
    benefits: ['Ideal Orientation', 'Soil Analysis', 'Future Prospects'],
    href: '/services/land',
    colorGradient: 'linear-gradient(145deg, #F9F6F0 0%, #D4A373 100%)',
  },
];

export function SacredServices() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <motion.h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo text-center mb-4">
          Sacred Services for Modern Living
        </motion.h2>
        <p className="text-center text-nidra-indigo/60 max-w-2xl mx-auto mb-16">
          Ancient Vastu principles applied with contemporary precision
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              className="flex justify-center"
            >
              <ServiceCard3D
                title={s.title}
                description={s.description}
                icon={s.icon}
                benefits={s.benefits}
                href={s.href}
                colorGradient={s.colorGradient}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <Link href="/services" className="text-prakash-gold font-medium hover:underline">
            View All Services →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
export default SacredServices;