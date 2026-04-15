'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  { year: '1978', title: 'Gurukul Initiation', desc: 'Acharya begins training under Guru Dev Sharma.' },
  { year: '1995', title: 'First International Consult', desc: 'Vastu for a palace in Rajasthan.' },
  { year: '2010', title: 'Global Expansion', desc: 'Clients in 15+ countries.' },
  { year: '2026', title: 'VedicUrja Launch', desc: 'Bringing Vastu to the digital age.' },
];

export function LineageTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <motion.section ref={ref} className="py-24 bg-gradient-to-b from-vastu-parchment to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-nidra-indigo text-center mb-16">A Legacy of Sacred Knowledge</h2>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-prakash-gold/30" />
          {milestones.map((m, i) => {
            const progressStart = i / milestones.length;
            const progressEnd = (i + 1) / milestones.length;
            const scale = useTransform(scrollYProgress, [progressStart, progressEnd], [0.8, 1.2]);
            const opacity = useTransform(scrollYProgress, [progressStart, progressStart+0.1, progressEnd-0.1, progressEnd], [0.3, 1, 1, 0.3]);
            return (
              <motion.div
                key={m.year}
                style={{ scale, opacity }}
                className={`flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-5/12" />
                <div className="w-2/12 flex justify-center">
                  <div className="w-6 h-6 bg-prakash-gold rounded-full border-4 border-white shadow-lg" />
                </div>
                <div className="w-5/12 p-6 bg-white rounded-2xl shadow-lg border border-prakash-gold/20">
                  <span className="text-2xl font-serif text-sacred-saffron">{m.year}</span>
                  <h3 className="font-serif text-xl mt-1">{m.title}</h3>
                  <p className="text-sm text-nidra-indigo/60">{m.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <a href="/story" className="luxury-button">Discover Our Full Story</a>
        </div>
      </div>
    </motion.section>
  );
}
export default LineageTimeline;
