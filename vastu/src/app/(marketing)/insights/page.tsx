'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

// Mock blog data
const featuredPosts = [
  {
    id: '1',
    title: 'The Science Behind Vastu Purusha Mandala',
    excerpt: 'Explore the ancient geometric principles that form the foundation of Vastu Shastra and how they influence modern architecture.',
    date: 'April 10, 2026',
    readTime: '8 min read',
    category: 'Vastu Science',
    image: 'https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: { name: 'Acharya [Name]', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  },
  {
    id: '2',
    title: 'Vastu for West‑Facing Homes: Myths & Facts',
    excerpt: 'Is a west‑facing entrance really inauspicious? We debunk common misconceptions and provide practical remedies.',
    date: 'April 8, 2026',
    readTime: '6 min read',
    category: 'Residential Vastu',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: { name: 'Acharya [Name]', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  },
  {
    id: '3',
    title: 'How Vastu Differs from Feng Shui',
    excerpt: 'While both systems aim to harmonize energy, their origins and methodologies are distinct. Learn the key differences.',
    date: 'April 5, 2026',
    readTime: '5 min read',
    category: 'Comparative Studies',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: { name: 'Acharya [Name]', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  },
  {
    id: '4',
    title: 'The Five Elements in Vastu: A Deep Dive',
    excerpt: 'Earth, Water, Fire, Air, and Space—understand how these panchabhutas shape your living environment.',
    date: 'April 2, 2026',
    readTime: '7 min read',
    category: 'Vastu Science',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: { name: 'Acharya [Name]', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  },
  {
    id: '5',
    title: 'Boost Your Business with Commercial Vastu',
    excerpt: 'Real‑world case studies of how proper office alignment increased revenue and reduced employee turnover.',
    date: 'March 28, 2026',
    readTime: '9 min read',
    category: 'Commercial Vastu',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: { name: 'Acharya [Name]', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  },
  {
    id: '6',
    title: 'The Power of the Brahmasthan: Heart of Your Home',
    excerpt: 'Why the central zone of your house should remain open and how it affects the health of your family.',
    date: 'March 25, 2026',
    readTime: '4 min read',
    category: 'Residential Vastu',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: { name: 'Acharya [Name]', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  },
];

const categories = ['All', 'Vastu Science', 'Residential Vastu', 'Commercial Vastu', 'Comparative Studies', 'Case Studies'];

function BlogCard({ post }: { post: typeof featuredPosts[0] }) {
  const { play } = useSound();
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#C88A5D]/10"
    >
      <Link href={`/insights/${post.id}`} onClick={() => play('clickSecondary')}>
        <div className="relative h-56 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/60 to-transparent" />
          <span className="absolute top-4 left-4 bg-[#C88A5D] text-white text-xs font-medium px-3 py-1 rounded-full">{post.category}</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-[#1A2A3A]/50 mb-3">
            <span>{post.date}</span><span>•</span><span>{post.readTime}</span>
          </div>
          <h3 className="font-serif text-xl text-[#1A2A3A] mb-3 group-hover:text-[#C88A5D] transition-colors line-clamp-2">{post.title}</h3>
          <p className="font-sans text-sm text-[#1A2A3A]/60 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover border border-[#C88A5D]" />
            <span className="text-sm font-medium text-[#1A2A3A]">{post.author.name}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function InsightsPage() {
  const { play } = useSound();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredPosts = selectedCategory === 'All' ? featuredPosts : featuredPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <LuxuryCursor /><SoundController /><Header /><SmoothScroll>
        <main className="relative z-10"><GradientBackground />
          <section className="relative pt-32 pb-20 px-6"><div className="container mx-auto max-w-5xl text-center">
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }} className="font-serif text-5xl md:text-7xl text-[#1A2A3A] mb-6">Wisdom from the<br /><span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">Sacred Archives</span></motion.h1>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="font-sans text-xl text-[#1A2A3A]/70 max-w-3xl mx-auto">Ancient Vedic principles decoded for modern living. New insights delivered daily.</motion.p>
          </div></section>

          <section className="py-16 bg-white"><div className="container mx-auto px-6 max-w-4xl">
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} className="text-center mb-12"><h2 className="font-serif text-3xl text-[#1A2A3A] mb-4">What is the VedicUrja Journal?</h2><p className="font-sans text-lg text-[#1A2A3A]/70">A living repository of Vastu Shastra, numerology, and Vedic sciences—curated by Acharya [Name] and enhanced by AI.</p></motion.div>
            <div className="grid md:grid-cols-3 gap-8 text-center">{['Daily Insights','Authentic Lineage','Practical Remedies'].map((t,i)=><motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }}><div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#C88A5D]/10 flex items-center justify-center"><span className="text-2xl font-serif text-[#C88A5D]">{i+1}</span></div><h4 className="font-serif text-xl">{t}</h4><p className="text-sm text-[#1A2A3A]/60">Lorem ipsum</p></motion.div>)}</div>
          </div></section>

          <section className="py-20 bg-[#F9F6F0]"><div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12"><h2 className="font-serif text-3xl text-[#1A2A3A]">Latest from the Journal</h2>
              <div className="flex gap-2">{categories.map(cat=><button key={cat} onClick={()=>{setSelectedCategory(cat);play('clickSecondary');}} className={`px-4 py-2 rounded-full text-sm ${selectedCategory===cat?'bg-[#C88A5D] text-white':'bg-white text-[#1A2A3A]/70'}`}>{cat}</button>)}</div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{filteredPosts.map(post=><BlogCard key={post.id} post={post} />)}</div>
          </div></section>

          <section className="py-24 bg-gradient-to-r from-[#1A2A3A] to-[#1A2A3A]/90 text-white"><div className="container mx-auto px-6 text-center max-w-3xl">
            <motion.h2 initial={{ opacity:0 }} whileInView={{ opacity:1 }} className="font-serif text-3xl mb-4">Never Miss an Insight</motion.h2>
            <p className="font-sans text-white/70 mb-8">Join thousands of readers who receive daily Vastu wisdom.</p>
            <form className="flex gap-4 justify-center"><input type="email" placeholder="Your email address" className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white flex-1 max-w-md" /><button className="bg-[#E8B960] hover:bg-[#C88A5D] text-[#1A2A3A] font-medium px-8 py-4 rounded-full">Subscribe</button></form>
          </div></section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
