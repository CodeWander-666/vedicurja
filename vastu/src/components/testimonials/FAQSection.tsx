'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs, faqCategories } from '@/data/faqs';

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-nidra-indigo/60 mb-8">Everything you need to know about Vastu Shastra</p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === cat
                  ? 'bg-prakash-gold text-white'
                  : 'bg-vastu-stone/30 text-nidra-indigo/70 hover:bg-vastu-stone/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-full border border-prakash-gold/30 bg-white/50 text-nidra-indigo placeholder:text-nidra-indigo/40 focus:outline-none focus:border-prakash-gold"
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="bg-vastu-stone/20 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-4 text-left flex justify-between items-center"
              >
                <span className="font-medium text-nidra-indigo">{faq.question}</span>
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
                    <p className="p-4 pt-0 text-nidra-indigo/70 border-t border-prakash-gold/20">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <p className="text-center text-nidra-indigo/60 py-8">No FAQs found. Try a different search.</p>
        )}
      </div>
    </section>
  );
}
