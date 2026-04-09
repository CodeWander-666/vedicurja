import { create } from 'zustand';

interface UIState {
  isMenuOpen: boolean;
  isAudioEnabled: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleAudio: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isAudioEnabled: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
}));
