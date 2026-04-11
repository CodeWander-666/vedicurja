'use client';
import { motion } from 'framer-motion';
import { ServiceCard3D } from './ServiceCard3D';

const services = [
  {
    title: 'Residential Vastu',
    description: 'Harmonise your home with cosmic principles. We analyse every room to enhance peace, health, and prosperity.',
    icon: '🏡',
    benefits: ['Better Sleep', 'Family Harmony', 'Financial Flow'],
    href: '/services/service?slug=residential-vastu',
    colorGradient: 'linear-gradient(135deg, #F9F6F0 0%, #E8B960 100%)',
  },
  {
    title: 'Commercial Vastu',
    description: 'Align your business space to attract abundance. From office layouts to retail energy optimisation.',
    icon: '🏢',
    benefits: ['Increased Revenue', 'Team Cohesion', 'Client Retention'],
    href: '/services/service?slug=commercial-vastu',
    colorGradient: 'linear-gradient(135deg, #F9F6F0 0%, #C88A5D 100%)',
  },
  {
    title: 'Land & Plot Selection',
    description: 'Ensure your foundation is auspicious. We evaluate land energy before you build or purchase.',
    icon: '🌍',
    benefits: ['Ideal Orientation', 'Soil Analysis', 'Future Prospects'],
    href: '/services/service?slug=land-selection',
    colorGradient: 'linear-gradient(135deg, #F9F6F0 0%, #D4A373 100%)',
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-4">
          Sacred Services for Modern Living
        </h2>
        <p className="font-sans text-lg text-[#1A2A3A]/60 max-w-2xl mx-auto">
          Ancient Vastu principles applied with contemporary precision
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto place-items-center">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <ServiceCard3D {...service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default ServicesGrid;
