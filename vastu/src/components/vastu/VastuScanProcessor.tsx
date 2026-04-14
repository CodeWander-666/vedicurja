'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';

interface VastuZone {
  name: string;
  element: string;
  score: number;
  recommendation: string;
}

// Complete 16‑zone Vastu Purusha Mandala
const vastuZones = [
  { name: 'North', element: 'Water', idealScore: 85 },
  { name: 'North‑East', element: 'Water', idealScore: 95 },
  { name: 'East', element: 'Air', idealScore: 80 },
  { name: 'South‑East', element: 'Fire', idealScore: 90 },
  { name: 'South', element: 'Earth', idealScore: 60 },
  { name: 'South‑West', element: 'Earth', idealScore: 88 },
  { name: 'West', element: 'Space', idealScore: 55 },
  { name: 'North‑West', element: 'Air', idealScore: 65 },
  { name: 'North‑NorthEast', element: 'Water', idealScore: 70 },
  { name: 'East‑NorthEast', element: 'Air', idealScore: 72 },
  { name: 'East‑SouthEast', element: 'Fire', idealScore: 78 },
  { name: 'South‑SouthEast', element: 'Fire', idealScore: 82 },
  { name: 'South‑SouthWest', element: 'Earth', idealScore: 75 },
  { name: 'West‑SouthWest', element: 'Space', idealScore: 50 },
  { name: 'West‑NorthWest', element: 'Air', idealScore: 58 },
  { name: 'North‑NorthWest', element: 'Water', idealScore: 68 }
];

const elementRecommendations: Record<string, Record<string, string>> = {
  Water: {
    good: 'Excellent for meditation, prayer room, or water features.',
    bad: 'Avoid fire elements; keep light and open.'
  },
  Fire: {
    good: 'Ideal for kitchen, electrical appliances, or fireplace.',
    bad: 'Avoid water sources; keep active and warm.'
  },
  Earth: {
    good: 'Perfect for master bedroom, heavy furniture, or storage.',
    bad: 'Avoid light elements; keep grounded and stable.'
  },
  Air: {
    good: 'Great for living room, study, or children\'s play area.',
    bad: 'Avoid heavy structures; keep well‑ventilated.'
  },
  Space: {
    good: 'Suitable for open spaces, corridors, or balconies.',
    bad: 'Avoid clutter; keep minimal and expansive.'
  }
};

export default function VastuScanProcessor() {
  const [image, setImage] = useState<string | null>(null);
  const [zones, setZones] = useState<VastuZone[]>([]);
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = useState('North');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const analyzeVastu = async () => {
    if (!image) return;
    setLoading(true);

    // Simulate deep AI analysis (deterministic but realistic)
    const seed = orientation.charCodeAt(0) + (image.length % 100);
    const analyzedZones = vastuZones.map(zone => {
      const variance = (Math.sin(seed * zone.name.length) * 15);
      const score = Math.min(98, Math.max(35, Math.round(zone.idealScore + variance)));
      const isGood = score >= 70;
      const recommendation = isGood
        ? elementRecommendations[zone.element].good
        : elementRecommendations[zone.element].bad;

      return {
        name: zone.name,
        element: zone.element,
        score,
        recommendation
      };
    });

    setZones(analyzedZones);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
          isDragActive ? 'border-[#C88A5D] bg-[#C88A5D]/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-[#1A2A3A]/60">
          {isDragActive ? 'Drop your floor plan here' : 'Drag & drop a floor plan, or click to select'}
        </p>
      </div>

      {image && (
        <div className="relative">
          <img src={image} alt="Floor plan" className="w-full rounded-xl shadow-lg" />
          <select
            value={orientation}
            onChange={e => setOrientation(e.target.value)}
            className="mt-4 p-3 border border-[#C88A5D]/30 rounded-xl bg-white/50 w-full"
          >
            {['North', 'South', 'East', 'West', 'North‑East', 'North‑West', 'South‑East', 'South‑West'].map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <button
            onClick={analyzeVastu}
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-[#C88A5D] to-[#E8B960] text-white font-medium py-3 rounded-full disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Vastu (Free)'}
          </button>
        </div>
      )}

      {zones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#C88A5D]/30"
        >
          <h3 className="font-serif text-2xl mb-4">16‑Zone Vastu Analysis</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {zones.map(zone => (
              <div key={zone.name} className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0">
                  <CircularProgressbar
                    value={zone.score}
                    text={`${zone.score}%`}
                    styles={{
                      path: { stroke: zone.score >= 70 ? '#10b981' : zone.score >= 50 ? '#eab308' : '#ef4444' },
                      text: { fill: '#1A2A3A', fontSize: '24px' }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{zone.name} ({zone.element})</p>
                  <p className="text-sm text-[#1A2A3A]/60">{zone.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.location.href = '/contact?source=vastuscan'}
            className="mt-6 w-full bg-[#1A2A3A] text-white py-3 rounded-full"
          >
            Get Full 16‑Zone Report & Personalized Remedies →
          </button>
        </motion.div>
      )}
    </div>
  );
}
