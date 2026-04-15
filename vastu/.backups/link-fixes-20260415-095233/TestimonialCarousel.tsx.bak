'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

const testimonials = [
  { quote: "Acharya's Vastu guidance has been integral to Mahindra's expansion. We consult before every major project.", author: "Dr. Anish Shah", role: "MD & CEO, Mahindra Group", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { quote: "The energy in our new headquarters is palpable. Productivity is up, and attrition is down.", author: "Karan Adani", role: "CEO, Adani Ports & SEZ", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { quote: "We've seen a 40% increase in walk-ins since optimising our showroom entrance. Vastu works.", author: "Rahul Bajaj", role: "Chairman, Bajaj Auto", image: "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150" },
];

export default function TestimonialCarousel() {
  const { play } = useSound();
  return (
    <section className="py-24 bg-gradient-to-b from-[#F9F6F0] to-white">
      <div className="container mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-4xl text-center text-[#1A2A3A] mb-4">Trusted by Visionaries</motion.h2>
        <p className="text-center text-[#1A2A3A]/60 mb-16">Hear from the industry leaders who rely on VedicUrja</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-3xl shadow-xl border border-[#C88A5D]/10" onMouseEnter={() => play('hoverCard')}>
              <div className="flex items-center gap-4 mb-6">
                <img src={t.image} alt={t.author} className="w-16 h-16 rounded-full object-cover border-2 border-[#C88A5D]" />
                <div><p className="font-sans font-semibold text-[#1A2A3A]">{t.author}</p><p className="text-sm text-[#C88A5D]">{t.role}</p></div>
              </div>
              <p className="font-serif text-lg text-[#1A2A3A] italic">"{t.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
