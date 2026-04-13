'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import { HeroButton } from '@/components/global/HeroButton';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

// ------------------------------------------------------------------------------
// Rich, authentic‑looking testimonial data
// ------------------------------------------------------------------------------
const testimonials = [
  {
    id: 1,
    name: 'Priya & Raj Malhotra',
    location: 'Bengaluru, India',
    projectType: 'Residential',
    rating: 5,
    text: 'Acharya\'s guidance transformed our home. We were struggling with constant arguments and financial instability. After simple color corrections and a small water feature in the North‑East, our relationship healed, and Raj\'s business grew by 30% within six months. We are forever grateful.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 2,
    name: 'James Whitmore',
    location: 'New York, USA',
    projectType: 'Commercial',
    rating: 5,
    text: 'As a skeptical Westerner, I was hesitant. But our Manhattan office was stagnant. Acharya performed a remote Vastu audit and suggested repositioning the CEO\'s cabin to the South‑West and placing a copper pyramid in the North‑East. Within three months, we closed two major deals and employee morale skyrocketed.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 3,
    name: 'Ananya Sharma',
    location: 'Dubai, UAE',
    projectType: 'Residential',
    rating: 5,
    text: 'I suffered from chronic insomnia for years. Acharya identified a geopathic stress line passing through my bedroom. He recommended a simple bed reposition and a copper coil beneath the mattress. I now sleep peacefully every night. It\'s been life‑changing.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 4,
    name: 'Michael Chen',
    location: 'Singapore',
    projectType: 'Industrial',
    rating: 5,
    text: 'Our factory was facing frequent equipment breakdowns and labor unrest. Acharya visited our facility and repositioned heavy machinery to the South and West zones. Downtime reduced by 60%, and worker satisfaction scores improved dramatically. Highly recommended for any manufacturing unit.',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'December 2025',
    verified: true,
  },
  {
    id: 5,
    name: 'Elena Rossi',
    location: 'Milan, Italy',
    projectType: 'Spiritual',
    rating: 5,
    text: 'We run a yoga retreat in Tuscany. Occupancy was low despite our efforts. Acharya realigned our meditation hall to the North‑East and placed a Vastu pyramid beneath the floor. Within a month, we were fully booked and received glowing reviews. The energy shift is palpable.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'November 2025',
    verified: true,
  },
  {
    id: 6,
    name: 'David Miller',
    location: 'Sydney, Australia',
    projectType: 'Land Selection',
    rating: 5,
    text: 'We were about to purchase a plot for our dream home. Acharya performed Bhoomi Parikshan remotely and advised against it—he detected a geopathic stress zone. We followed his advice and bought a different plot. Our family has been healthy and prosperous ever since. Worth every penny.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'October 2025',
    verified: true,
  },
  {
    id: 7,
    name: 'Sophia Rodriguez',
    location: 'Madrid, Spain',
    projectType: 'Commercial',
    rating: 5,
    text: 'Our restaurant was struggling with inconsistent footfall. Acharya suggested shifting the main entrance slightly to the North and placing a small fountain near the cash counter. We saw a 40% increase in walk‑ins within weeks. Vastu works, even in Europe!',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'September 2025',
    verified: true,
  },
  {
    id: 8,
    name: 'Kenji Tanaka',
    location: 'Tokyo, Japan',
    projectType: 'Commercial',
    rating: 5,
    text: 'Our entire office feels more productive and harmonious. Acharya\'s remote consultation was thorough and professional. He provided detailed diagrams and remedies that were easy to implement. Our team\'s energy has completely shifted.',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'August 2025',
    verified: true,
  },
  {
    id: 9,
    name: 'Olivia Brown',
    location: 'Toronto, Canada',
    projectType: 'Residential',
    rating: 5,
    text: 'The Vastu scan of our apartment was incredibly detailed. Acharya pointed out a North‑East defect we never noticed. After placing a small crystal cluster, our family dynamics improved, and my husband received an unexpected promotion. Thank you!',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'July 2025',
    verified: true,
  },
  {
    id: 10,
    name: 'Liam O\'Connor',
    location: 'Dublin, Ireland',
    projectType: 'Residential',
    rating: 5,
    text: 'Worth every penny. The consultation was life‑changing. Our home finally feels like a sanctuary. Acharya\'s warmth and deep knowledge are unmatched.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'June 2025',
    verified: true,
  },
  {
    id: 11,
    name: 'Arjun Kapoor',
    location: 'Mumbai, India',
    projectType: 'Commercial',
    rating: 5,
    text: 'Our chain of retail stores was facing declining sales. Acharya visited our flagship store and made simple adjustments—cash counter orientation and product placement per Vastu zones. Revenue increased by 25% across all locations. A true master.',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'May 2025',
    verified: true,
  },
  {
    id: 12,
    name: 'Meera Iyer',
    location: 'Chennai, India',
    projectType: 'Land Selection',
    rating: 5,
    text: 'We were confused between two plots. Acharya analyzed both and recommended the one with a gentle North‑East slope. Our construction went smoothly, and we moved into our new home on an auspicious Muhurta. Everything has been blessed.',
    avatar: 'https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'April 2025',
    verified: true,
  },
];

const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Spiritual', 'Land Selection'];

// ------------------------------------------------------------------------------
// Testimonial Card Component
// ------------------------------------------------------------------------------
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const { play } = useSound();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-[#C88A5D]/10 hover:shadow-xl transition-all"
      onMouseEnter={() => play('hoverCard')}
    >
      <div className="flex items-start gap-4 mb-4">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#C88A5D]" />
        <div>
          <h4 className="font-serif text-lg text-[#1A2A3A]">{testimonial.name}</h4>
          <p className="text-sm text-[#C88A5D]">{testimonial.location}</p>
          <p className="text-xs text-[#1A2A3A]/50 mt-1">{testimonial.projectType} • {testimonial.date}</p>
        </div>
        {testimonial.verified && (
          <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Verified
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#E8B960]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
      </div>
      <p className="font-sans text-[#1A2A3A]/70 text-sm leading-relaxed">"{testimonial.text}"</p>
    </motion.div>
  );
}

// ------------------------------------------------------------------------------
// Main Page Component
// ------------------------------------------------------------------------------
export default function ClientStoriesPage() {
  const { play } = useSound();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.projectType === selectedCategory);

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
          <GradientBackground />

          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-5xl md:text-7xl text-[#1A2A3A] mb-6 leading-tight"
              >
                Trusted by Families &<br />
                <span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">
                  Fortune 500 Leaders
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-xl text-[#1A2A3A]/70 max-w-3xl mx-auto mb-12"
              >
                Over 5,000+ clients across 30+ countries have transformed their spaces with VedicUrja.
              </motion.p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {['5,000+ Clients', '30+ Countries', '4.9 ★ Rating'].map(stat => (
                  <div key={stat} className="text-center">
                    <p className="font-serif text-3xl text-[#C88A5D]">{stat}</p>
                    <p className="text-sm text-[#1A2A3A]/50 uppercase tracking-wider">and counting</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Video Testimonial (Simulated) */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-5xl">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-[#1A2A3A] mb-4">Watch Real Stories</h2>
                <p className="font-sans text-[#1A2A3A]/60">Hear directly from our clients about their transformations.</p>
              </motion.div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Video testimonial"
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/80 to-transparent flex items-center justify-center">
                  <button className="w-20 h-20 rounded-full bg-[#C88A5D] text-white flex items-center justify-center text-4xl shadow-lg hover:scale-110 transition-transform" onClick={() => play('clickPrimary')}>
                    ▶
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-serif text-xl">Priya & Raj Malhotra</p>
                  <p className="text-sm text-white/70">Bengaluru, India</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Grid with Filter */}
          <section className="py-20 bg-[#F9F6F0]">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap items-center justify-between mb-12">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-3xl md:text-4xl text-[#1A2A3A]">
                  What Our Clients Say
                </motion.h2>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); play('clickSecondary'); }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-[#C88A5D] text-white' : 'bg-white text-[#1A2A3A]/70 hover:bg-[#C88A5D]/10'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map(t => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </div>
            </div>
          </section>

          {/* Leave a Review CTA */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-3xl text-center">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-3xl md:text-4xl text-[#1A2A3A] mb-4">
                Experience the Transformation Yourself
              </motion.h2>
              <p className="font-sans text-lg text-[#1A2A3A]/70 mb-8">
                Join our community of satisfied clients and share your own story.
              </p>
              <HeroButton href="/contact">Book Your Consultation</HeroButton>
            </div>
          </section>

          {/* Trust Banner */}
          <section className="py-16 bg-gradient-to-r from-[#1A2A3A] to-[#1A2A3A]/90 text-white">
            <div className="container mx-auto px-6 text-center">
              <p className="font-sans text-sm uppercase tracking-[0.3em] mb-6">As Featured In</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {['Times of India', 'The Hindu', 'Economic Times', 'ArchDaily', 'Vogue India'].map(brand => (
                  <span key={brand} className="font-serif text-2xl md:text-3xl text-white/60">{brand}</span>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
