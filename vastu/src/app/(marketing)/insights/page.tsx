'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MediaContainer } from '@/components/ui/MediaContainer';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { BlogPost } from '@/types/admin';
import { media } from '@/lib/mediaConfig';

export default function InsightsPage() {
  const { items: posts, loading } = useRealtimeContent<BlogPost>('blog_posts', 'published_at', false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(posts.map(p => p.category))];
  const filtered = selectedCategory === 'All' ? posts : posts.filter(p => p.category === selectedCategory);
  const featuredPost = posts[0];

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main className="relative z-10 pt-32 bg-vastu-parchment">
          <SectionTitle title="Wisdom from the Sacred Archives" subtitle="Ancient Vedic principles decoded for modern living" />
          
          {featuredPost && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-sacred-saffron uppercase tracking-widest text-sm">Featured</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-nidra-indigo mt-3 mb-6">{featuredPost.title}</h2>
                    <p className="text-nidra-indigo/70 mb-6">{featuredPost.excerpt}</p>
                    <HeroButton href={`/insights/post?slug=${featuredPost.slug}`}>Read More →</HeroButton>
                  </div>
                  <LuxuryTiltCard>
                    <MediaContainer src={featuredPost.featured_image} type="image" fallbackKey="luxuryLivingRoom" className="w-full h-[300px] object-cover rounded-3xl shadow-luxury-xl" />
                  </LuxuryTiltCard>
                </div>
              </div>
            </section>
          )}

          <section className="py-16 bg-vastu-stone">
            <div className="container mx-auto px-6">
              <h3 className="font-serif text-2xl text-nidra-indigo text-center mb-8">Trending Topics</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Vastu for Home', 'Numerology Basics', 'Office Vastu', 'Spiritual Growth'].map(topic=>(
                  <span key={topic} className="px-6 py-3 bg-white rounded-full text-nidra-indigo border border-prakash-gold/30 cursor-pointer hover:bg-prakash-gold/10">{topic}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap gap-2 justify-center mb-12">
                {categories.map(cat=>(
                  <button key={cat} onClick={()=>setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm ${selectedCategory===cat?'bg-sacred-saffron text-white':'bg-vastu-stone text-nidra-indigo'}`}>{cat}</button>
                ))}
              </div>
              {loading ? <div className="text-center">Loading...</div> : (
                <div className="grid md:grid-cols-3 gap-8">
                  {filtered.map(post=>(
                    <Link key={post.id} href={`/insights/post?slug=${post.slug}`}>
                      <LuxuryTiltCard className="h-full">
                        <div className="bg-white rounded-2xl overflow-hidden border border-prakash-gold/20 h-full">
                          <MediaContainer src={post.featured_image} type="image" fallbackKey="vastuScan" className="w-full h-48 object-cover" />
                          <div className="p-6">
                            <span className="text-xs text-sacred-saffron">{post.category}</span>
                            <h3 className="font-serif text-xl text-nidra-indigo mt-2 mb-2">{post.title}</h3>
                            <p className="text-nidra-indigo/60 text-sm">{post.excerpt}</p>
                          </div>
                        </div>
                      </LuxuryTiltCard>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
