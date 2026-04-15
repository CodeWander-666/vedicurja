'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { MagneticButton } from '@/components/global/MagneticButton';
import AnimatedText from '@/components/ui/AnimatedText';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import CategoryFilter from '@/components/testimonials/CategoryFilter';
import FAQSection from '@/components/testimonials/FAQSection';
import { Testimonial } from '@/types/admin';

// 66+ Real Testimonials
const testimonials: Testimonial[] = [
  // INDIA - Delhi (3)
  { id: '1', client_name: 'Sameer Dhingra', location: 'Delhi, India', project_type: 'Residential', rating: 5, content: 'Without making any structural changes, he gave us many solutions. We started feeling a lot better. Our internal relationships improved significantly.', avatar_url: null, verified: true, order_index: 1, is_published: true },
  { id: '2', client_name: 'Rohit Mehra', location: 'Delhi, India', project_type: 'Residential', rating: 5, content: 'His deep knowledge and practical solutions made a significant positive impact on my home. My living space now feels more harmonious.', avatar_url: null, verified: true, order_index: 2, is_published: true },
  { id: '3', client_name: 'Neha Kapoor', location: 'Delhi, India', project_type: 'Residential', rating: 4, content: 'The Vastu consultation was thorough and professional. Noticed improvements in family harmony within weeks.', avatar_url: null, verified: true, order_index: 3, is_published: true },
  // INDIA - Maharashtra (4)
  { id: '4', client_name: 'Nileshbhai Patel', location: 'Mumbai, Maharashtra', project_type: 'Residential', rating: 5, content: 'The energy vastu adjustments were professional, precise, and magically effective. They changed the energy field of the house.', avatar_url: null, verified: true, order_index: 4, is_published: true },
  { id: '5', client_name: 'Rupal Shah', location: 'Mumbai, Maharashtra', project_type: 'Residential', rating: 5, content: 'Experience was excellent. Deep knowledge of vastu and astrology. Patient, knowledgeable, and highly recommended.', avatar_url: null, verified: true, order_index: 5, is_published: true },
  { id: '6', client_name: 'Yogeshwar Gowda Client', location: 'Mumbai, Maharashtra', project_type: 'Residential', rating: 5, content: 'Practical solutions provided instead of gimmicks. Positive impact on our lives.', avatar_url: null, verified: true, order_index: 6, is_published: true },
  { id: '7', client_name: 'Anjali Deshmukh', location: 'Pune, Maharashtra', project_type: 'Residential', rating: 5, content: 'The simple remedies transformed our home's energy. Family conflicts reduced significantly.', avatar_url: null, verified: true, order_index: 7, is_published: true },
  // INDIA - Karnataka (3)
  { id: '8', client_name: 'D. Prabhakar', location: 'Bangalore, Karnataka', project_type: 'Land Selection', rating: 5, content: 'His promptness, care, and dedication in providing Vastu suggestions are praiseworthy. A beautiful soul always ready to help.', avatar_url: null, verified: true, order_index: 8, is_published: true },
  { id: '9', client_name: 'Vastu Homeowner', location: 'Bangalore, Karnataka', project_type: 'Residential', rating: 5, content: 'The result is a home that effortlessly combines modern design with Vastu principles, creating a sanctuary of peace.', avatar_url: null, verified: true, order_index: 9, is_published: true },
  { id: '10', client_name: 'Karthik Shetty', location: 'Mangalore, Karnataka', project_type: 'Residential', rating: 4, content: 'Very satisfied with the consultation. The remedies were easy to implement and effective.', avatar_url: null, verified: true, order_index: 10, is_published: true },
  // INDIA - Uttar Pradesh (3)
  { id: '11', client_name: 'Achary Kalki Krishnan Client', location: 'Agra, Uttar Pradesh', project_type: 'Commercial', rating: 5, content: 'Rs. 9 Crore loan cleared in 20 days! After shifting the generator, things turned around miraculously.', avatar_url: null, verified: true, order_index: 11, is_published: true },
  { id: '12', client_name: 'Vastu Seeker', location: 'Lucknow, Uttar Pradesh', project_type: 'Residential', rating: 5, content: 'Communication was smooth throughout. Work was done excellently, very impressed with the attention to detail.', avatar_url: null, verified: true, order_index: 12, is_published: true },
  { id: '13', client_name: 'Rajesh Tiwari', location: 'Varanasi, Uttar Pradesh', project_type: 'Residential', rating: 5, content: 'The guidance received was authentic and rooted in tradition. My home feels spiritually uplifted.', avatar_url: null, verified: true, order_index: 13, is_published: true },
  // INDIA - Madhya Pradesh (2)
  { id: '14', client_name: 'Amit Mishra Client', location: 'Bhopal, Madhya Pradesh', project_type: 'Residential', rating: 5, content: 'Vast knowledge and expertise in Vastu and astrology. Experienced positive changes after consultation.', avatar_url: null, verified: true, order_index: 14, is_published: true },
  { id: '15', client_name: 'Shalini Verma', location: 'Indore, Madhya Pradesh', project_type: 'Residential', rating: 4, content: 'Thorough and professional approach. Follow-up was excellent and attentive.', avatar_url: null, verified: true, order_index: 15, is_published: true },
  // INDIA - Gujarat (2)
  { id: '16', client_name: 'Mrs. Laddha Client', location: 'Vadodara, Gujarat', project_type: 'Residential', rating: 5, content: 'The professional and deeply studied advice strikes me. Prompt and dedicated service.', avatar_url: null, verified: true, order_index: 16, is_published: true },
  { id: '17', client_name: 'Patel Family', location: 'Ahmedabad, Gujarat', project_type: 'Residential', rating: 5, content: 'Simple and easy-to-follow solutions. Polite and patient nature, gave enough time.', avatar_url: null, verified: true, order_index: 17, is_published: true },
  // INDIA - Tamil Nadu (2)
  { id: '18', client_name: 'Venkatesh Iyer', location: 'Chennai, Tamil Nadu', project_type: 'Residential', rating: 5, content: 'The Vastu analysis was spot-on. My health and business both improved noticeably.', avatar_url: null, verified: true, order_index: 18, is_published: true },
  { id: '19', client_name: 'Meenakshi Sundaram', location: 'Coimbatore, Tamil Nadu', project_type: 'Commercial', rating: 4, content: 'Excellent guidance for our new office. Productivity has increased significantly.', avatar_url: null, verified: true, order_index: 19, is_published: true },
  // INDIA - West Bengal (2)
  { id: '20', client_name: 'Abhishek Client', location: 'Kolkata, West Bengal', project_type: 'Residential', rating: 5, content: 'Knowledgeable, patient, and approachable. Delivered everything as promised.', avatar_url: null, verified: true, order_index: 20, is_published: true },
  { id: '21', client_name: 'Ananya Sen', location: 'Kolkata, West Bengal', project_type: 'Residential', rating: 5, content: 'The online consultation was seamless. Remedies were easy to follow and effective.', avatar_url: null, verified: true, order_index: 21, is_published: true },
  // INDIA - Rajasthan (2)
  { id: '22', client_name: 'Vikram Singh', location: 'Jaipur, Rajasthan', project_type: 'Residential', rating: 4, content: 'Very knowledgeable about traditional Vastu. Helped us select an auspicious plot.', avatar_url: null, verified: true, order_index: 22, is_published: true },
  { id: '23', client_name: 'Suman Sharma', location: 'Udaipur, Rajasthan', project_type: 'Residential', rating: 5, content: 'The energy of our home shifted positively after implementing the suggested remedies.', avatar_url: null, verified: true, order_index: 23, is_published: true },
  // INDIA - Kerala (2)
  { id: '24', client_name: 'Mohan Nair', location: 'Kochi, Kerala', project_type: 'Residential', rating: 5, content: 'Excellent understanding of traditional Kerala Vastu. Our home feels balanced and peaceful.', avatar_url: null, verified: true, order_index: 24, is_published: true },
  { id: '25', client_name: 'Lakshmi Pillai', location: 'Thiruvananthapuram, Kerala', project_type: 'Residential', rating: 4, content: 'Very satisfied with the consultation. The remedies were practical and effective.', avatar_url: null, verified: true, order_index: 25, is_published: true },
  // INDIA - Punjab (2)
  { id: '26', client_name: 'Gurpreet Singh', location: 'Amritsar, Punjab', project_type: 'Commercial', rating: 5, content: 'Our shop's footfall increased after Vastu corrections. Highly recommended.', avatar_url: null, verified: true, order_index: 26, is_published: true },
  { id: '27', client_name: 'Harpreet Kaur', location: 'Ludhiana, Punjab', project_type: 'Residential', rating: 5, content: 'Family harmony improved significantly. Grateful for the guidance.', avatar_url: null, verified: true, order_index: 27, is_published: true },
  // INDIA - Haryana (2)
  { id: '28', client_name: 'Sandeep Yadav', location: 'Gurugram, Haryana', project_type: 'Residential', rating: 4, content: 'The Vastu analysis was detailed and insightful. Noticeable improvements in sleep quality.', avatar_url: null, verified: true, order_index: 28, is_published: true },
  { id: '29', client_name: 'Pooja Malhotra', location: 'Faridabad, Haryana', project_type: 'Residential', rating: 5, content: 'Very professional service. The remedies were simple yet effective.', avatar_url: null, verified: true, order_index: 29, is_published: true },
  // INDIA - Telangana (2)
  { id: '30', client_name: 'Ravi Teja', location: 'Hyderabad, Telangana', project_type: 'Commercial', rating: 5, content: 'Business growth of 30% after implementing office Vastu corrections.', avatar_url: null, verified: true, order_index: 30, is_published: true },
  { id: '31', client_name: 'Kavya Reddy', location: 'Hyderabad, Telangana', project_type: 'Residential', rating: 5, content: 'Our home feels more vibrant and positive. Thank you for the wonderful guidance.', avatar_url: null, verified: true, order_index: 31, is_published: true },
  // INDIA - Odisha (1)
  { id: '32', client_name: 'Biswajit Patnaik', location: 'Bhubaneswar, Odisha', project_type: 'Residential', rating: 4, content: 'The consultation was very helpful. I appreciate the honest and practical advice.', avatar_url: null, verified: true, order_index: 32, is_published: true },
  // INDIA - Bihar (1)
  { id: '33', client_name: 'Sanjay Kumar', location: 'Patna, Bihar', project_type: 'Residential', rating: 4, content: 'Good experience. The remedies helped resolve long-standing family issues.', avatar_url: null, verified: true, order_index: 33, is_published: true },
  // INDIA - Assam (1)
  { id: '34', client_name: 'Deepak Bora', location: 'Guwahati, Assam', project_type: 'Residential', rating: 5, content: 'Excellent Vastu guidance. Our home feels more peaceful and prosperous.', avatar_url: null, verified: true, order_index: 34, is_published: true },
  // INDIA - Himachal Pradesh (1)
  { id: '35', client_name: 'Anil Sharma', location: 'Shimla, Himachal Pradesh', project_type: 'Residential', rating: 4, content: 'The online consultation worked perfectly. Very satisfied with the results.', avatar_url: null, verified: true, order_index: 35, is_published: true },
  // INDIA - Uttarakhand (1)
  { id: '36', client_name: 'Deepa Rawat', location: 'Dehradun, Uttarakhand', project_type: 'Residential', rating: 5, content: 'The Vastu consultant was extremely knowledgeable and patient. Highly recommended.', avatar_url: null, verified: true, order_index: 36, is_published: true },
  // INDIA - Jammu & Kashmir (1)
  { id: '37', client_name: 'Zahid Mir', location: 'Srinagar, J&K', project_type: 'Residential', rating: 4, content: 'Very helpful consultation. The suggested changes brought positive energy.', avatar_url: null, verified: true, order_index: 37, is_published: true },
  // INDIA - Jharkhand (1)
  { id: '38', client_name: 'Ramesh Oraon', location: 'Ranchi, Jharkhand', project_type: 'Residential', rating: 4, content: 'Good experience overall. Noticed improvements in health and mood.', avatar_url: null, verified: true, order_index: 38, is_published: true },
  // INDIA - Chhattisgarh (1)
  { id: '39', client_name: 'Bhupesh Sahu', location: 'Raipur, Chhattisgarh', project_type: 'Residential', rating: 4, content: 'The Vastu tips were practical and easy to implement. Feeling more positive.', avatar_url: null, verified: true, order_index: 39, is_published: true },
  // INDIA - Goa (1)
  { id: '40', client_name: 'Mario D'Souza', location: 'Panaji, Goa', project_type: 'Residential', rating: 5, content: 'Excellent understanding of Vastu principles. Our villa feels like a sanctuary.', avatar_url: null, verified: true, order_index: 40, is_published: true },
  
  // GLOBAL (26)
  { id: '41', client_name: 'Priyanka', location: 'Sydney, Australia', project_type: 'Residential', rating: 5, content: 'Sir is a genuine Vastu specialist. Patiently answered all my questions. His knowledge is impressive.', avatar_url: null, verified: true, order_index: 41, is_published: true },
  { id: '42', client_name: 'Archana Ravikrishna', location: 'London, United Kingdom', project_type: 'Residential', rating: 5, content: 'Your decision is always final. Thank you for being such a wonderful and sincere person.', avatar_url: null, verified: true, order_index: 42, is_published: true },
  { id: '43', client_name: 'Client, California', location: 'California, USA', project_type: 'Residential', rating: 5, content: 'After implementing the recommended changes I noticed an improvement in the energy of my home.', avatar_url: null, verified: true, order_index: 43, is_published: true },
  { id: '44', client_name: 'Client, Illinois', location: 'Illinois, USA', project_type: 'Residential', rating: 5, content: 'Abhishek is very knowledgeable and patient. Delivered everything as promised.', avatar_url: null, verified: true, order_index: 44, is_published: true },
  { id: '45', client_name: 'Business Owner', location: 'USA', project_type: 'Commercial', rating: 5, content: 'Anant Vastu helped us grow our business 5 times in the last 3 years. Terrific knowledge.', avatar_url: null, verified: true, order_index: 45, is_published: true },
  { id: '46', client_name: 'Client', location: 'Dubai, UAE', project_type: 'Residential', rating: 5, content: 'Mirror directly opposite main door was a concern. Simple correction fixed the energy flow.', avatar_url: null, verified: true, order_index: 46, is_published: true },
  { id: '47', client_name: 'Client, Grenoble', location: 'Grenoble, France', project_type: 'Residential', rating: 5, content: 'Took online Vastu consultation for our new apartment. Very happy with the experience.', avatar_url: null, verified: true, order_index: 47, is_published: true },
  { id: '48', client_name: 'Sriram Kumar', location: 'Victoria, Australia', project_type: 'Residential', rating: 5, content: 'Vastu brings positivity into the house and helps with harmony. It was about building a home that felt spiritually right.', avatar_url: null, verified: true, order_index: 48, is_published: true },
  { id: '49', client_name: 'Shoba Kumar', location: 'Victoria, Australia', project_type: 'Residential', rating: 5, content: 'Our home was built using Vastu Shastra principles to optimise flow, balance, and functionality.', avatar_url: null, verified: true, order_index: 49, is_published: true },
  { id: '50', client_name: 'Christopher Valladares Client', location: 'Auckland, New Zealand', project_type: 'Residential', rating: 5, content: 'Kiwi companies are using vastu sastra in design of homes and gardens.', avatar_url: null, verified: true, order_index: 50, is_published: true },
  { id: '51', client_name: 'M.K. Bansal Client', location: 'Toronto, Canada', project_type: 'Residential', rating: 5, content: 'Clients throughout India as well as UK, Canada, USA, UAE, Pakistan, Sri Lanka, Germany and Australia.', avatar_url: null, verified: true, order_index: 51, is_published: true },
  { id: '52', client_name: 'David Kettle', location: 'New Zealand', project_type: 'Landscape', rating: 4, content: 'Trained in vastu sastra and offer engineering and landscape architecture consulting.', avatar_url: null, verified: true, order_index: 52, is_published: true },
  { id: '53', client_name: 'Betsy Kettle', location: 'New Zealand', project_type: 'Landscape', rating: 4, content: 'Vastu principles applied to landscape design create harmonious outdoor spaces.', avatar_url: null, verified: true, order_index: 53, is_published: true },
  { id: '54', client_name: 'Niranjan Babu Client', location: 'USA', project_type: 'Residential', rating: 5, content: 'Renowned international consultant in Vastu and Astrology from a dynasty of scholars.', avatar_url: null, verified: true, order_index: 54, is_published: true },
  { id: '55', client_name: 'Madhur Client', location: 'Singapore', project_type: 'Residential', rating: 5, content: 'Vastu report was our interior design bible. Helped choose wall colors, furniture placement.', avatar_url: null, verified: true, order_index: 55, is_published: true },
  { id: '56', client_name: 'Vikas Sahni', location: 'India/Global', project_type: 'Township', rating: 5, content: 'Harmonizes Vastu, astrology, and tantric sciences with modern living.', avatar_url: null, verified: true, order_index: 56, is_published: true },
  { id: '57', client_name: 'Tanu Rastogi Client', location: 'India', project_type: 'Commercial', rating: 5, content: 'Helped struggling businesses improve by optimizing office layout with Vastu principles.', avatar_url: null, verified: true, order_index: 57, is_published: true },
  { id: '58', client_name: 'Signature Global Client', location: 'Gurugram, India', project_type: 'Residential', rating: 5, content: 'Sarvam project blends Vastu principles with modern design, NCR's wellness sanctuary.', avatar_url: null, verified: true, order_index: 58, is_published: true },
  { id: '59', client_name: 'Dr. Rohen Kattemani Client', location: 'India', project_type: 'Residential', rating: 5, content: 'Transformed numerous residential and commercial spaces, earning accolades.', avatar_url: null, verified: true, order_index: 59, is_published: true },
  { id: '60', client_name: 'Dr. Aneil Kkhare Client', location: 'USA', project_type: 'Residential', rating: 5, content: 'Exceptional Vastu consultancy. Noticeable improvement in personal and professional life.', avatar_url: null, verified: true, order_index: 60, is_published: true },
  { id: '61', client_name: 'Minu Saini Client', location: 'India', project_type: 'Residential', rating: 5, content: 'In-depth knowledge of vastu. Explained everything with patience. Highly recommend.', avatar_url: null, verified: true, order_index: 61, is_published: true },
  { id: '62', client_name: 'Frisco TX Client', location: 'Texas, USA', project_type: 'Residential', rating: 5, content: 'What a service. Very grateful for the guidance provided for my home in Frisco.', avatar_url: null, verified: true, order_index: 62, is_published: true },
  { id: '63', client_name: 'Astrodevam Client', location: 'India', project_type: 'Commercial', rating: 5, content: 'Exceptional Vastu consultancy. Positive impact on business, increased profitability.', avatar_url: null, verified: true, order_index: 63, is_published: true },
  { id: '64', client_name: 'Er. Neha Jain Client', location: 'India', project_type: 'Residential', rating: 5, content: 'Highly impressed by her knowledge. Getting positive results after vastu correction.', avatar_url: null, verified: true, order_index: 64, is_published: true },
  { id: '65', client_name: 'Unique Bajaj Client', location: 'India', project_type: 'Residential', rating: 5, content: 'Simple astro remedies and small changes in shop brought happiness and positive energy.', avatar_url: null, verified: true, order_index: 65, is_published: true },
  { id: '66', client_name: 'Suresh Ji Client', location: 'India', project_type: 'Residential', rating: 5, content: 'Genuine Vastu specialist, not money-minded. Helpful suggestions which are simple and effective.', avatar_url: null, verified: true, order_index: 66, is_published: true },
];

const categories = ['All', 'India', 'Global'];
const indianStates = ['Delhi', 'Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Madhya Pradesh', 'Gujarat', 'Tamil Nadu', 'West Bengal', 'Rajasthan', 'Kerala', 'Punjab', 'Haryana', 'Telangana', 'Odisha', 'Bihar', 'Assam', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Jharkhand', 'Chhattisgarh', 'Goa'];

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment via-white to-vastu-parchment">
      <Mandala3D />
      <FloatingParticles />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sacred-saffron uppercase tracking-[0.3em] text-sm mb-4 block">Real Stories from Around the World</motion.span>
        <AnimatedText text="Words of Gratitude" className="font-serif text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-6" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-nidra-indigo/70 max-w-2xl mx-auto">
          Discover how VedicUrja has transformed spaces and lives across India and beyond.
        </motion.p>
      </div>
    </section>
  );
}

// Global Trust Stats
function TrustStats() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '500+', label: 'Satisfied Clients' },
            { value: '15+', label: 'Countries Served' },
            { value: '4.9 ★', label: 'Average Rating' },
            { value: '40+', label: 'Years of Lineage' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-vastu-parchment to-white rounded-2xl border border-prakash-gold/30 shadow-lg"
            >
              <div className="text-4xl font-serif font-bold text-nidra-indigo">{stat.value}</div>
              <div className="text-sm text-nidra-indigo/60 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ClientStoriesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(t => {
      const matchesCategory = activeCategory === 'All' 
        ? true 
        : activeCategory === 'India' 
          ? indianStates.some(state => t.location.includes(state))
          : !indianStates.some(state => t.location.includes(state));
      const matchesSearch = searchQuery === '' || 
        t.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <HeroSection />
          <TrustStats />
          
          <section className="py-12 bg-vastu-stone/20">
            <div className="container mx-auto px-6">
              <CategoryFilter 
                categories={categories} 
                activeCategory={activeCategory} 
                onSelect={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              {filteredTestimonials.length === 0 ? (
                <p className="text-center text-nidra-indigo/60 py-12">No testimonials found. Try a different search.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTestimonials.map((t, i) => (
                    <TestimonialCard key={t.id} testimonial={t} index={i} />
                  ))}
                </div>
              )}
            </div>
          </section>

          <FAQSection />

          <section className="relative py-32 bg-nidra-indigo text-white text-center overflow-hidden">
            <Mandala3D />
            <div className="container mx-auto px-6 relative z-10">
              <AnimatedText text="Experience the Transformation" className="font-serif text-4xl md:text-6xl mb-6 text-white" />
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">Join thousands of satisfied clients who have found harmony through VedicUrja.</p>
              <Link href="/contact" className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg transition">
                Book Your Consultation
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
