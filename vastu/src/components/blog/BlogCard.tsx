'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/types/admin';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const imageUrl = post.featured_image || `/images/blog/${post.category?.toLowerCase().replace(/\s+/g, '-') || 'vastu-science'}.svg`;
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, rotateY: 3 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-prakash-gold/20 hover:border-prakash-gold/50 shadow-md hover:shadow-xl transition-all"
    >
      <Link href={`/insights/post?slug=${post.slug}`} className="block">
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => { e.currentTarget.src = '/images/blog/vastu-science.svg'; }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-prakash-gold uppercase tracking-wider">{post.category}</span>
            <span className="text-xs text-nidra-indigo/50">{post.read_time} min read</span>
          </div>
          <h3 className="font-serif text-xl text-nidra-indigo mb-3 group-hover:text-sacred-saffron transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-nidra-indigo/60 line-clamp-3 mb-4">{post.excerpt}</p>
          <span className="inline-flex items-center text-prakash-gold text-sm font-medium group-hover:translate-x-1 transition-transform">
            Read More <span className="ml-1">→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
