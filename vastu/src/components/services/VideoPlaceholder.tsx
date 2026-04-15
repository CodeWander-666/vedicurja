'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface VideoPlaceholderProps {
  poster: string;
  videoSrc?: string;
  className?: string;
}

export default function VideoPlaceholder({ poster, videoSrc, className = '' }: VideoPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {!isPlaying ? (
        <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
          <img src={poster} alt="Video placeholder" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-prakash-gold/90 flex items-center justify-center"
            >
              <span className="text-white text-2xl ml-1">▶</span>
            </motion.div>
          </div>
        </div>
      ) : (
        <video
          src={videoSrc || '/videos/placeholder.mp4'}
          controls
          autoPlay
          className="w-full aspect-video"
          poster={poster}
        />
      )}
    </div>
  );
}
