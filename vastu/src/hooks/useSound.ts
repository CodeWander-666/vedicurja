import { useEffect, useState } from 'react';
import { soundManager } from '@/lib/audio/soundManager';

export type SoundId = 'clickPrimary' | 'clickSecondary' | 'hoverSlide' | 'hoverCard' | 'cardExpand' | 'success' | 'softGlow' | 'whisper' | 'ambient';

export function useSound() {
  const manager = soundManager;
  const [isMuted, setIsMuted] = useState(manager?.isMutedState() ?? false);
  const [volume, setVolume] = useState(manager?.getVolume() ?? 0.6);

  useEffect(() => {
    if (!manager) return;
    const unsub = manager.subscribe(() => {
      setIsMuted(manager.isMutedState());
      setVolume(manager.getVolume());
    });
    return unsub;
  }, [manager]);

  const play = (soundId: SoundId) => manager?.play(soundId);
  const playSpatial = (soundId: SoundId, x: number, y: number, z?: number) => manager?.playSpatial(soundId, x, y, z);
  const toggleMute = () => manager?.toggleMute() ?? true;
  const startAmbient = () => manager?.startAmbient();

  return { play, playSpatial, toggleMute, startAmbient, isMuted, volume };
}
