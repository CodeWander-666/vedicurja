'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const posts = [
  { title: 'The Science of Directions', excerpt: 'Understanding the Vastu Purusha Mandala...', img: 'https://images.pexels.com/photos/674577/pexels-photo-674577.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { title: 'Remedies for South-West Defects', excerpt: 'Simple corrections for the master bedroom...', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { title: 'Numerology for Business Names', excerpt: 'Align your brand name with cosmic vibrations...', img: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export function SacredArchives() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section ref={ref} style={{ y }} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl text-nidra-indigo">Sacred Archives</h2>
            <p className="text-nidra-indigo/60">Wisdom from the Vedic tradition</p>
          </div>
          <Link href="/insights" className="text-prakash-gold hover:underline">View all articles →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-vastu-parchment rounded-2xl overflow-hidden shadow-md border border-prakash-gold/20"
            >
              <div className="h-48 overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl mb-2 group-hover:text-sacred-saffron">{post.title}</h3>
                <p className="text-sm text-nidra-indigo/60">{post.excerpt}</p>
                <span className="inline-block mt-4 text-prakash-gold text-sm font-medium">Read More →</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
export default SacredArchives;
