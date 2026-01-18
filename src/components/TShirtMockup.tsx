'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TShirtMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* T-shirt silhouette */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          width: '280px',
          height: '320px',
        }}
      >
        {/* T-shirt SVG shape */}
        <svg
          viewBox="0 0 280 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* T-shirt body */}
          <path
            d="M70 70 L35 90 L50 130 L70 115 L70 290 L210 290 L210 115 L230 130 L245 90 L210 70 L185 50 L95 50 L70 70Z"
            fill="rgba(15, 15, 15, 1)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Neck */}
          <path
            d="M95 50 Q140 75 185 50"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
          />
          {/* Left sleeve detail */}
          <path
            d="M70 70 L35 90"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          {/* Right sleeve detail */}
          <path
            d="M210 70 L245 90"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        </svg>

        {/* Logo overlay */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
          }}
        >
          <Image
            src="/logo/opo-run-square.svg"
            alt="OPO.RUN Logo"
            width={100}
            height={100}
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.9,
            }}
          />
        </div>

        {/* Subtle glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* "FREE" badge */}
      <motion.div
        initial={{ rotate: -15, scale: 0 }}
        animate={{ rotate: -15, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          background: 'white',
          color: 'black',
          padding: '0.5rem 1rem',
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        FREE
      </motion.div>
    </motion.div>
  );
}
