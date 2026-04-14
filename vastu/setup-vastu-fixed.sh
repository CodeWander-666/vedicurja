#!/bin/bash
set -e

echo "🌟 Completing All Pages with Vedic Luxury Blueprint..."
echo "======================================================="

# ------------------------------------------------------------------------------
# 1. Fix deprecated Lenis packages
# ------------------------------------------------------------------------------
npm uninstall @studio-freight/react-lenis @studio-freight/lenis 2>/dev/null || true
npm install --save --legacy-peer-deps lenis

# Update SmoothScroll component to use new lenis package
cat > src/components/layout/SmoothScroll.tsx << 'EOF'
'use client';
import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
EOF

# ------------------------------------------------------------------------------
# 2. Free Tools Page (complete)
# ------------------------------------------------------------------------------
cat > src/app/\(marketing\)/free-tools/page.tsx << 'EOF'
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { MediaContainer } from '@/components/ui/MediaContainer';
import { useSound } from '@/hooks/useSound';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { FreeTool } from '@/types/admin';
import { media } from '@/lib/mediaConfig';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

const premiumSteps = [
  { title: 'Free Basic Analysis', desc: 'Get a glimpse of your cosmic blueprint with our AI tools.', icon: '🔮' },
  { title: 'Identify Key Areas', desc: 'Understand critical aspects affecting your space.', icon: '📍' },
  { title: 'Premium Report Preview', desc: 'See a sample of in‑depth insights available.', icon: '📄' },
  { title: 'Personalized Remedies', desc: 'Unlock detailed, actionable recommendations.', icon: '✨' },
  { title: 'Expert Review', desc: 'Have your report enhanced by Acharya himself.', icon: '🧘' },
  { title: 'Ongoing Support', desc: 'Access priority support and follow‑ups.', icon: '🤝' },
];

export default function FreeToolsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const { play } = useSound();
  const { items: tools } = useRealtimeContent<FreeTool>('free_tools', 'order_index');

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main ref={containerRef} className="relative z-10">
          <VideoBackground src="/videos/numerology.mp4" fallbackKey="numerology" overlayOpacity="40" />
          <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="text-center max-w-5xl relative z-10">
              <LuxuryTiltCard className="inline-block p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30">
                <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg">
                  Ancient Wisdom.<br /><span className="vedic-gradient-text">AI‑Powered Precision.</span>
                </motion.h1>
              </LuxuryTiltCard>
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }} className="font-sans text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
                Trusted by seekers worldwide—experience the most advanced free Vedic AI tools.
              </motion.p>
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.6 }}>
                <HeroButton href="#tools">Explore Tools</HeroButton>
              </motion.div>
            </div>
          </motion.section>

          <section className="py-24 bg-vastu-parchment">
            <div className="container mx-auto px-6 max-w-6xl">
              <SectionTitle title="Your Path to Premium Insights" subtitle="Start free, upgrade for life‑changing clarity" />
              <div className="grid md:grid-cols-3 gap-6">
                {premiumSteps.map((step, i) => (
                  <LuxuryTiltCard key={i} className="h-full">
                    <div className="bg-white p-6 rounded-2xl border border-prakash-gold/20 shadow-luxury-md h-full">
                      <span className="text-4xl">{step.icon}</span>
                      <h3 className="font-serif text-xl text-nidra-indigo mt-4 mb-2">{step.title}</h3>
                      <p className="text-nidra-indigo/70 text-sm">{step.desc}</p>
                    </div>
                  </LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>

          <div id="tools">
            {tools.map((tool, index) => (
              <section key={tool.id} className={`py-24 ${index%2===0?'bg-white':'bg-vastu-stone'}`}>
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${index%2!==0?'lg:flex-row-reverse':''}`}>
                    <div className={index%2!==0?'lg:order-2':''}>
                      <span className="text-sacred-saffron font-sans text-sm uppercase tracking-widest">{tool.tagline}</span>
                      <h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo mt-4 mb-6">{tool.title}</h2>
                      <p className="text-lg text-nidra-indigo/80 leading-relaxed mb-8">{tool.description}</p>
                      <ul className="space-y-4 mb-8">
                        {tool.features?.map((f,i)=><li key={i} className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-prakash-gold mt-2"/><span className="font-sans text-nidra-indigo">{f}</span></li>)}
                      </ul>
                      <Link href={`/free-tools/${tool.tool_key}`} onClick={()=>play('clickPrimary')} className="luxury-button inline-block">Try {tool.title} Free</Link>
                    </div>
                    <div className={index%2!==0?'lg:order-1':''}>
                      <LuxuryTiltCard>
                        <MediaContainer src={tool.image_url} type="image" fallbackKey="kundaliChart" className="w-full h-[300px] object-cover rounded-3xl shadow-luxury-xl" />
                      </LuxuryTiltCard>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="py-32 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Unlock Your Cosmic Potential?</motion.h2>
            <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">Join thousands who have discovered clarity through our AI‑powered Vedic tools.</p>
            <HeroButton href="/contact">Start Your Free Journey</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
EOF

# ------------------------------------------------------------------------------
# 3. Services Page
# ------------------------------------------------------------------------------
cat > src/app/\(marketing\)/services/page.tsx << 'EOF'
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { MediaContainer } from '@/components/ui/MediaContainer';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { Service } from '@/types/admin';
import { media } from '@/lib/mediaConfig';

const GradientBackground = dynamic(() => import('@/components/global/GradientBackground'), { ssr: false });

const journeySteps = [
  { step: '01', title: 'Discovery Call', desc: 'We begin with a deep conversation to understand your space and aspirations.' },
  { step: '02', title: 'Site Analysis', desc: 'Using advanced tools and ancient wisdom, we analyze your floor plans or conduct a virtual walkthrough.' },
  { step: '03', title: 'Energy Mapping', desc: 'We overlay the 16‑zone Vastu Purusha Mandala and identify imbalances.' },
  { step: '04', title: 'Customized Remedies', desc: 'You receive a detailed report with non‑destructive corrections tailored to your space.' },
  { step: '05', title: 'Implementation Guidance', desc: 'We walk you through every remedy, ensuring easy application.' },
  { step: '06', title: 'Follow‑up & Support', desc: 'We stay connected to monitor the transformation.' },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const { items: services } = useRealtimeContent<Service>('services', 'order_index');

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main ref={containerRef} className="relative z-10">
          <VideoBackground src="/videos/luxury-home.mp4" fallbackKey="luxuryHome" overlayOpacity="30" />
          <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="text-center max-w-5xl relative z-10">
              <LuxuryTiltCard className="inline-block p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30">
                <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg">
                  Sacred Spaces.<br /><span className="vedic-gradient-text">Limitless Potential.</span>
                </motion.h1>
              </LuxuryTiltCard>
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }} className="font-sans text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
                India's Most Trusted Vastu Consultants — Serving Homes, Businesses, and Industries.
              </motion.p>
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.6 }}>
                <HeroButton href="#journey">Begin Your Journey</HeroButton>
              </motion.div>
            </div>
          </motion.section>

          <section id="journey" className="py-24 bg-vastu-parchment">
            <div className="container mx-auto px-6 max-w-6xl">
              <SectionTitle title="Our Proven 6‑Step Journey" subtitle="A seamless path to a harmonious and prosperous space" />
              <div className="grid md:grid-cols-3 gap-8">
                {journeySteps.map((step, i) => (
                  <LuxuryTiltCard key={i} className="h-full">
                    <div className="bg-white p-8 rounded-3xl border border-prakash-gold/20 h-full">
                      <span className="text-5xl font-serif text-prakash-gold/30">{step.step}</span>
                      <h3 className="font-serif text-2xl text-nidra-indigo mt-4 mb-3">{step.title}</h3>
                      <p className="text-nidra-indigo/70">{step.desc}</p>
                    </div>
                  </LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>

          {services.map((service, index) => (
            <section key={service.id} id={service.slug} className={`py-24 ${index%2===0?'bg-white':'bg-vastu-stone'}`}>
              <div className="container mx-auto px-6 max-w-7xl">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${index%2!==0?'lg:flex-row-reverse':''}`}>
                  <div className={index%2!==0?'lg:order-2':''}>
                    <span className="text-sacred-saffron font-sans text-sm uppercase tracking-widest">{service.tagline}</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-nidra-indigo mt-4 mb-6">{service.title}</h2>
                    <p className="text-lg text-nidra-indigo/80 leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-4 mb-8">
                      {service.benefits?.map((b,i)=><li key={i} className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-prakash-gold mt-2"/><span className="font-sans text-nidra-indigo">{b}</span></li>)}
                    </ul>
                    <div className="bg-prakash-gold/5 border-l-4 border-prakash-gold p-6 rounded-r-xl mb-8">
                      <p className="font-serif text-nidra-indigo italic">"{service.use_case}"</p>
                      <p className="text-sm text-prakash-gold mt-2">— Real Client Case Study</p>
                    </div>
                    <HeroButton href={`/contact?service=${service.slug}`}>Request {service.title} Consultation</HeroButton>
                  </div>
                  <div className={index%2!==0?'lg:order-1':''}>
                    <LuxuryTiltCard>
                      <MediaContainer src={service.image_url} type="image" fallbackKey="luxuryLivingRoom" className="w-full h-[400px] object-cover rounded-3xl shadow-luxury-xl" />
                    </LuxuryTiltCard>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="py-32 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Transform Your Space?</motion.h2>
            <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">Book a private consultation with Acharya and unlock the hidden potential of your environment.</p>
            <HeroButton href="/contact">Schedule Your Consultation</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
EOF

# ------------------------------------------------------------------------------
# 4. Virtual Consult (Bookings) Page
# ------------------------------------------------------------------------------
cat > src/app/\(marketing\)/bookings/page.tsx << 'EOF'
'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { HeroButton } from '@/components/global/HeroButton';
import { LuxuryTiltCard } from '@/components/ui/LuxuryTiltCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { VirtualConsultSection } from '@/types/admin';

const ProcessStep = ({ number, title, description, delay }: { number: number; title: string; description: string; delay: number }) => (
  <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay }} className="flex gap-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sacred-saffron to-prakash-gold flex items-center justify-center text-white font-serif text-xl font-bold shadow-luxury-md">{number}</div>
    <div><h3 className="font-serif text-2xl text-nidra-indigo mb-2">{title}</h3><p className="text-nidra-indigo/70 leading-relaxed">{description}</p></div>
  </motion.div>
);

export default function BookingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items: sections } = useRealtimeContent<VirtualConsultSection>('virtual_consult_content', 'order_index');
  const getSection = (key: string) => sections.find(s => s.section_key === key);
  const hero = getSection('hero');

  return (
    <>
      <LuxuryCursor /><SoundController /><LuxuryHeader /><SmoothScroll>
        <main ref={containerRef} className="relative z-10">
          <VideoBackground src="/videos/global-connection.mp4" fallbackKey="vastuConsultation" overlayOpacity="30" />
          <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <LuxuryTiltCard className="max-w-5xl mx-auto text-center p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-prakash-gold/30">
              <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                {hero?.title || 'Virtual Consultation'}<br />
                <span className="vedic-gradient-text">Ancient Wisdom, Modern Connection</span>
              </motion.h1>
              <p className="font-sans text-xl text-white/90 max-w-3xl mx-auto mb-12">{hero?.description || 'Experience personalized Vastu guidance from anywhere in the world.'}</p>
              <HeroButton href="/contact?source=bookings">Book Your Session →</HeroButton>
            </LuxuryTiltCard>
          </section>

          <section className="py-24 bg-vastu-parchment">
            <div className="container mx-auto px-6 max-w-4xl">
              <SectionTitle title="How It Works" subtitle="Seamless, secure, and deeply personal" />
              <div className="space-y-12">
                <ProcessStep number={1} title="Book Your Slot" description="Choose a convenient time from Acharya's calendar. You'll receive an instant confirmation with a secure video link." delay={0.1} />
                <ProcessStep number={2} title="Prepare Your Space" description="Walk through your home or office with your smartphone or share your floor plans. No special equipment needed." delay={0.2} />
                <ProcessStep number={3} title="Live Video Consultation" description="Connect with Acharya for a 60‑minute deep‑dive session. Discuss your concerns, show your space, and receive immediate insights." delay={0.3} />
                <ProcessStep number={4} title="Receive Your Report" description="Within 48 hours, you'll receive a detailed written report with personalized remedies and follow‑up recommendations." delay={0.4} />
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle title="Trusted Globally" subtitle="Join thousands who have transformed their lives through virtual Vastu" />
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                {[{ value:'50+', label:'Countries Served' },{ value:'5,000+', label:'Virtual Consultations' },{ value:'4.9 ★', label:'Average Rating' }].map((stat,i)=>(
                  <LuxuryTiltCard key={i}>
                    <div className="p-8 bg-white rounded-3xl border border-prakash-gold/20">
                      <p className="font-serif text-5xl text-prakash-gold mb-2">{stat.value}</p>
                      <p className="text-nidra-indigo/70">{stat.label}</p>
                    </div>
                  </LuxuryTiltCard>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 bg-gradient-to-r from-nidra-indigo to-sacred-saffron text-white text-center">
            <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} className="font-serif text-4xl md:text-6xl mb-6">Ready to Transform Your Space?</motion.h2>
            <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">Book your virtual consultation today and experience the power of authentic Vastu from anywhere.</p>
            <HeroButton href="/contact?source=bookings">Schedule Your Session →</HeroButton>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
EOF

# ------------------------------------------------------------------------------
# 5. Blogs Page (Insights)
# ------------------------------------------------------------------------------
cat > src/app/\(marketing\)/insights/page.tsx << 'EOF'
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
EOF

# ------------------------------------------------------------------------------
# 6. Testimonials Page (Client Stories)
# ------------------------------------------------------------------------------
cat > src/app/\(marketing\)/client-stories/page.tsx << 'EOF'
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
EOF

# ------------------------------------------------------------------------------
# 7. Build and verify
# ------------------------------------------------------------------------------
rm -rf .next out
npm run build

echo "✅ All pages completed with Vedic luxury blueprint!"
echo "👉 Run 'npm run dev' to see the fully transformed site."