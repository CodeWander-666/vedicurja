'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

// Types
interface AvailabilitySlot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface Consultation {
  id: string;
  scheduled_at: string;
  status: string;
  meeting_url: string | null;
  payment_status: string;
}

// ----------------------------------------------------------------------
// Section Components (simplified for focus on booking workflow)
// ----------------------------------------------------------------------
function HeroSection() { /* same as before, scroll CTA to scheduler */ return null; }
function ProblemSection() { return null; }
function SolutionSection() { return null; }
function HowItWorksSection() { return null; }
function MeetAcharyaSection() { return null; }
function BenefitsSection() { return null; }

function PricingSection({ onSelect, selectedPrice }: { onSelect: (price: number) => void; selectedPrice: number | null }) {
  const plans = [
    { name: 'Single Session', price: 2499 },
    { name: '3‑Session Package', price: 5999, popular: true },
    { name: 'Premium Annual', price: 14999 },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className={`relative p-6 rounded-2xl border ${p.popular ? 'border-prakash-gold shadow-xl' : 'border-prakash-gold/20'} bg-white`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sacred-saffron text-white px-4 py-1 rounded-full text-xs">Most Popular</span>}
              <h3 className="font-serif text-xl mb-2">{p.name}</h3>
              <p className="text-3xl font-bold text-nidra-indigo">₹{p.price}</p>
              <button
                onClick={() => onSelect(p.price)}
                className={`w-full py-2 mt-4 rounded-full transition ${selectedPrice === p.price ? 'bg-prakash-gold text-white' : 'border border-prakash-gold text-prakash-gold hover:bg-prakash-gold hover:text-white'}`}
              >
                {selectedPrice === p.price ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchedulerSection({ 
  onSlotSelect, 
  selectedPrice 
}: { 
  onSlotSelect: (slot: AvailabilitySlot) => void; 
  selectedPrice: number | null;
}) {
  const { items: slots, loading } = useRealtimeContent<AvailabilitySlot>('consultation_availability', 'start_time');
  const availableSlots = slots.filter(s => !s.is_booked);
  
  const events = availableSlots.map(s => ({
    title: 'Available',
    start: s.start_time,
    end: s.end_time,
    backgroundColor: '#C88A5D',
    borderColor: '#C88A5D',
    extendedProps: { slot: s }
  }));

  const handleEventClick = (info: any) => {
    const slot = info.event.extendedProps.slot as AvailabilitySlot;
    if (slot && selectedPrice) {
      onSlotSelect(slot);
    }
  };

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <section id="scheduler" className="py-24 bg-vastu-parchment">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Choose Your Time</h2>
        <p className="text-center text-nidra-indigo/60 mb-8">All times shown in your local timezone</p>
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

function UpcomingMeetingSection({ consultation }: { consultation: Consultation }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-serif text-3xl text-center text-nidra-indigo mb-8">Your Upcoming Meeting</h2>
        <div className="bg-vastu-stone/20 p-6 rounded-2xl">
          <p className="text-center mb-4">Scheduled for {new Date(consultation.scheduled_at).toLocaleString()}</p>
          <CountdownTimer targetDate={consultation.scheduled_at} />
          <div className="mt-8">
            <MeetingRoom
              consultationId={consultation.id}
              scheduledAt={consultation.scheduled_at}
              status={consultation.status}
              meetingUrl={consultation.meeting_url}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() { return <TestimonialsSlider />; }
function FAQSection() { return null; }
function FinalCTA() { return null; }

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function BookingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [upcomingConsultation, setUpcomingConsultation] = useState<Consultation | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  // Fetch user's upcoming consultation
  useEffect(() => {
    if (!user) return;
    const fetchUpcoming = async () => {
      const { data } = await supabase
        .from('consultations')
        .select('*')
        .eq('client_id', user.id)
        .in('status', ['scheduled', 'in_progress'])
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .single();
      if (data) setUpcomingConsultation(data as Consultation);
    };
    fetchUpcoming();
  }, [user]);

  const handleSelectPlan = (price: number) => {
    setSelectedPrice(price);
    document.getElementById('scheduler')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    if (!user) {
      // Save intended action and redirect to signin
      sessionStorage.setItem('booking_intent', JSON.stringify({ price: selectedPrice, slotId: slot.id }));
      router.push('/signin?redirect=/bookings');
      return;
    }
    setSelectedSlot(slot);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !selectedSlot || !selectedPrice) return;
    setBookingInProgress(true);
    try {
      const meetingUrl = `https://meet.jit.si/VedicUrja-${Date.now()}`;
      // Create consultation
      const { data: consultation, error: consultError } = await supabase
        .from('consultations')
        .insert({
          client_id: user.id,
          scheduled_at: selectedSlot.start_time,
          duration_minutes: 60,
          status: 'scheduled',
          meeting_url: meetingUrl,
          payment_status: 'paid',
        })
        .select()
        .single();
      if (consultError) throw consultError;
      
      // Mark slot as booked
      await supabase
        .from('consultation_availability')
        .update({ is_booked: true, consultation_id: consultation.id })
        .eq('id', selectedSlot.id);
      
      setUpcomingConsultation(consultation as Consultation);
      setShowPayment(false);
      // Scroll to meeting section
      document.getElementById('upcoming-meeting')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    } finally {
      setBookingInProgress(false);
    }
  };

  // Check for return from signin with booking intent
  useEffect(() => {
    if (user && !authLoading) {
      const intentStr = sessionStorage.getItem('booking_intent');
      if (intentStr) {
        try {
          const intent = JSON.parse(intentStr);
          setSelectedPrice(intent.price);
          // Find the slot by ID and trigger payment
          const fetchSlotAndPay = async () => {
            const { data: slot } = await supabase
              .from('consultation_availability')
              .select('*')
              .eq('id', intent.slotId)
              .single();
            if (slot && !slot.is_booked) {
              setSelectedSlot(slot);
              setShowPayment(true);
            }
            sessionStorage.removeItem('booking_intent');
          };
          fetchSlotAndPay();
        } catch {}
      }
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          <PricingSection onSelect={handleSelectPlan} selectedPrice={selectedPrice} />
          <SchedulerSection onSlotSelect={handleSlotSelect} selectedPrice={selectedPrice} />
          {upcomingConsultation && (
            <div id="upcoming-meeting">
              <UpcomingMeetingSection consultation={upcomingConsultation} />
            </div>
          )}
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
        userId={user?.id}
      />
      {bookingInProgress && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center">
            <div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Confirming your booking...</p>
          </div>
        </div>
      )}
    </>
  );
}

<style jsx global>{`
  /* Luxury 3D slot effect */
  .fc-event {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) !important;
    transform-style: preserve-3d !important;
    perspective: 1000px !important;
    cursor: pointer !important;
    border: none !important;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
  }
  .fc-event:hover {
    transform: translateZ(20px) scale(1.02) !important;
    box-shadow: 0 20px 30px -8px rgba(200,138,93,0.4), 0 0 0 2px rgba(232,185,96,0.5) !important;
    z-index: 100 !important;
  }
  .fc-event .fc-event-title {
    font-weight: 600 !important;
    padding: 4px 8px !important;
  }
  .fc-timegrid-event .fc-event-main {
    padding: 4px 8px !important;
  }
  /* Calendar luxury styling */
  .fc {
    --fc-border-color: rgba(232,185,96,0.2) !important;
    --fc-page-bg-color: transparent !important;
    --fc-neutral-bg-color: rgba(249,246,240,0.5) !important;
  }
  .fc-toolbar-title {
    font-family: var(--font-cormorant), serif !important;
    color: #1A2A3A !important;
  }
  .fc-button {
    background: rgba(200,138,93,0.1) !important;
    border: 1px solid rgba(232,185,96,0.3) !important;
    color: #1A2A3A !important;
    border-radius: 40px !important;
    padding: 8px 16px !important;
    font-weight: 500 !important;
    transition: all 0.3s !important;
  }
  .fc-button:hover {
    background: rgba(200,138,93,0.2) !important;
    border-color: #E8B960 !important;
  }
  .fc-button-active {
    background: #C88A5D !important;
    color: white !important;
  }
`}</style>

<style jsx>{`
  .meeting-dashboard-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .meeting-dashboard-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
`}</style>
