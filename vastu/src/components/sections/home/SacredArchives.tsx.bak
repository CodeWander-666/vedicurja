'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  featured_image?: string;
  slug: string;
  is_published: boolean;
}

const fallbackPosts: BlogPost[] = [
  { id: '1', title: 'The Science of Directions', excerpt: 'Understanding the Vastu Purusha Mandala...', slug: 'vastu-purusha-mandala-science', is_published: true },
  { id: '2', title: 'Remedies for South-West Defects', excerpt: 'Simple corrections for the master bedroom...', slug: 'vastu-south-west-remedies', is_published: true },
  { id: '3', title: 'Numerology for Business Names', excerpt: 'Align your brand name with cosmic vibrations...', slug: 'numerology-business-names', is_published: true },
];

export function SacredArchives() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const { items } = useRealtimeContent<BlogPost>('blog_posts', 'published_at', false);
  const posts = items.filter(p => p.is_published).slice(0, 3);
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

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
          {displayPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-vastu-parchment rounded-2xl overflow-hidden shadow-md border border-prakash-gold/20"
            >
              <Link href={`/insights/post?slug=${post.slug || '#'}` || '#'}>
                <div className="h-48 overflow-hidden">
                  <img src={post.featured_image || 'https://images.pexels.com/photos/674577/pexels-photo-674577.jpeg?auto=compress&cs=tinysrgb&w=400'} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2 group-hover:text-sacred-saffron">{post.title}</h3>
                  <p className="text-sm text-nidra-indigo/60">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-prakash-gold text-sm font-medium">Read More →</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
export default SacredArchives;
