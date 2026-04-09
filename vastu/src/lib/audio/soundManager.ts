import { Howl, Howler } from 'howler';

const SOUND_SPRITE = {
  clickPrimary: [0, 800],
  clickSecondary: [900, 300],
  hoverSlide: [1300, 150],
  pageTurn: [1500, 600],
  success: [2200, 2000],
  error: [4300, 300],
  menuOpen: [4700, 400],
  menuClose: [5200, 300],
  scrollTick: [5600, 80],
  softGlow: [5800, 2000],
  whisper: [7900, 1200],
};

class SoundManager {
  private sounds: Howl | null = null;
  private ambientDrone: Howl | null = null;
  private isMuted = false;
  private volume = 0.6;
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    this.sounds = new Howl({
      src: ['/audio/vastu-ui-sounds.webm'],
      sprite: SOUND_SPRITE,
      volume: this.volume,
      preload: true,
      onloaderror: () => console.warn('UI sound file missing – using silent mode'),
    });

    this.ambientDrone = new Howl({
      src: ['/audio/ambient-drone.webm'],
      loop: true,
      volume: 0.15,
      preload: true,
    });
  }

  play(soundId: keyof typeof SOUND_SPRITE) {
    if (this.isMuted || !this.sounds) return;
    try { this.sounds.play(soundId); } catch (e) {}
  }

  playSpatial(soundId: keyof typeof SOUND_SPRITE, x: number, y: number, z: number = 0) {
    if (this.isMuted || !this.sounds) return;
    const sound = new Howl({
      src: ['/audio/vastu-ui-sounds.webm'],
      sprite: { [soundId]: SOUND_SPRITE[soundId] },
      volume: this.volume,
    });
    sound.pos(x, y, z);
    sound.play(soundId);
    sound.once('end', () => sound.unload());
  }

  startAmbient() {
    if (this.isMuted || !this.ambientDrone) return;
    if (!this.ambientDrone.playing()) this.ambientDrone.play();
  }

  stopAmbient() { this.ambientDrone?.stop(); }

  toggleMute() {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
    if (!this.isMuted && this.ambientDrone && !this.ambientDrone.playing()) {
      this.ambientDrone.play();
    }
    this.notifyListeners();
    return this.isMuted;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    Howler.volume(this.volume);
    this.notifyListeners();
  }

  isMutedState() { return this.isMuted; }
  getVolume() { return this.volume; }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  private notifyListeners() { this.listeners.forEach(l => l()); }
}

export const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;
