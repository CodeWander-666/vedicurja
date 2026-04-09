'use client';
import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import * as Tone from 'tone';
import { useUIStore } from '@/lib/store/uiStore';

const soundSprite: Record<string, [number, number]> = {
  clickPrimary: [0, 800],
  clickSecondary: [900, 300],
  hoverSlide: [1300, 150],
  pageTurn: [1500, 600],
  success: [2200, 2000],
};

export function SoundController() {
  const { isAudioEnabled, toggleAudio } = useUIStore();
  const howlRef = useRef<Howl | null>(null);
  const droneRef = useRef<Tone.PolySynth | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    try {
      howlRef.current = new Howl({
        src: ['/audio/vastu-ui-sounds.webm'],
        sprite: soundSprite,
        volume: 0.6,
        preload: true,
      });
    } catch (e) {
      console.warn('UI sounds not loaded (file missing)');
    }

    const initTone = async () => {
      if (initializedRef.current) return;
      await Tone.start();
      droneRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 2, decay: 1, sustain: 0.8, release: 4 },
      }).toDestination();
      droneRef.current.volume.value = -40;
      initializedRef.current = true;
    };

    const handleInteraction = () => {
      initTone();
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      howlRef.current?.unload();
      droneRef.current?.dispose();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!droneRef.current) return;
    if (isAudioEnabled) {
      droneRef.current.triggerAttack(['C2', 'G2']);
    } else {
      droneRef.current.triggerRelease(['C2', 'G2']);
    }
  }, [isAudioEnabled]);

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-[#C88A5D]/20 backdrop-blur-sm border border-[#C88A5D] flex items-center justify-center hover:scale-110 transition-transform"
    >
      <span className={`text-[#C88A5D] text-xl ${isAudioEnabled ? 'animate-spin-slow' : ''}`}>ॐ</span>
    </button>
  );
}
