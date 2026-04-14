'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialCard3D } from '@/components/ui/TestimonialCard3D';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { Testimonial } from '@/types/admin';

const indiaTestimonials = [
  { client_name: 'Priya & Raj Malhotra', location: 'Bengaluru', project_type: 'Residential', rating:5, content:'Acharya\'s guidance transformed our home.' },
  { client_name: 'Arjun Kapoor', location: 'Mumbai', project_type: 'Commercial', rating:5, content:'Revenue increased by 25% after Acharya\'s visit.' },
];
const globalTestimonials = [
  { client_name: 'James Whitmore', location: 'New York, USA', project_type: 'Commercial', rating:5, content:'Closed two major deals within three months.' },
];

export default function ClientStoriesPage() {
  const { items: dbTestimonials } = useRealtimeContent<Testimonial>('testimonials', 'order_index');
  const [activeCategory, setActiveCategory] = useState('All');
  const all = [...indiaTestimonials, ...globalTestimonials, ...dbTestimonials.map(t=>({client_name:t.client_name,location:t.location,project_type:t.project_type,rating:t.rating,content:t.content}))];
  const filtered = activeCategory==='All'?all:activeCategory==='India'?all.filter(t=>t.location?.includes('India')):activeCategory==='Global'?all.filter(t=>!t.location?.includes('India')):all.filter(t=>t.project_type===activeCategory);

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main className="relative z-10 pt-32 bg-vastu-parchment">
          <SectionTitle title="Words of Gratitude" subtitle="From Around the World" />
          <section className="py-12">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {['All','India','Global','Residential','Commercial'].map(cat=>(
                  <button key={cat} onClick={()=>setActiveCategory(cat)} className={`px-6 py-2 rounded-full ${activeCategory===cat?'bg-sacred-saffron text-white':'bg-white text-nidra-indigo border border-prakash-gold/30'}`}>{cat}</button>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filtered.map((t,i)=>(
                  <LuxuryTiltCard key={i}><TestimonialCard3D {...t} index={i} /></LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>
          <section className="py-24 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 className="font-serif text-4xl mb-6">Experience the Transformation</motion.h2>
            <HeroButton href="/contact">Book Your Consultation</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
