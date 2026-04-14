'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationAutocompleteProps {
  onSelect: (location: { lat: number; lng: number; displayName: string; timezone: string }) => void;
  placeholder?: string;
  className?: string;
}

export default function LocationAutocomplete({ onSelect, placeholder = 'Enter city or place', className = '' }: LocationAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        setSuggestions(data);
        setIsOpen(true);
      } catch (err) {
        console.error('Location fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  const handleSelect = async (suggestion: LocationSuggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    onSelect({ lat, lng, displayName: suggestion.display_name, timezone });
    setQuery(suggestion.display_name);
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        className="w-full p-4 bg-white/50 border border-[#C88A5D]/30 rounded-xl focus:border-[#C88A5D] outline-none transition"
      />
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-md border border-[#C88A5D]/30 rounded-xl shadow-xl max-h-60 overflow-auto"
          >
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelect(s)}
                className="p-3 hover:bg-[#C88A5D]/10 cursor-pointer transition text-sm"
              >
                {s.display_name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-[#C88A5D] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
