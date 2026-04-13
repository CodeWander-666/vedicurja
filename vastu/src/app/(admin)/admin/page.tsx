'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0, consultations: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: courses } = await supabase.from('courses').select('*', { count: 'exact', head: true });
      const { count: consultations } = await supabase.from('consultations').select('*', { count: 'exact', head: true });
      setStats({ users: users || 0, courses: courses || 0, consultations: consultations || 0 });
    };
    fetchStats();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="font-serif text-4xl text-text-primary mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-surface-card p-6 rounded-2xl border border-border-light">
            <p className="text-3xl font-serif text-ganga-sandstone">{stats.users}</p>
            <p className="text-text-secondary">Total Users</p>
          </div>
          <div className="bg-surface-card p-6 rounded-2xl border border-border-light">
            <p className="text-3xl font-serif text-ganga-sandstone">{stats.courses}</p>
            <p className="text-text-secondary">Active Courses</p>
          </div>
          <div className="bg-surface-card p-6 rounded-2xl border border-border-light">
            <p className="text-3xl font-serif text-ganga-sandstone">{stats.consultations}</p>
            <p className="text-text-secondary">Consultations</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
