'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import nakshatras from '@/data/nakshatra-syllables.json';
const nakshatraList = Object.keys(nakshatras);

interface Props { onSuggest: (nakshatra: string) => void; }

export default function NameSuggestionForm({ onSuggest }: Props) {
  const [selected, setSelected] = useState('Ashwini');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSuggest(selected); };
  return (
    <motion.form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-prakash-gold/30 max-w-xl mx-auto">
      <label className="block text-sm font-medium text-nidra-indigo mb-2">Select Nakshatra</label>
      <select value={selected} onChange={e => setSelected(e.target.value)} className="w-full p-3 border border-prakash-gold/30 rounded-xl bg-white/50 mb-6">{nakshatraList.map(n => <option key={n} value={n}>{n}</option>)}</select>
      <button type="submit" className="w-full luxury-button py-4">Suggest Names</button>
      <p className="text-xs text-center text-nidra-indigo/50 mt-4">Based on Brihat Parashara Hora Shastra</p>
    </motion.form>
  );
}
