'use client';
import { useEffect, useState } from 'react';
import { soundManager } from '@/lib/audio/soundManager';

export function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = soundManager.subscribe(() => {
      setIsPlaying(soundManager.isAmbientPlaying());
      setIsMuted(soundManager.isMutedState());
    });

    // Auto-start ambient on first user interaction? We'll let the button control it.
    // But we can start it muted initially.
    soundManager.startAmbient();

    return unsubscribe;
  }, []);

  const toggleAmbient = () => {
    soundManager.toggleAmbient();
  };

  const toggleMute = () => {
    soundManager.toggleMute();
  };

  return (
    <button
      onClick={toggleAmbient}
      onContextMenu={(e) => { e.preventDefault(); toggleMute(); }}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-prakash-gold shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      title="Click to play/pause ambient music. Right-click to mute/unmute."
    >
      <span className={`text-2xl ${isPlaying && !isMuted ? 'animate-spin-slow text-prakash-gold' : 'text-nidra-indigo/60'}`}>
        ॐ
      </span>
    </button>
  );
}
export default SoundController;
