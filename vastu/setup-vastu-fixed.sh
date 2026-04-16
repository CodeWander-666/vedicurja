#!/bin/bash
# =============================================================================
# VedicUrja – Fix Acharya Portrait (Mobile) + Sound Status Toast
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }

BACKUP_DIR=".backups/portrait-sound-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
info "Backups saved to $BACKUP_DIR"

backup_file() { [ -f "$1" ] && cp "$1" "$BACKUP_DIR/"; }

# -----------------------------------------------------------------------------
# 1. Fix Acharya Portrait in AcharyaVow for mobile
# -----------------------------------------------------------------------------
ACHARYA_VOW="src/components/sections/home/AcharyaVow.tsx"
if [ -f "$ACHARYA_VOW" ]; then
    backup_file "$ACHARYA_VOW"
    # Adjust the portrait container to be fully visible on mobile
    sed -i 's|relative h-\[300px\] sm:h-\[400px\] md:h-\[500px\]|relative h-[350px] sm:h-[400px] md:h-[500px] w-full|g' "$ACHARYA_VOW"
    # Ensure the image itself uses object-contain or proper positioning
    sed -i 's|object-cover|object-contain sm:object-cover|g' "$ACHARYA_VOW"
    success "AcharyaVow portrait adjusted for mobile."
fi

# -----------------------------------------------------------------------------
# 2. Enhance SoundController with play/pause toast notification
# -----------------------------------------------------------------------------
SOUND_CONTROLLER="src/components/global/SoundController.tsx"
if [ -f "$SOUND_CONTROLLER" ]; then
    backup_file "$SOUND_CONTROLLER"
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
EOF
    success "SoundController enhanced with toast notifications."
fi

# -----------------------------------------------------------------------------
# 3. Rebuild to verify
# -----------------------------------------------------------------------------
rm -rf .next
info "Running production build..."
if npm run build; then
    success "✅ Build successful!"
else
    warn "Build had issues – check logs."
fi

echo ""
success "🎉 Fixes applied:"
echo "   - Acharya portrait fully visible on mobile"
echo "   - Om button shows 'Music playing' / 'Music paused' toast"
echo "   - Right-click shows 'Sound muted' / 'Sound unmuted' toast"
echo ""
echo "📦 Backups saved in $BACKUP_DIR"
echo "🚀 Run 'npm run dev' to see the changes."