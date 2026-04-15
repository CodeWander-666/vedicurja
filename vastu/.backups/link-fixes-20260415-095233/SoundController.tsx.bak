'use client'; import { useUIStore } from '@/lib/store/uiStore'; import { useSound } from '@/hooks/useSound'; import { useEffect } from 'react';
export function SoundController() { const { isAudioEnabled, toggleAudio } = useUIStore(); const { startAmbient } = useSound();
  useEffect(() => { startAmbient(); }, [startAmbient]);
  return (<button onClick={toggleAudio} className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-[#C88A5D]/20 backdrop-blur-sm border border-[#C88A5D] flex items-center justify-center"><span className={`text-[#C88A5D] text-xl ${isAudioEnabled ? 'animate-spin-slow' : ''}`}>ॐ</span></button>);
}
export default SoundController;
