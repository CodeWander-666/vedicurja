'use client';
import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  onExpire?: () => void;
}

export default function CountdownTimer({ targetDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        if (onExpire) onExpire();
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };
    calculate();
    timerRef.current = setInterval(calculate, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [targetDate, onExpire]);

  if (isExpired) return null;
  return (
    <div className="flex gap-2 justify-center font-mono text-2xl font-bold text-nidra-indigo">
      <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl shadow-inner">{String(timeLeft.hours).padStart(2, '0')}</div>
      <span className="text-prakash-gold">:</span>
      <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl shadow-inner">{String(timeLeft.minutes).padStart(2, '0')}</div>
      <span className="text-prakash-gold">:</span>
      <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl shadow-inner">{String(timeLeft.seconds).padStart(2, '0')}</div>
    </div>
  );
}
