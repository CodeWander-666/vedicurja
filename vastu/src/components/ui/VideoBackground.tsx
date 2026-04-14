'use client';
import { MediaContainer } from './MediaContainer';

interface VideoBackgroundProps {
  src?: string;
  fallbackKey?: keyof typeof import('@/lib/mediaConfig').media.fallback.videos;
  overlayOpacity?: string;
}

export function VideoBackground({ src, fallbackKey, overlayOpacity = '40' }: VideoBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <MediaContainer src={src} type="video" fallbackKey={fallbackKey} className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 bg-black/${overlayOpacity}`} />
    </div>
  );
}
