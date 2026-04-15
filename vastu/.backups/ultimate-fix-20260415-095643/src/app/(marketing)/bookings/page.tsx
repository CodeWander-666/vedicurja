'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { MagneticButton } from '@/components/global/MagneticButton';
import { TestimonialsSlider } from '@/components/sections/home/TestimonialsSlider';
import PaymentSimulationModal from '@/components/ui/PaymentSimulationModal';
import MeetingRoom from '@/components/sections/dashboard/MeetingRoom';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import type { Consultation } from '@/types/admin';

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
interface AvailabilitySlot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

// ----------------------------------------------------------------------
// Section 1: Hero
// ----------------------------------------------------------------------
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section ref={ref} style={{ opacity }} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment to-white">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }} className="w-[800px] h-[800px]">
          <div className="w-full h-full rounded-full border-2 border-prakash-gold/30" />
          <div className="absolute inset-8 rounded-full border border-sacred-saffron/20" />
          <div className="absolute inset-16 rounded-full border border-kumkuma-red/15" />
        </motion.div>
      </div>
      <motion.div style={{ y }} className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sacred-saffron uppercase tracking-[0.3em] text-sm mb-4 block">Virtual Consultation</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-6">Ancient Wisdom.<br /><span className="text-prakash-gold">Modern Connection.</span></motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-nidra-indigo/70 max-w-2xl mx-auto mb-10">Experience personalised Vastu guidance from anywhere in the world via secure video call.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton className="luxury-button"><button onClick={() => document.getElementById('scheduler')?.scrollIntoView({ behavior: 'smooth' })}>Book Your Session</button></MagneticButton>
          <MagneticButton className="bg-transparent border-2 border-prakash-gold text-nidra-indigo hover:bg-prakash-gold/10 px-8 py-4 rounded-full"><Link href="#how-it-works">How It Works</Link></MagneticButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Section 2: The Problem
// ----------------------------------------------------------------------
function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-nidra-indigo mb-6">Traveling to a consultant is impractical.</h2>
        <p className="text-lg text-nidra-indigo/70">You deserve trusted Vastu guidance without leaving the comfort of your home or office.</p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 3: The Solution
// ----------------------------------------------------------------------
function SolutionSection() {
  return (
    <section className="py-20 bg-vastu-stone/30">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-nidra-indigo mb-6">Introducing VedicUrja Virtual Consultations.</h2>
        <p className="text-lg text-nidra-indigo/70">Personalised Vastu analysis, screen sharing, and real‑time remedies – all online, all secure.</p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 4: How It Works (Stepper)
// ----------------------------------------------------------------------
function HowItWorksSection() {
  const steps = ['Choose a time slot', 'Complete payment', 'Receive meeting link', 'Join & transform'];
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-16">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="text-center w-40">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-prakash-gold/20 flex items-center justify-center text-2xl font-bold text-nidra-indigo">{i+1}</div>
              <p className="font-medium text-nidra-indigo">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 5: Meet Acharya
// ----------------------------------------------------------------------
function MeetAcharyaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-vastu-parchment">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 max-w-5xl">
        <div className="md:w-1/3 flex justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-sacred-saffron to-prakash-gold flex items-center justify-center text-6xl">🧘</div>
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="font-serif text-3xl text-nidra-indigo mb-4">Acharya Sharma</h2>
          <p className="text-sacred-saffron uppercase tracking-wider text-sm mb-4">4th Generation Vastu Guru</p>
          <p className="text-nidra-indigo/70">With over four decades of experience and 500+ clients globally, Acharya brings authentic Vedic wisdom to every consultation.</p>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 6: Benefits
// ----------------------------------------------------------------------
function BenefitsSection() {
  const benefits = ['No travel required', 'Session recording available', 'Screen share floor plans', 'Post‑consult summary'];
  return (
    <section className="py-20 bg-vastu-stone/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-serif text-3xl text-center text-nidra-indigo mb-12">Why Virtual?</h2>
        <div className="grid grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/50 p-4 rounded-xl"><span className="text-prakash-gold text-xl">✓</span><span>{b}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 7: Pricing
// ----------------------------------------------------------------------
function PricingSection({ onSelect }: { onSelect: (price: number) => void }) {
  const plans = [
    { name: 'Single Session', price: 2499, duration: '60 minutes' },
    { name: '3‑Session Package', price: 5999, duration: '3 x 60 minutes', popular: true },
    { name: 'Premium Annual', price: 14999, duration: 'Unlimited sessions' },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Transparent Pricing</h2>
        <p className="text-center text-nidra-indigo/60 mb-12">Choose the plan that fits your needs</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className={`relative p-6 rounded-2xl border ${p.popular ? 'border-prakash-gold shadow-xl' : 'border-prakash-gold/20'} bg-white`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sacred-saffron text-white px-4 py-1 rounded-full text-xs">Most Popular</span>}
              <h3 className="font-serif text-xl mb-2">{p.name}</h3>
              <p className="text-3xl font-bold text-nidra-indigo">₹{p.price}</p>
              <p className="text-sm text-nidra-indigo/60 mb-4">{p.duration}</p>
              <button onClick={() => onSelect(p.price)} className="w-full py-2 border border-prakash-gold rounded-full text-prakash-gold hover:bg-prakash-gold hover:text-white transition">Select</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 8: Scheduler (FullCalendar)
// ----------------------------------------------------------------------
function SchedulerSection({ onSlotSelect, selectedPrice }: { onSlotSelect: (slot: AvailabilitySlot) => void; selectedPrice: number | null }) {
  const { items: slots } = useRealtimeContent<AvailabilitySlot>('consultation_availability', 'start_time');
  const availableSlots = slots.filter(s => !s.is_booked);

  const events = availableSlots.map(s => ({ title: 'Available', start: s.start_time, end: s.end_time, backgroundColor: '#C88A5D', borderColor: '#C88A5D' }));

  const handleEventClick = (info: any) => {
    const slot = availableSlots.find(s => s.start_time === info.event.startStr && s.end_time === info.event.endStr);
    if (slot && selectedPrice) onSlotSelect(slot);
  };

  return (
    <section id="scheduler" className="py-24 bg-vastu-parchment">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Choose Your Time</h2>
        <p className="text-center text-nidra-indigo/60 mb-8">Select an available slot (all times in your local timezone)</p>
        {selectedPrice ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridWeek,dayGridMonth' }}
            events={events}
            eventClick={handleEventClick}
            height="auto"
            slotMinTime="09:00:00"
            slotMaxTime="17:00:00"
            allDaySlot={false}
          />
        ) : (
          <p className="text-center text-nidra-indigo/60">Please select a pricing plan above first.</p>
        )}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 9: Your Upcoming Meeting (Dashboard)
// ----------------------------------------------------------------------
function UpcomingMeetingSection() {
  const { user } = useAuth();
  const { items: consultations } = useRealtimeContent<Consultation>('consultations', 'scheduled_at');
  const upcoming = consultations.find(c => c.client_id === user?.id && (c.status === 'scheduled' || c.status === 'in_progress'));

  if (!upcoming) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-serif text-3xl text-center text-nidra-indigo mb-8">Your Upcoming Meeting</h2>
        <div className="bg-vastu-stone/20 p-6 rounded-2xl">
          <p className="text-center mb-4">Scheduled for {new Date(upcoming.scheduled_at).toLocaleString()}</p>
          <CountdownTimer targetDate={upcoming.scheduled_at} />
          <div className="mt-8">
            <MeetingRoom
              consultationId={upcoming.id}
              scheduledAt={upcoming.scheduled_at}
              status={upcoming.status}
              meetingUrl={upcoming.meeting_url || null}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 10: Testimonials
// ----------------------------------------------------------------------
function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-vastu-parchment overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Trusted by Seekers Worldwide</h2>
        <TestimonialsSlider />
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 11: FAQ
// ----------------------------------------------------------------------
function FAQSection() {
  const faqs = [
    { q: 'What if I’m not tech‑savvy?', a: 'We’ll guide you through a simple one‑click join process.' },
    { q: 'Is virtual consultation as effective?', a: 'Yes, Acharya uses screen sharing to analyse floor plans just like in person.' },
    { q: 'Can I reschedule?', a: 'You can reschedule up to 24 hours before your session.' },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-serif text-3xl text-center text-nidra-indigo mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-vastu-stone/20 p-4 rounded-xl">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-nidra-indigo/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Section 12: Final CTA
// ----------------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="py-32 bg-nidra-indigo text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-6xl mb-6">Ready to Harmonise Your Space?</h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">Book your virtual consultation now and begin your transformation.</p>
        <button onClick={() => document.getElementById('scheduler')?.scrollIntoView({ behavior: 'smooth' })} className="bg-prakash-gold hover:bg-sacred-saffron text-nidra-indigo font-bold px-10 py-5 rounded-full text-lg">Book Your Session</button>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function BookingsPage() {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuth();

  const handleSelectPlan = (price: number) => {
    setSelectedPrice(price);
    document.getElementById('scheduler')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !selectedSlot) return;
    const meetingUrl = `https://meet.jit.si/VedicUrja-${Date.now()}`;
    await supabase.from('consultations').insert({
      client_id: user.id,
      scheduled_at: selectedSlot.start_time,
      duration_minutes: 60,
      status: 'scheduled',
      meeting_url: meetingUrl,
      payment_status: 'paid',
    });
    await supabase.from('consultation_availability').update({ is_booked: true, consultation_id: null }).eq('id', selectedSlot.id);
    setShowPayment(false);
    window.location.reload();
  };

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <MeetAcharyaSection />
          <BenefitsSection />
          <PricingSection onSelect={handleSelectPlan} />
          <SchedulerSection onSlotSelect={handleSlotSelect} selectedPrice={selectedPrice} />
          <UpcomingMeetingSection />
          <TestimonialsSection />
          <FAQSection />
          <FinalCTA />
        </main>
        <Footer />
      </SmoothScroll>
      <PaymentSimulationModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        tool="Virtual Consultation"
        amount={selectedPrice || 2499}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}
