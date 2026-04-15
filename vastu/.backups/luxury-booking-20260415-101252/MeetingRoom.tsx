'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface MeetingRoomProps {
  consultationId: string;
  scheduledAt: string;
  status: string;
  meetingUrl: string | null;
  onMeetingEnd?: () => void;
}

export default function MeetingRoom({
  consultationId,
  scheduledAt,
  status,
  meetingUrl,
  onMeetingEnd,
}: MeetingRoomProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [countdown, setCountdown] = useState<string>('');
  const [showIframe, setShowIframe] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const meetingRoomName = meetingUrl?.split('/').pop() || `VedicUrja-${consultationId}`;
  const jitsiUrl = `https://meet.jit.si/${meetingRoomName}`;

  useEffect(() => {
    const checkAccess = () => {
      const now = new Date();
      const scheduled = new Date(scheduledAt);
      const diff = scheduled.getTime() - now.getTime();
      const tenMinutes = 10 * 60 * 1000;
      const unlocked = (status === 'scheduled' || status === 'completed') && diff < tenMinutes;
      setIsUnlocked(unlocked);
      if (!unlocked && diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else if (!unlocked) {
        setCountdown('Meeting not available');
      }
    };
    checkAccess();
    timerRef.current = setInterval(checkAccess, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [scheduledAt, status]);

  const handleJoin = () => {
    if (isUnlocked) {
      setShowIframe(true);
      supabase.from('consultations').update({ status: 'in_progress' }).eq('id', consultationId);
    }
  };

  const handleLeave = () => {
    setShowIframe(false);
    if (onMeetingEnd) onMeetingEnd();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-prakash-gold/30 shadow-2xl bg-nidra-indigo/5">
      <AnimatePresence>
        {!showIframe ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aspect-video flex flex-col items-center justify-center p-8"
          >
            {isUnlocked ? (
              <>
                <div className="text-6xl mb-6">🎥</div>
                <h3 className="font-serif text-2xl text-nidra-indigo mb-4">Your Meeting is Ready</h3>
                <p className="text-nidra-indigo/70 mb-8">Click below to join the virtual consultation.</p>
                <button onClick={handleJoin} className="luxury-button px-10 py-4 text-lg">
                  Join Meeting Now
                </button>
              </>
            ) : (
              <>
                <div className="lock-animation mb-6">
                  <div className="lock-body"><div className="lock-shackle"></div></div>
                </div>
                <h3 className="font-serif text-2xl text-nidra-indigo mb-2">Meeting Locked</h3>
                <p className="text-nidra-indigo/70 mb-2">Unlocks 10 minutes before your scheduled time</p>
                <p className="text-3xl font-mono text-sacred-saffron">{countdown}</p>
                <p className="text-sm text-nidra-indigo/50 mt-4">Scheduled: {new Date(scheduledAt).toLocaleString()}</p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative aspect-video"
          >
            <iframe
              src={jitsiUrl}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              className="w-full h-full"
              style={{ border: 0 }}
            />
            <button
              onClick={handleLeave}
              className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              Leave Meeting
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .lock-animation { width: 100px; height: 100px; position: relative; animation: pulse 2s infinite; }
        .lock-body { width: 60px; height: 50px; background: #C88A5D; border-radius: 8px; position: absolute; bottom: 0; left: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .lock-shackle { width: 40px; height: 40px; border: 6px solid #C88A5D; border-bottom: none; border-radius: 40px 40px 0 0; position: absolute; top: -10px; left: 10px; }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
      `}</style>
    </div>
  );
}
