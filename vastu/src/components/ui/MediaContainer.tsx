'use client';
import { useState } from 'react';
import { media } from '@/lib/mediaConfig';

interface MediaContainerProps {
  src?: string | null;
  type: 'image' | 'video';
  alt?: string;
  className?: string;
  fallbackKey?: keyof typeof media.fallback.images | keyof typeof media.fallback.videos;
}

export function MediaContainer({ src, type, alt = '', className = '', fallbackKey }: MediaContainerProps) {
  const [error, setError] = useState(false);
  const getFallback = () => {
    if (!fallbackKey) return '';
    if (type === 'image') return media.fallback.images[fallbackKey as keyof typeof media.fallback.images];
    return media.fallback.videos[fallbackKey as keyof typeof media.fallback.videos];
  };
  // Use fallback if no src provided or if error occurred
  const finalSrc = (!src || error) ? getFallback() : src;

  if (type === 'video') {
    return (
      <video autoPlay loop muted playsInline onError={() => setError(true)} className={className}>
        <source src={finalSrc} type="video/mp4" />
      </video>
    );
  }
  return <img src={finalSrc} alt={alt} onError={() => setError(true)} className={className} />;
}
