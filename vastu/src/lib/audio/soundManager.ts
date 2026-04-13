import { Howl, Howler } from 'howler';

export const SOUND_IDS = ['clickPrimary','clickSecondary','hoverSlide','hoverCard','cardExpand','success','softGlow','whisper'] as const;
export type SoundId = typeof SOUND_IDS[number];
const SOUND_SPRITE: Record<SoundId, [number, number]> = { clickPrimary:[0,800], clickSecondary:[900,300], hoverSlide:[1450,150], hoverCard:[1820,180], cardExpand:[5360,300], success:[6310,2200], softGlow:[10940,2000], whisper:[13000,1200] };
class SoundManager {
  private sounds: Howl | null = null;
  private ambientDrone: Howl | null = null;
  private isMuted = false;
  private volume = 0.6;
  private listeners: (() => void)[] = [];
  constructor() {
    if (typeof window !== 'undefined') {
      // 禁用音频加载以避免404阻塞
      console.log('Sound manager initialized (audio disabled for performance)');
    }
  }
  play(soundId: SoundId) { return; }
  playSpatial(soundId: SoundId, x: number, y: number, z: number = 0) { return; }
  startAmbient() { return; }
  stopAmbient() { return; }
  toggleMute() { this.isMuted = !this.isMuted; return this.isMuted; }
  setVolume(vol: number) { this.volume = vol; }
  isMutedState() { return this.isMuted; }
  getVolume() { return this.volume; }
  subscribe(listener: () => void) { this.listeners.push(listener); return () => { this.listeners = this.listeners.filter(l => l !== listener); }; }
  private notifyListeners() { this.listeners.forEach(l => l()); }
}
export const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;
