'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import { supabase } from '@/lib/supabaseClient';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-vastu-parchment via-white to-vastu-stone overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <Mandala3D />
          </div>
          <FloatingParticles />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-prakash-gold/30">
              <div className="text-center mb-8">
                <h1 className="font-serif text-3xl sm:text-4xl text-nidra-indigo">Consult Acharya</h1>
                <p className="text-nidra-indigo/60 text-sm sm:text-base mt-2">
                  Share your concerns and Acharya KK Nagaich ji will respond personally.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🙏</div>
                  <h2 className="font-serif text-2xl text-nidra-indigo mb-2">Thank You</h2>
                  <p className="text-nidra-indigo/70">Your message has been received. Acharya will respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-nidra-indigo mb-1">Full Name</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-prakash-gold/30 rounded-xl focus:border-prakash-gold outline-none transition-all text-nidra-indigo placeholder:text-nidra-indigo/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-nidra-indigo mb-1">Email Address</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-prakash-gold/30 rounded-xl focus:border-prakash-gold outline-none transition-all text-nidra-indigo placeholder:text-nidra-indigo/40"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-nidra-indigo mb-1">Message</label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-prakash-gold/30 rounded-xl focus:border-prakash-gold outline-none transition-all text-nidra-indigo placeholder:text-nidra-indigo/40 resize-none"
                      placeholder="Tell us about your space or concerns..."
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full luxury-button py-4 text-lg disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </main>
      </SmoothScroll>
    </>
  );
}
