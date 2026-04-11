'use client';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/global/MagneticButton';
import { useSound } from '@/hooks/useSound';

export function CTASection() {
  const { play } = useSound();

  const handleClick = () => {
    play('clickPrimary');
  };

  return (
    <section className="py-32 bg-gradient-to-br from-[#1A2A3A] to-[#1A2A3A]/90 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Book a private consultation with Acharya [Name] and begin your journey toward harmony.
          </p>
          <MagneticButton
            className="bg-[#E8B960] hover:bg-[#C88A5D] text-[#1A2A3A] font-sans px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-lg"
            onClick={handleClick}
          >
            Schedule Your Consultation
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
export default CTASection;
