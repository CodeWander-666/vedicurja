'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
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

// SEO‑optimized service data
const services = [
  {
    id: 'residential',
    title: 'Residential Vastu',
    tagline: 'Transform Your Home into a Sanctuary of Peace and Prosperity',
    description: 'Your home is not just a building; it is a living energy field. Our residential Vastu services ensure every corner of your space radiates harmony, health, and abundance. Whether you are building a new home or seeking remedies for an existing one, we provide tailored solutions that work with your architecture—no demolition required.',
    benefits: [
      'Improve sleep quality and family relationships',
      'Enhance financial flow and career opportunities',
      'Correct Vastu doshas without breaking walls',
      'Ideal for apartments, villas, and independent houses',
    ],
    useCase: 'A family in Bengaluru was experiencing constant arguments and financial instability. After our non‑destructive remedies—color therapy in the South‑West and a small water feature in the North‑East—they reported harmony and a 30% increase in business within six months.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    keywords: 'residential vastu consultant India, home vastu remedies, vastu for apartments',
  },
  {
    id: 'commercial',
    title: 'Commercial Vastu',
    tagline: 'Engineer Your Business Environment for Exponential Growth',
    description: 'From corner shops to corporate headquarters, the energy of your commercial space directly impacts your bottom line. We optimize office layouts, retail showrooms, hotels, and restaurants to attract customers, boost employee morale, and secure financial stability.',
    benefits: [
      'Increase footfall and customer retention',
      'Optimize cash counter and finance department placement',
      'Align sales and marketing teams for maximum output',
      'Reduce employee attrition and workplace conflicts',
    ],
    useCase: 'A chain of retail stores in Mumbai saw a 40% rise in walk‑ins after we repositioned their main entrance to the North and placed a small pyramid near the cash counter. The owner reported the highest quarterly revenue in five years.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    keywords: 'commercial vastu consultant India, office vastu remedies, shop vastu',
  },
  {
    id: 'industrial',
    title: 'Industrial Vastu',
    tagline: 'Maximise Output, Minimise Downtime, Ensure Worker Safety',
    description: 'Heavy machinery, raw material storage, and dispatch logistics all influence production efficiency. Our industrial Vastu solutions bring stability to manufacturing units, warehouses, and factories, reducing breakdowns and improving workforce harmony.',
    benefits: [
      'Strategic placement of heavy machinery in South/West zones',
      'Optimised raw material storage and finished goods dispatch',
      'Enhanced worker safety and reduced accidents',
      'Improved compliance with environmental and safety norms',
    ],
    useCase: 'A textile mill in Gujarat was facing frequent equipment failures and labor unrest. We repositioned the generator to the South‑East and placed a Vastu pyramid in the North‑East. Within three months, downtime reduced by 60% and worker satisfaction scores improved.',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    keywords: 'industrial vastu consultant India, factory vastu, warehouse vastu',
  },
  {
    id: 'land-selection',
    title: 'Land & Plot Selection',
    tagline: 'Ensure Your Foundation Is Auspicious from Day One',
    description: 'The energy of the land on which you build determines the future of your project. We perform Bhoomi Parikshan (soil testing), evaluate plot shape, slope, and surrounding environment, and recommend Muhurta (auspicious timing) for groundbreaking.',
    benefits: [
      'Identify and avoid geopathic stress zones',
      'Select plots with ideal shape and orientation',
      'Auspicious Muhurta for registration and construction',
      'Suitable for residential, commercial, and agricultural land',
    ],
    useCase: 'A developer in Pune was struggling to sell units in a new township. Our land audit revealed a major North‑East defect. Simple corrective measures—creating a water body and planting specific trees—turned the project into a best‑seller.',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200',
    keywords: 'land vastu consultant India, plot selection vastu, bhoomi parikshan',
  },
  {
    id: 'spiritual',
    title: 'Spiritual & Institutional Vastu',
    tagline: 'Create Sacred Spaces That Elevate Consciousness',
    description: 'Temples, meditation halls, schools, and hospitals require special attention to energy flow. We design spaces that promote healing, learning, and spiritual growth, following ancient Agama Shastra principles.',
    benefits: [
      'Ideal orientation for temples and meditation centers',
      'Classroom layouts that enhance student concentration',
      'Patient recovery zones in hospitals',
      'Community halls that foster positive gatherings',
    ],
    useCase: 'A yoga ashram in Rishikesh was experiencing low occupancy. We realigned the meditation hall to the North‑East and placed a copper pyramid beneath the floor. Within a month, the ashram was fully booked and received glowing reviews.',
    image: 'https://images.pexels.com/photos/161154/stained-glass-spiral-window-161154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    keywords: 'temple vastu consultant, spiritual vastu, hospital vastu',
  },
  {
    id: 'geopathic',
    title: 'Geopathic Stress & EMF Correction',
    tagline: 'Detect and Neutralize Hidden Earth Energies',
    description: 'Underground water streams, fault lines, and electromagnetic fields can cause chronic health issues, insomnia, and business losses. Using advanced dowsing and EMF meters, we identify and neutralize these invisible stressors.',
    benefits: [
      'Identify geopathic stress lines and Hartmann grids',
      'Neutralize harmful electromagnetic radiation',
      'Improve sleep, focus, and overall well‑being',
      'Suitable for homes, offices, and hospitals',
    ],
    useCase: 'The CEO of a tech company in Hyderabad was suffering from chronic migraines. We discovered a geopathic stress line passing through his cabin. After repositioning his desk and installing a copper coil, his migraines disappeared within weeks.',
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1200',
    keywords: 'geopathic stress correction India, EMF protection, vastu remedies for health',
  },
];

const whyChooseUs = [
  { title: '40+ Years Lineage', desc: 'Rooted in the authentic Guru‑Shishya tradition of Uttar Pradesh.' },
  { title: 'Non‑Destructive Remedies', desc: 'No demolition—only energy corrections and symbolic remedies.' },
  { title: 'Scientific Approach', desc: 'We combine ancient texts with modern tools like EMF meters.' },
  { title: 'Pan‑India Presence', desc: 'Consultations available in all major cities and remotely.' },
];

const faqs = [
  { q: 'Do I need to demolish walls for Vastu correction?', a: 'No. 90% of our remedies are non‑destructive, using colors, symbols, and energy tools.' },
  { q: 'How long does a Vastu consultation take?', a: 'A typical site visit takes 2‑3 hours. Remote consultations are completed within 48 hours.' },
  { q: 'Can Vastu help with business losses?', a: 'Absolutely. We have numerous case studies where Vastu corrections led to increased revenue and reduced attrition.' },
  { q: 'Do you provide services outside India?', a: 'Yes, we offer remote Vastu audits globally and have served clients in the USA, UK, UAE, and Singapore.' },
  { q: 'What is the cost of a Vastu consultation?', a: 'Fees vary based on property size and complexity. Please contact us for a custom quote.' },
];

function ServiceSection({ service, reverse }: { service: typeof services[0]; reverse: boolean }) {
  return (
    <section className={`py-24 ${reverse ? 'bg-[#F9F6F0]' : 'bg-white'}`} id={service.id}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <span className="text-[#C88A5D] font-sans text-sm uppercase tracking-widest">{service.tagline}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mt-4 mb-6">{service.title}</h2>
            <p className="text-lg text-[#1A2A3A]/70 leading-relaxed mb-6">{service.description}</p>
            <ul className="space-y-4 mb-8">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C88A5D] mt-2" />
                  <span className="font-sans text-[#1A2A3A]">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="bg-[#C88A5D]/5 border-l-4 border-[#C88A5D] p-6 rounded-r-xl mb-8">
              <p className="font-serif text-[#1A2A3A] italic">"{service.useCase}"</p>
              <p className="text-sm text-[#C88A5D] mt-2">— Real Client Case Study</p>
            </div>
            <HeroButton href="/contact">Request {service.title} Consultation</HeroButton>
          </div>
          <div className={reverse ? 'lg:order-1' : ''}>
            <div className="tilt-container">
              <div className="tilt-inner">
                <Image src={service.image} alt={service.title} fill className="object-cover rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { play } = useSound();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
          <GradientBackground />
          
          {/* HERO SECTION */}
          <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="text-center max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1A2A3A] mb-6 leading-tight"
              >
                Sacred Spaces.<br />
                <span className="bg-gradient-to-r from-[#C88A5D] to-[#E8B960] bg-clip-text text-transparent">
                  Limitless Potential.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-xl md:text-2xl text-[#1A2A3A]/70 max-w-3xl mx-auto mb-12"
              >
                India's Most Trusted Vastu Consultants — Serving Homes, Businesses, and Industries with Authentic Vedic Wisdom.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <HeroButton href="#residential">Explore Our Services</HeroButton>
              </motion.div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-[#C88A5D]/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#C88A5D] rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </motion.section>

          {/* TRUST BANNER */}
          <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-[#C88A5D]/20">
            <div className="container mx-auto px-6 text-center">
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#1A2A3A]/50 mb-6">Trusted by India's Leading Brands</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {['Mahindra Group', 'Adani', 'Tata Consultancy', 'Times of India', 'Bajaj Auto'].map(brand => (
                  <span key={brand} className="font-serif text-2xl md:text-3xl text-[#1A2A3A]/40 hover:text-[#C88A5D]/60 transition-colors cursor-default">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-4">
                Why Choose VedicUrja?
              </motion.h2>
              <p className="text-center text-[#1A2A3A]/60 max-w-2xl mx-auto mb-16">
                We bring authentic Vedic knowledge combined with modern diagnostic tools.
              </p>
              <div className="grid md:grid-cols-4 gap-8">
                {whyChooseUs.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C88A5D]/10 flex items-center justify-center">
                      <span className="text-2xl font-serif text-[#C88A5D]">{i + 1}</span>
                    </div>
                    <h4 className="font-serif text-xl text-[#1A2A3A] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#1A2A3A]/60">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICE SECTIONS */}
          {services.map((service, index) => (
            <ServiceSection key={service.id} service={service} reverse={index % 2 !== 0} />
          ))}

          {/* FAQ SECTION */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-4xl md:text-5xl text-center text-[#1A2A3A] mb-16">
                Frequently Asked Questions
              </motion.h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="border-b border-[#C88A5D]/20 pb-6">
                    <h4 className="font-serif text-xl text-[#1A2A3A] mb-2">{faq.q}</h4>
                    <p className="font-sans text-[#1A2A3A]/70">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-32 bg-gradient-to-r from-[#1A2A3A] to-[#1A2A3A]/90 text-white">
            <div className="container mx-auto px-6 text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-6xl mb-6">
                Ready to Transform Your Space?
              </motion.h2>
              <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">
                Book a private consultation with Acharya [Name] and discover how VedicUrja can unlock the hidden potential of your environment.
              </p>
              <HeroButton href="/contact">Schedule Your Consultation</HeroButton>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>

      {/* CSS for 3D Tilt Effect */}
      <style jsx global>{`
        .tilt-container {
          perspective: 1000px;
          width: 100%;
          height: 500px;
          border-radius: 24px;
        }
        .tilt-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
          transform-style: preserve-3d;
          border-radius: 24px;
          box-shadow: 0 30px 40px -15px rgba(0,0,0,0.2);
        }
        .tilt-container:hover .tilt-inner {
          transform: rotateX(5deg) rotateY(-8deg);
        }
      `}</style>
    </>
  );
}
