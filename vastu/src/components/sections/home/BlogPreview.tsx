'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';
import { LuxuryButton } from '@/components/global/LuxuryButton';

const articles = [
  {
    title: 'Vastu for West-Facing Homes: Myths & Facts',
    excerpt: 'Discover why west-facing entrances can be highly auspicious when properly aligned.',
    date: 'April 2, 2026',
    readTime: '5 min read',
    image: '🏡',
  },
  {
    title: 'The Science Behind the Vastu Purusha Mandala',
    excerpt: 'Exploring the geometric principles that underpin ancient Vastu knowledge.',
    date: 'March 28, 2026',
    readTime: '8 min read',
    image: '📐',
  },
  {
    title: 'How Vastu Differs from Feng Shui',
    excerpt: 'Understanding the distinct philosophies of these two ancient systems.',
    date: 'March 15, 2026',
    readTime: '6 min read',
    image: '☯️',
  },
];

export function BlogPreview() {
  const { play, playSpatial } = useSound();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-2">
              From the Archives
            </h2>
            <p className="font-sans text-lg text-[#1A2A3A]/60">
              Ancient wisdom for modern challenges
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <LuxuryButton href="/insights">
              View all articles
            </LuxuryButton>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                playSpatial('hoverCard', (rect.left+rect.width/2)/window.innerWidth, (rect.top+rect.height/2)/window.innerHeight);
              }}
            >
              <div className="text-6xl mb-4 bg-[#F9F6F0] p-6 rounded-2xl group-hover:scale-105 transition-transform">
                {article.image}
              </div>
              <div className="flex gap-2 text-xs text-[#1A2A3A]/50 mb-2">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="font-serif text-xl text-[#1A2A3A] mb-2 group-hover:text-[#C88A5D] transition-colors">
                {article.title}
              </h3>
              <p className="font-sans text-sm text-[#1A2A3A]/60">{article.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default BlogPreview;
