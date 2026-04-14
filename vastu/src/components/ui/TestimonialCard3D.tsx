'use client';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { media } from '@/lib/mediaConfig';

interface TestimonialCard3DProps {
  client_name: string;
  location: string;
  project_type: string;
  rating: number;
  content: string;
  avatarUrl?: string;
  verified?: boolean;
  index?: number;
}

export function TestimonialCard3D({ 
  client_name, 
  location, 
  project_type, 
  rating, 
  content, 
  avatarUrl, 
  verified = true, 
  index = 0 
}: TestimonialCard3DProps) {
  const { play } = useSound();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, rotateY: 5, z: 20 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
      onMouseEnter={() => play('hoverCard')}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ganga-sandstone/20 to-prakash-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm p-6 rounded-2xl border border-prakash-gold/20 shadow-luxury-md h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={avatarUrl || media.images.avatarPlaceholder}
              alt={client_name}
              className="w-14 h-14 rounded-full object-cover border-2 border-ganga-sandstone"
            />
            {verified && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">✓</span>
            )}
          </div>
          <div>
            <h4 className="font-serif text-lg text-nidra-indigo">{client_name}</h4>
            <p className="text-sm text-ganga-sandstone">{location}</p>
            <p className="text-xs text-text-muted">{project_type}</p>
          </div>
        </div>
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < rating ? 'text-prakash-gold' : 'text-text-muted'}`}>★</span>
          ))}
        </div>
        <p className="text-nidra-indigo/70 italic text-sm leading-relaxed line-clamp-4">"{content}"</p>
      </div>
    </motion.div>
  );
}
