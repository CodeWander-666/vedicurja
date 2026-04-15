'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  spineColor: string;
  content: string[];
}

const books: Book[] = [
  { id: 'mayamatam', title: 'Mayamatam', author: 'Maya', coverColor: '#8B5A2B', spineColor: '#5C3A1E', content: Array(30).fill('Mayamatam: Ancient treatise on Vastu architecture. This sacred text details the principles of measurement, orientation, and construction according to Vedic traditions...') },
  { id: 'brihat-samhita', title: 'Brihat Samhita', author: 'Varahamihira', coverColor: '#C88A5D', spineColor: '#A06A3D', content: Array(30).fill('Brihat Samhita: An encyclopedic work covering Vastu, astrology, and natural phenomena. Varahamihira compiled wisdom from earlier sages...') },
  { id: 'vastu-remedies', title: 'Vastu Remedies', author: 'Acharya Sharma', coverColor: '#1985A1', spineColor: '#0D5A70', content: Array(30).fill('Vastu Remedies: Simple, non-destructive corrections for common defects. Learn to harmonize your space without breaking walls...') },
];

export default function WisdomLibrary3D() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => { if (currentPage < (selectedBook?.content.length || 0) - 1) setCurrentPage(p => p + 1); };
  const prevPage = () => { if (currentPage > 0) setCurrentPage(p => p - 1); };

  return (
    <section className="py-24 bg-gradient-to-b from-vastu-parchment to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-nidra-indigo mb-4">The Wisdom Library</h2>
        <p className="text-center text-nidra-indigo/60 mb-16 max-w-2xl mx-auto">Explore authentic Vedic texts in an immersive 3D experience</p>
        
        <div className="flex flex-wrap justify-center gap-12 perspective-1000">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-48 h-64 cursor-pointer group"
              onClick={() => { setSelectedBook(book); setCurrentPage(0); }}
            >
              <div className="absolute left-0 w-8 h-full rounded-l-md" style={{ backgroundColor: book.spineColor, transform: 'rotateY(90deg) translateX(-4px)' }} />
              <div className="absolute inset-0 rounded-r-md shadow-2xl flex flex-col items-center justify-center p-4 text-white" style={{ backgroundColor: book.coverColor, transform: 'translateZ(10px)' }}>
                <span className="text-4xl mb-2">📖</span>
                <h3 className="font-serif text-lg text-center">{book.title}</h3>
                <p className="text-xs opacity-80 mt-2">{book.author}</p>
              </div>
              <div className="absolute right-0 w-2 h-full bg-white/80 rounded-r-sm" style={{ transform: 'translateZ(8px)' }} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedBook && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedBook(null)}>
            <motion.div initial={{ scale: 0.8, rotateY: -10 }} animate={{ scale: 1, rotateY: 0 }} exit={{ scale: 0.8 }} className="bg-gradient-to-r from-vastu-parchment to-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl border-2 border-prakash-gold/50" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-prakash-gold/30 flex justify-between items-center">
                <h3 className="font-serif text-2xl text-nidra-indigo">{selectedBook.title}</h3>
                <button onClick={() => setSelectedBook(null)} className="text-3xl text-nidra-indigo/60 hover:text-nidra-indigo">✕</button>
              </div>
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <div className="flex gap-8">
                  <div className="flex-1 font-serif text-lg leading-relaxed text-nidra-indigo/80">
                    <span className="text-6xl float-left mr-3 text-prakash-gold">{(currentPage + 1).toString()[0]}</span>
                    {selectedBook.content[currentPage]}
                  </div>
                </div>
                <p className="text-center text-sm text-nidra-indigo/50 mt-6">Page {currentPage + 1} of {selectedBook.content.length}</p>
              </div>
              <div className="p-4 border-t border-prakash-gold/30 flex justify-between">
                <button onClick={prevPage} disabled={currentPage === 0} className="px-6 py-2 rounded-full border border-prakash-gold text-prakash-gold disabled:opacity-30">← Previous</button>
                <button onClick={nextPage} disabled={currentPage === selectedBook.content.length - 1} className="px-6 py-2 rounded-full border border-prakash-gold text-prakash-gold disabled:opacity-30">Next →</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
