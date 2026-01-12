'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tight">OPO</span>
              <span className="text-4xl md:text-5xl font-black text-white/40">.</span>
              <span className="text-4xl md:text-5xl font-light tracking-wider">RUN</span>
            </motion.div>

            {/* Running animation */}
            <div className="relative h-1 w-64 bg-white/10 overflow-hidden mx-auto">
              <motion.div
                className="absolute top-0 left-0 h-full w-20 bg-white"
                animate={{ x: ['-80px', '256px'] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
