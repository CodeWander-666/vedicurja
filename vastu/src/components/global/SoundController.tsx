'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/lib/audio/soundManager';

export function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const unsubscribe = soundManager.subscribe(() => {
      setIsPlaying(soundManager.isAmbientPlaying());
      setIsMuted(soundManager.isMutedState());
    });
    soundManager.startAmbient();
    soundManager.setVolume(0.6);
    return unsubscribe;
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const toggleAmbient = () => {
    const nowPlaying = soundManager.isAmbientPlaying();
    soundManager.toggleAmbient();
    triggerToast(nowPlaying ? 'Music paused' : 'Music playing');
  };

  const toggleMute = () => {
    const nowMuted = soundManager.isMutedState();
    soundManager.toggleMute();
    triggerToast(nowMuted ? 'Sound unmuted' : 'Sound muted');
  };

  return (
    <>
      <button
        onClick={toggleAmbient}
        onContextMenu={(e) => { e.preventDefault(); toggleMute(); }}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-prakash-gold shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="Click to play/pause ambient music. Right-click to mute/unmute."
      >
        <span className={`text-2xl ${isPlaying && !isMuted ? 'animate-spin-slow text-prakash-gold' : 'text-nidra-indigo/60'}`}>
          ॐ
        </span>
      </button>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 z-50 px-4 py-2 bg-nidra-indigo/90 backdrop-blur-sm text-white text-sm rounded-full shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default SoundController;
