'use client';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

export default function PointsBadge() {
  const { profile } = useAuth();
  const { items: profiles } = useRealtimeContent<any>('profiles', 'created_at');
  const userProfile = profiles.find((p: any) => p.id === profile?.id) || profile;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed top-24 right-6 z-40 bg-gradient-to-r from-prakash-gold to-sacred-saffron p-[2px] rounded-full shadow-xl"
    >
      <div className="bg-white rounded-full px-5 py-2 flex items-center gap-2">
        <span className="text-xl">⭐</span>
        <span className="font-sans font-bold text-nidra-indigo">{userProfile?.coins || 0} Coins</span>
      </div>
    </motion.div>
  );
}
