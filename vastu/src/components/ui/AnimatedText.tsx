'use client';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const letters = text.split('');
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
        hidden: {}
      }}
      className={className}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 12, stiffness: 200 } },
            hidden: { opacity: 0, y: 20, filter: 'blur(4px)' }
          }}
          className="inline-block"
          whileHover={{ scale: 1.2, color: '#E8B960', transition: { duration: 0.2 } }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function GradientText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-sacred-saffron via-prakash-gold to-kumkuma-red bg-clip-text text-transparent animate-gradient-x ${className}`}>
      {text}
    </span>
  );
}
