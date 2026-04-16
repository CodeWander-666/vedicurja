import { Howl, Howler } from 'howler';

export const SOUND_IDS = ['clickPrimary','clickSecondary','hoverSlide','hoverCard','cardExpand','success','softGlow','whisper','ambient'] as const;
export type SoundId = typeof SOUND_IDS[number];

const SOUND_SPRITE: Record<SoundId, [number, number]> = {
  clickPrimary:[0,800], clickSecondary:[900,300], hoverSlide:[1450,150], hoverCard:[1820,180],
  cardExpand:[5360,300], success:[6310,2200], softGlow:[10940,2000], whisper:[13000,1200],
  ambient:[0,0] // placeholder for looping background
};

class SoundManager {
  private sounds: Howl | null = null;
  private ambientDrone: Howl | null = null;
  private isMuted = false;
  private volume = 0.6;
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      // Load UI sound sprite
      this.sounds = new Howl({
        src: ['/audio/vastu-ui-sounds.webm'],
        sprite: SOUND_SPRITE as any,
        volume: this.volume,
        preload: true,
      });
      // Load ambient background loop
      this.ambientDrone = new Howl({
        src: ['/audio/ambient-drone.webm'],
        loop: true,
        volume: 0.25,
        preload: true,
      });
    }
  }

  play(soundId: SoundId) {
    if (!this.sounds || this.isMuted) return;
    if (soundId === 'ambient') {
      this.ambientDrone?.play();
    } else {
      this.sounds.play(soundId);
    }
  }

  playSpatial(soundId: SoundId, x: number, y: number, z: number = 0) {
    this.play(soundId);
  }

  startAmbient() {
    if (!this.isMuted) {
      this.ambientDrone?.play();
    }
  }

  stopAmbient() {
    this.ambientDrone?.stop();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
    this.notifyListeners();
    return this.isMuted;
  }

  setVolume(vol: number) {
    this.volume = vol;
    Howler.volume(vol);
  }

  isMutedState() { return this.isMuted; }
  getVolume() { return this.volume; }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l());
  }
}

export const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;
