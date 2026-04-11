'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import './Bookshelf.css';

interface Book {
  id: string;
  title: string;
  author: string;
  color: string;
  spine: string;
  category: 'vastu' | 'numerology';
  description: string;
}

const books: Book[] = [
  { id: 'mayamatam', title: 'Mayamatam', author: 'Maya', color: '#8B5A2B', spine: '#5C3A1E', category: 'vastu', description: 'Ancient treatise on Vastu architecture and temple construction.' },
  { id: 'brihat-samhita', title: 'Brihat Samhita', author: 'Varahamihira', color: '#C88A5D', spine: '#A06A3D', category: 'vastu', description: 'Encyclopedic work covering Vastu, astrology, and gemology.' },
  { id: 'manasara', title: 'Manasara', author: 'Ancient Text', color: '#2D6A4F', spine: '#1A4A35', category: 'vastu', description: 'Classical text on Indian architecture and sculpture.' },
  { id: 'samarangana', title: 'Samarangana', author: 'Bhoja', color: '#457B9D', spine: '#2D5A7D', category: 'vastu', description: 'Treatise on civil engineering and Vastu by King Bhoja.' },
  { id: 'vishvakarma', title: 'Vishvakarma', author: 'Vishvakarma', color: '#E8B960', spine: '#C49A40', category: 'vastu', description: 'Teachings of the divine architect of the universe.' },
  { id: 'aparajita', title: 'Aparajita', author: 'Ancient Text', color: '#6A4C93', spine: '#4A2C73', category: 'vastu', description: 'Sacred text on temple architecture and iconography.' },
  { id: 'cheiro-numbers', title: 'Book of Numbers', author: 'Cheiro', color: '#1985A1', spine: '#0D5A70', category: 'numerology', description: 'Classic work on numerology by the famous palmist Cheiro.' },
  { id: 'pythagorean', title: 'Pythagorean', author: 'Pythagoras', color: '#D65A31', spine: '#A63A1E', category: 'numerology', description: 'The foundational text of Western numerology.' },
  { id: 'chaldean', title: 'Chaldean', author: 'Ancient Sages', color: '#4C9A8A', spine: '#2C7A6A', category: 'numerology', description: 'The mystical Chaldean system of number vibrations.' },
  { id: 'kabbalah', title: 'Kabbalah', author: 'Mystics', color: '#9A4C95', spine: '#7A2C75', category: 'numerology', description: 'Hebrew mystical numerology and the Tree of Life.' },
  { id: 'vedic-numerology', title: 'Vedic Numbers', author: 'Harish Johari', color: '#F4A261', spine: '#D48241', category: 'numerology', description: 'The spiritual significance of numbers in Vedic tradition.' },
];

function BookCard({ book, onClick }: { book: Book; onClick: () => void }) {
  const { play } = useSound();
  return (
    <motion.div
      className="book-card"
      style={{ '--book-color': book.color, '--spine-color': book.spine } as React.CSSProperties}
      whileHover={{ y: -10, scale: 1.02, boxShadow: '0 25px 30px -10px rgba(0,0,0,0.2)' }}
      onClick={() => { onClick(); play('clickSecondary'); }}
    >
      <div className="book-cover">
        <span className="book-emoji">{book.category === 'vastu' ? '🕉️' : '🔢'}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>
      <div className="book-spine"></div>
    </motion.div>
  );
}

function BookReader({ book, onClose }: { book: Book; onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    `Introduction to ${book.title}`,
    book.description,
    `Chapter 1: Core Principles`,
    `Chapter 2: Advanced Concepts`,
    `Chapter 3: Practical Applications`,
    `Conclusion and Further Study`,
  ];
  const totalPages = pages.length;
  const { play } = useSound();

  const nextPage = () => { if (currentPage < totalPages - 1) { setCurrentPage(currentPage + 1); play('clickSecondary'); } };
  const prevPage = () => { if (currentPage > 0) { setCurrentPage(currentPage - 1); play('clickSecondary'); } };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="book-reader-modal">
      <div className="book-reader-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="book-reader-pages">
          <div className="page left-page">
            <h3>{book.title}</h3>
            <p className="page-number">Page {currentPage * 2 + 1}</p>
            <p>{pages[currentPage] || ''}</p>
          </div>
          <div className="page right-page">
            <h3>{book.author}</h3>
            <p className="page-number">Page {currentPage * 2 + 2}</p>
            <p>{pages[currentPage + 1] || ''}</p>
          </div>
        </div>
        <div className="reader-controls">
          <button onClick={prevPage} disabled={currentPage === 0} className="nav-btn">← Previous</button>
          <span className="page-indicator">{currentPage + 1} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1} className="nav-btn">Next →</button>
        </div>
        <button onClick={onClose} className="back-shelf-btn">Back to Shelf</button>
      </div>
    </motion.div>
  );
}

export function Bookshelf3D() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  return (
    <div className="bookshelf-wrapper">
      <div className="bookshelf-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
        ))}
      </div>
      <AnimatePresence>
        {selectedBook && <BookReader book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>
    </div>
  );
}
export default Bookshelf3D;
