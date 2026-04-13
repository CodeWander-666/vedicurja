import { create } from 'zustand';
interface UIState { isAudioEnabled: boolean; toggleAudio: () => void; }
export const useUIStore = create<UIState>((set) => ({ isAudioEnabled: false, toggleAudio: () => set((s) => ({ isAudioEnabled: !s.isAudioEnabled })) }));
