'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'What is Vastu Shastra?', a: 'Vastu Shastra is the ancient Indian science of architecture and spatial harmony, balancing the five elements for well‑being and prosperity.' },
  { q: 'How does virtual consultation work?', a: 'You share your floor plan via screen share, and Acharya KK Nagaich ji provides real‑time analysis and remedies.' },
  { q: 'Are remedies destructive?', a: 'No. We focus on simple, non‑invasive corrections using colors, elements, and symbols.' },
  { q: 'How long does a consultation take?', a: 'Typically 60‑90 minutes for residential, 2 hours for commercial.' },
  { q: 'Do I need to be present?', a: 'Yes, you will guide Acharya through your space via video call.' },
  { q: 'Can Vastu help my business?', a: 'Absolutely. Proper alignment can improve productivity, reduce conflicts, and attract clients.' },
  { q: 'Is Vastu scientific?', a: 'Modern studies validate many Vastu principles, particularly regarding thermal comfort and energy flow.' },
  { q: 'What if I rent my home?', a: 'Vastu affects tenants too. Simple remedies can be applied without structural changes.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-nidra-indigo/60 mb-8">Everything you need to know about Vastu Shastra</p>
        
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-3 mb-8 rounded-full border border-prakash-gold/30 bg-white/50 text-nidra-indigo placeholder:text-nidra-indigo/40 focus:outline-none focus:border-prakash-gold"
        />

        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="bg-vastu-stone/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-4 text-left flex justify-between items-center"
              >
                <span className="font-medium text-nidra-indigo">{faq.q}</span>
                <span className="text-2xl text-prakash-gold">{openIndex === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 pt-0 text-nidra-indigo/70 border-t border-prakash-gold/20">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <p className="text-center text-nidra-indigo/60 py-8">No FAQs found. Try a different search.</p>
        )}
      </div>
    </section>
  );
}
