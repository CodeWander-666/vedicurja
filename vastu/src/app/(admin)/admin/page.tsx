'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { HomeSection, FreeTool, Service, Course, BlogPost, Testimonial, Consultation, Payment, Profile } from '@/types/admin';

const tabs = ['Dashboard', 'Home', 'Free Tools', 'Services', 'Courses', 'Blogs', 'Testimonials', 'Bookings', 'Payments', 'Users'] as const;
type Tab = typeof tabs[number];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl text-nidra-indigo mb-8">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2 border-b border-prakash-gold/20 pb-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm transition ${activeTab === tab ? 'bg-sacred-saffron text-white' : 'bg-vastu-stone text-nidra-indigo'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              {activeTab === 'Dashboard' && <DashboardTab />}
              {activeTab === 'Home' && <HomeTab />}
              {activeTab === 'Free Tools' && <FreeToolsTab />}
              {activeTab === 'Services' && <ServicesTab />}
              {activeTab === 'Courses' && <CoursesTab />}
              {activeTab === 'Blogs' && <BlogsTab />}
              {activeTab === 'Testimonials' && <TestimonialsTab />}
              {activeTab === 'Bookings' && <BookingsTab />}
              {activeTab === 'Payments' && <PaymentsTab />}
              {activeTab === 'Users' && <UsersTab />}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

function DashboardTab() {
  return <div className="grid grid-cols-4 gap-6">Dashboard Overview (Coming soon)</div>;
}

function HomeTab() {
  const { items } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function FreeToolsTab() {
  const { items } = useRealtimeContent<FreeTool>('free_tools', 'order_index');
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function ServicesTab() {
  const { items } = useRealtimeContent<Service>('services', 'order_index');
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function CoursesTab() {
  const { items } = useRealtimeContent<Course>('courses', 'created_at', false);
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function BlogsTab() {
  const { items } = useRealtimeContent<BlogPost>('blog_posts', 'published_at', false);
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function TestimonialsTab() {
  const { items } = useRealtimeContent<Testimonial>('testimonials', 'order_index');
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function BookingsTab() {
  const { items } = useRealtimeContent<Consultation>('consultations', 'scheduled_at', false);
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function PaymentsTab() {
  const { items } = useRealtimeContent<Payment>('payments', 'created_at', false);
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}

function UsersTab() {
  const { items } = useRealtimeContent<Profile>('profiles', 'created_at', false);
  return <pre className="bg-white p-4 rounded">{JSON.stringify(items, null, 2)}</pre>;
}
