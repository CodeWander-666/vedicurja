import GlobalLoader from '@/components/ui/GlobalLoader';
'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { MagneticButton } from '@/components/global/MagneticButton';
import AnimatedText, { GradientText } from '@/components/ui/AnimatedText';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { BlogPost } from '@/types/admin';

// ----------------------------------------------------------------------
// Section 1: Hero
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment via-white to-vastu-parchment">
      <Mandala3D />
      <FloatingParticles />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sacred-saffron uppercase tracking-[0.3em] text-sm mb-4 block">Wisdom from the Vedic Tradition</motion.span>
        <AnimatedText text="Sacred Archives" className="font-serif text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-4" />
        <GradientText text="Ancient Knowledge for Modern Living" className="font-serif text-2xl md:text-3xl mb-6 block" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg text-nidra-indigo/70 max-w-2xl mx-auto">
          Explore articles on Vastu Shastra, numerology, and Vedic astrology — written by Acharya Sharma.
        </motion.p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 2: Featured Post
// ----------------------------------------------------------------------
function FeaturedPost({ post }: { post: BlogPost }) {
  if (!post) return null;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-serif text-3xl text-nidra-indigo mb-8">Featured Article</h2>
        <Link href={`/insights/post?slug=${post.slug}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="grid md:grid-cols-2 gap-8 bg-vastu-parchment rounded-3xl overflow-hidden border border-prakash-gold/30 shadow-xl cursor-pointer"
          >
            <div className="h-64 md:h-full">
              <img src={post.featured_image || '/images/blog/vastu-science.svg'} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-prakash-gold uppercase text-sm tracking-wider">{post.category}</span>
              <h3 className="font-serif text-2xl md:text-3xl text-nidra-indigo mt-2 mb-4">{post.title}</h3>
              <p className="text-nidra-indigo/70 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-nidra-indigo/50">
                <span>{post.read_time} min read</span>
                <span>By {post.author_name || 'Acharya Sharma'}</span>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 3: Category Filter
// ----------------------------------------------------------------------
function FilterSection({ categories, activeCategory, onSelect }: { categories: string[]; activeCategory: string; onSelect: (cat: string) => void }) {
  return (
    <section className="py-12 bg-vastu-stone/20">
      <div className="container mx-auto px-6">
        <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={onSelect} />
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 4: Post Grid
// ----------------------------------------------------------------------
function PostGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-nidra-indigo/60">No articles found in this category.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 5: Newsletter / CTA
// ----------------------------------------------------------------------
function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-nidra-indigo to-nidra-indigo/90 text-white">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Receive Sacred Wisdom</h2>
        <p className="text-white/70 mb-8">Subscribe to get the latest articles delivered to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" placeholder="Your email address" className="px-6 py-3 rounded-full text-nidra-indigo w-full sm:w-80" />
          <MagneticButton className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-medium px-8 py-3 rounded-full">Subscribe</MagneticButton>
        </div>
        <p className="text-white/40 text-sm mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 6: Final CTA
// ----------------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="relative py-32 bg-vastu-parchment text-center overflow-hidden">
      <Mandala3D />
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedText text="Ready for Personal Guidance?" className="font-serif text-4xl md:text-5xl text-nidra-indigo mb-6" />
        <p className="text-lg text-nidra-indigo/70 max-w-2xl mx-auto mb-10">Book a private consultation with Acharya Sharma.</p>
        <Link href="/contact" className="luxury-button px-10 py-4 text-lg">Consult Acharya</Link>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function InsightsPage() {
  const { items: posts, loading } = useRealtimeContent<BlogPost>('blog_posts', 'published_at', false);
  const publishedPosts = posts.filter(p => p.is_published);
  
  const categories = useMemo(() => {
    const cats = new Set(publishedPosts.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [publishedPosts]);
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return publishedPosts;
    return publishedPosts.filter(p => p.category === activeCategory);
  }, [publishedPosts, activeCategory]);
  
  const featuredPost = publishedPosts[0];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <HeroSection />
          {featuredPost && <FeaturedPost post={featuredPost} />}
          <FilterSection categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
          <PostGrid posts={filteredPosts} />
          <NewsletterSection />
          <FinalCTA />
        </main>
      </SmoothScroll>
    </>
  );
}
