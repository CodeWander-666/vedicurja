'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BrandCarousel3D.css';

const brands = ['Mahindra', 'TCS', 'Adani', 'Times of India', 'P&G', 'Tata', 'Reliance'];

export function GlobalTrust() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.section ref={ref} style={{ y }} className="py-20 bg-white/40 backdrop-blur-sm border-y border-prakash-gold/20">
      <div className="container mx-auto px-6">
        <h2 className="text-center font-serif text-3xl text-nidra-indigo mb-8">Trusted by Global Publications & Enterprises</h2>
        <div className="carousel-3d-container">
          <div className="carousel-3d-track">
            {brands.concat(brands).map((brand, i) => (
              <div key={i} className={`carousel-3d-card brand-${brand.toLowerCase().replace(/\s/g,'')}`}>
                <div className="card-content">
                  <span className="brand-name">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default GlobalTrust;
