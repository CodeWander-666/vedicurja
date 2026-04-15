import GlobalLoader from '@/components/ui/GlobalLoader';
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import SupportTicketForm from '@/components/account/SupportTicketForm';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { supabase } from '@/lib/supabaseClient';
import { uploadAvatar } from '@/lib/uploadAvatar';
import { Payment, Consultation } from '@/types/admin';

export default function AccountPage() {
  const { user, profile, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [uploading, setUploading] = useState(false);
  const [passwordRequested, setPasswordRequested] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { items: payments } = useRealtimeContent<Payment>('payments', 'created_at', false);
  const { items: consultations } = useRealtimeContent<Consultation>('consultations', 'scheduled_at', false);

  const userPayments = payments.filter(p => p.user_id === user?.id);
  const upcomingConsultations = consultations.filter(c => 
    c.client_id === user?.id && (c.status === 'scheduled' || c.status === 'in_progress')
  );
  const pastConsultations = consultations.filter(c => 
    c.client_id === user?.id && c.status === 'completed'
  );

  const isStudent = profile?.role === 'client'; // Students have coins, admins may not

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const url = await uploadAvatar(user.id, file);
    if (url) {
      await supabase.from('profiles').update({ avatar_url: url }).eq('id', user.id);
      setAvatarUrl(url);
    }
    setUploading(false);
  };

  const handleNameUpdate = async () => {
    if (!user) return;
    await supabase.from('profiles').update({ full_name: displayName }).eq('id', user.id);
  };

  const handlePasswordResetRequest = async () => {
    if (!user) return;
    await supabase.from('support_tickets').insert({
      user_id: user.id,
      subject: 'Password Reset Request',
      message: `User ${user.email} requests a password reset.`,
    });
    setPasswordRequested(true);
    setTimeout(() => setPasswordRequested(false), 3000);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <>
      <LuxuryCursor /><SoundController /><Header />
      <SmoothScroll>
        <main className="pt-28 pb-20 px-6 min-h-screen bg-vastu-parchment">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl text-nidra-indigo mb-8">Your Account</h1>

            {/* Profile Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-prakash-gold/30 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-prakash-gold bg-vastu-stone">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="Avatar" width={96} height={96} className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🧘</div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 bg-prakash-gold text-white rounded-full p-1 text-xs"
                  >
                    📷
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      className="text-2xl font-serif bg-transparent border-b border-prakash-gold/30 focus:border-prakash-gold outline-none"
                    />
                    <button onClick={handleNameUpdate} className="text-sm text-prakash-gold">Update</button>
                  </div>
                  <p className="text-nidra-indigo/60">{user?.email}</p>
                  {isStudent && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-prakash-gold to-sacred-saffron text-white px-4 py-1 rounded-full text-sm">
                      <span>⭐</span> {profile?.coins || 0} Wisdom Coins
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Billing Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-prakash-gold/20 overflow-hidden">
                <button onClick={() => toggleSection('billing')} className="w-full p-6 text-left flex justify-between items-center">
                  <span className="font-serif text-xl">💰 Billing History</span>
                  <span className="text-2xl text-prakash-gold">{activeSection === 'billing' ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {activeSection === 'billing' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 border-t border-prakash-gold/20">
                        {userPayments.length === 0 ? (
                          <p className="text-nidra-indigo/60">No billing history yet.</p>
                        ) : (
                          <table className="w-full text-sm">
                            <thead><tr className="border-b"><th className="py-2 text-left">Date</th><th>Amount</th><th>Status</th></tr></thead>
                            <tbody>
                              {userPayments.map(p => (
                                <tr key={p.id} className="border-b"><td className="py-2">{new Date(p.created_at).toLocaleDateString()}</td><td>₹{p.amount}</td><td className="capitalize">{p.status}</td></tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bookings Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-prakash-gold/20 overflow-hidden">
                <button onClick={() => toggleSection('bookings')} className="w-full p-6 text-left flex justify-between items-center">
                  <span className="font-serif text-xl">📅 Your Consultations</span>
                  <span className="text-2xl text-prakash-gold">{activeSection === 'bookings' ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {activeSection === 'bookings' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 border-t border-prakash-gold/20 space-y-6">
                        {upcomingConsultations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Upcoming</h4>
                            {upcomingConsultations.map(c => (
                              <div key={c.id} className="flex items-center justify-between p-4 bg-white rounded-xl mb-2">
                                <div>
                                  <p>{new Date(c.scheduled_at).toLocaleString()}</p>
                                  <p className="text-sm text-nidra-indigo/60">Status: {c.status} | Payment: {c.payment_status}</p>
                                </div>
                                <Link href={`/bookings?join=${c.id}`} className="luxury-button !py-2 !px-4 text-sm">Join Meeting</Link>
                              </div>
                            ))}
                          </div>
                        )}
                        {pastConsultations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Past Consultations</h4>
                            {pastConsultations.slice(0,3).map(c => (
                              <div key={c.id} className="p-4 bg-white/50 rounded-xl mb-2">
                                <p>{new Date(c.scheduled_at).toLocaleString()}</p>
                                <p className="text-sm text-green-600">Completed</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {upcomingConsultations.length === 0 && pastConsultations.length === 0 && (
                          <p className="text-nidra-indigo/60">No consultations yet. <Link href="/bookings" className="text-prakash-gold">Book one</Link>.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Support Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-prakash-gold/20 overflow-hidden">
                <button onClick={() => toggleSection('support')} className="w-full p-6 text-left flex justify-between items-center">
                  <span className="font-serif text-xl">💬 Support</span>
                  <span className="text-2xl text-prakash-gold">{activeSection === 'support' ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {activeSection === 'support' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <SupportTicketForm />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Account Settings */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-prakash-gold/20 overflow-hidden">
                <button onClick={() => toggleSection('account')} className="w-full p-6 text-left flex justify-between items-center">
                  <span className="font-serif text-xl">⚙️ Account Settings</span>
                  <span className="text-2xl text-prakash-gold">{activeSection === 'account' ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {activeSection === 'account' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 border-t border-prakash-gold/20 space-y-4">
                        <button onClick={handlePasswordResetRequest} className="w-full text-left p-3 bg-white/50 rounded-xl hover:bg-white">
                          Request Password Reset
                        </button>
                        {passwordRequested && <p className="text-green-600 text-sm">Request sent to admin.</p>}
                        <Link href="/privacy" className="block p-3 bg-white/50 rounded-xl hover:bg-white">Privacy Policy</Link>
                        <Link href="/terms" className="block p-3 bg-white/50 rounded-xl hover:bg-white">Terms & Conditions</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
