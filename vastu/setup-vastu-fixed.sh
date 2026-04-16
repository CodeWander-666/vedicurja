#!/bin/bash
# =============================================================================
# VedicUrja – SoundController with Guided Tooltip (Play/Pause/Mute)
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }

BACKUP_DIR=".backups/sound-guide-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
info "Backups saved to $BACKUP_DIR"

SOUND_CONTROLLER="src/components/global/SoundController.tsx"
if [ -f "$SOUND_CONTROLLER" ]; then
    cp "$SOUND_CONTROLLER" "$BACKUP_DIR/SoundController.tsx.bak"
    info "Backup created."
fi

# -----------------------------------------------------------------------------
# Rewrite SoundController with guided tooltip
# -----------------------------------------------------------------------------
cat > "$SOUND_CONTROLLER" <<'EOF'
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/lib/audio/soundManager';

export function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe(() => {
      setIsPlaying(soundManager.isAmbientPlaying());
      setIsMuted(soundManager.isMutedState());
    });
    soundManager.startAmbient();
    soundManager.setVolume(0.6);

    // Show guide on first visit
    const hasSeenGuide = localStorage.getItem('vedicurja_sound_guide');
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem('vedicurja_sound_guide', 'true');
      // Auto-hide after 5 seconds
      setTimeout(() => setShowGuide(false), 5000);
    }

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
      {/* Guide Tooltip */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 left-20 z-50 px-4 py-2 bg-nidra-indigo/90 backdrop-blur-sm text-white text-sm rounded-full shadow-lg whitespace-nowrap pointer-events-none"
          >
            👆 Click to play/pause · Right‑click to mute
            <div className="absolute -bottom-1 left-6 w-3 h-3 bg-nidra-indigo/90 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={toggleAmbient}
        onContextMenu={(e) => { e.preventDefault(); toggleMute(); }}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border-2 border-prakash-gold shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="Click to play/pause · Right‑click to mute"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isPlaying && !isMuted ? { boxShadow: '0 0 20px #E8B960' } : {}}
      >
        <span className={`text-2xl transition-all duration-300 ${isPlaying && !isMuted ? 'animate-spin-slow text-prakash-gold' : 'text-nidra-indigo/60'}`}>
          ॐ
        </span>
      </motion.button>

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
EOF

success "SoundController updated with first‑visit guide tooltip."

# -----------------------------------------------------------------------------
# Clean and rebuild
# -----------------------------------------------------------------------------
rm -rf .next
info "Running production build..."
if npm run build; then
    success "✅ Build successful!"
else
    warn "Build had issues – check logs."
fi

echo ""
success "🎉 Sound controller now guides users:"
echo "   - First‑time visitors see 'Click to play/pause · Right‑click to mute'"
echo "   - Button glows when music is playing"
echo "   - Toast confirms play/pause and mute actions"
echo ""
echo "📦 Backups saved in $BACKUP_DIR"
echo "🚀 Run 'npm run dev' to test the guided experience."