import { Howl, Howler } from 'howler';

// UI sound effects – lightweight, no spritesheet needed
const uiSounds: Record<string, Howl> = {};

// Ambient background music – single looping track
let ambientMusic: Howl | null = null;

// State
let isMuted = false;
let isAmbientPlaying = false;
let volume = 0.6;
const listeners: (() => void)[] = [];

// Initialize UI sounds on demand
function getUISound(soundId: string): Howl | null {
  if (typeof window === 'undefined') return null;
  if (!uiSounds[soundId]) {
    // Use simple oscillator-based sounds or tiny audio files
    // For now, we'll create silent placeholders – replace with real files later
    uiSounds[soundId] = new Howl({
      src: ['/audio/ui-click.webm'], // fallback
      volume: 0.3,
    });
  }
  return uiSounds[soundId];
}

// Initialize ambient music
function initAmbient() {
  if (ambientMusic || typeof window === 'undefined') return;
  ambientMusic = new Howl({
    src: ['/audio/vastu-ui-sounds.webm'], // user uploaded file
    loop: true,
    volume: volume * 0.4, // ambient slightly quieter
    preload: true,
    onplay: () => {
      isAmbientPlaying = true;
      notifyListeners();
    },
    onpause: () => {
      isAmbientPlaying = false;
      notifyListeners();
    },
    onstop: () => {
      isAmbientPlaying = false;
      notifyListeners();
    },
  });
}

export const soundManager = {
  play(soundId: string) {
    if (isMuted) return;
    if (soundId === 'ambient') {
      initAmbient();
      ambientMusic?.play();
    } else {
      // UI sounds – optional, can be added later
      // getUISound(soundId)?.play();
    }
  },

  startAmbient() {
    if (isMuted) return;
    initAmbient();
    ambientMusic?.play();
  },

  stopAmbient() {
    ambientMusic?.pause();
  },

  toggleMute() {
    isMuted = !isMuted;
    Howler.mute(isMuted);
    notifyListeners();
    return isMuted;
  },

  toggleAmbient() {
    initAmbient();
    if (ambientMusic?.playing()) {
      ambientMusic.pause();
    } else {
      ambientMusic?.play();
    }
  },

  isMutedState() { return isMuted; },
  isAmbientPlaying() { return isAmbientPlaying; },
  getVolume() { return volume; },

  setVolume(vol: number) {
    volume = vol;
    Howler.volume(vol);
  },

  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  },

  notifyListeners() {
    listeners.forEach(l => l());
  },
};

// Auto-start ambient when user first interacts? No, let SoundController handle it.
