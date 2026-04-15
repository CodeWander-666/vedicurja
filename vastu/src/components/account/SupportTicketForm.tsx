'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
export default function SupportTicketForm() {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    await supabase.from('support_tickets').insert({ user_id: user.id, subject, message });
    setSubmitting(false);
    setSubmitted(true);
    setSubject(''); setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };
  return (
    <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} onSubmit={handleSubmit} className="mt-6 p-6 bg-vastu-stone/20 rounded-xl">
      <h3 className="font-serif text-xl mb-4">Contact Support</h3>
      <p className="text-sm text-nidra-indigo/60 mb-4">We typically respond within 24 hours.</p>
      <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full p-3 mb-3 border border-prakash-gold/30 rounded-xl bg-white/50" />
      <textarea placeholder="Describe your issue..." value={message} onChange={e => setMessage(e.target.value)} required rows={4} className="w-full p-3 mb-4 border border-prakash-gold/30 rounded-xl bg-white/50" />
      <button type="submit" disabled={submitting} className="luxury-button w-full py-3 disabled:opacity-50">{submitting ? 'Sending...' : 'Send Message'}</button>
      {submitted && <p className="text-green-600 text-sm mt-3 text-center">Message sent! We'll respond soon.</p>}
    </motion.form>
  );
}
