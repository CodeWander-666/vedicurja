'use client';
import { motion } from 'framer-motion';
import './GlobalLoader.css';

interface GlobalLoaderProps {
  isLoading: boolean;
  message?: string;
}

export default function GlobalLoader({ isLoading, message = "Loading VedicUrja..." }: GlobalLoaderProps) {
  if (!isLoading) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-white/30"
    >
      <div className="text-center">
        <div className="mainWrap">
          <div className="wrapper">
            <div className="c1">
              <div className="c2">
                <div className="c3">
                  <div className="rect1">
                    <div className="miniC"></div>
                    <div className="c4">
                      <div className="rect2">
                        <div className="rect3"></div>
                      </div>
                    </div>
                    <div className="c5"></div>
                    <div className="c6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-nidra-indigo font-serif text-lg animate-pulse">{message}</p>
      </div>
    </motion.div>
  );
}
