import GlobalLoader from '@/components/ui/GlobalLoader';
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { BlogPost } from '@/types/admin';

function PostContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { items: posts, loading } = useRealtimeContent<BlogPost>('blog_posts', 'published_at', false);
  const post = posts.find(p => p.slug === slug && p.is_published);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl text-nidra-indigo mb-4">Article Not Found</h1>
        <p className="text-nidra-indigo/60 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link href="/insights" className="luxury-button">Back to Archives</Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back button */}
        <Link href="/insights" className="inline-flex items-center text-prakash-gold hover:underline mb-6">
          ← Back to Archives
        </Link>
        
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-nidra-indigo/60 mb-4">
            <span className="text-prakash-gold uppercase tracking-wider">{post.category}</span>
            <span>•</span>
            <span>{post.read_time} min read</span>
            <span>•</span>
            <span>By {post.author_name || 'Acharya KK Nagaich ji'}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-nidra-indigo mb-6">{post.title}</h1>
          <p className="text-xl text-nidra-indigo/70 italic">{post.excerpt}</p>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="rounded-3xl overflow-hidden mb-10 shadow-xl border border-prakash-gold/30">
            <img src={post.featured_image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon...</p>' }}
        />

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-vastu-stone/20 rounded-2xl border border-prakash-gold/20 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-prakash-gold to-sacred-saffron flex items-center justify-center text-2xl">🧘</div>
          <div>
            <p className="font-serif text-lg text-nidra-indigo">{post.author_name || 'Acharya KK Nagaich ji'}</p>
            <p className="text-sm text-nidra-indigo/60">4th Generation Vastu Guru. Sharing authentic Vedic wisdom for modern living.</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PostPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment min-h-screen">
          <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" /></div>}>
            <PostContent />
          </Suspense>
        </main>
      </SmoothScroll>
    </>
  );
}
