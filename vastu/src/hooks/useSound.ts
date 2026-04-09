import { useEffect, useState } from 'react';
import { soundManager } from '@/lib/audio/soundManager';

export function useSound() {
  const manager = soundManager;
  const [isMuted, setIsMuted] = useState(manager?.isMutedState() ?? true);
  const [volume, setVolume] = useState(manager?.getVolume() ?? 0.6);

  useEffect(() => {
    if (!manager) return;
    const unsubscribe = manager.subscribe(() => {
      setIsMuted(manager.isMutedState());
      setVolume(manager.getVolume());
    });
    return unsubscribe;
  }, [manager]);

  const play = (soundId: Parameters<NonNullable<typeof manager>['play']>[0]) => manager?.play(soundId);
  const playSpatial = (soundId: Parameters<NonNullable<typeof manager>['playSpatial']>[0], x: number, y: number, z?: number) => manager?.playSpatial(soundId, x, y, z);
  const toggleMute = () => manager?.toggleMute() ?? true;
  const startAmbient = () => manager?.startAmbient();
  const stopAmbient = () => manager?.stopAmbient();
  const setVolumeLevel = (vol: number) => manager?.setVolume(vol);

  return {
    play,
    playSpatial,
    toggleMute,
    startAmbient,
    stopAmbient,
    setVolume: setVolumeLevel,
    isMuted,
    volume,
  };
}
