'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

// Running figure animation component
function RunningFigure({ delay = 0, left = 0 }: { delay?: number; left?: number }) {
  return (
    <motion.div
      className="absolute bottom-[20%] w-[3px] h-[60px] md:h-[80px]"
      style={{ left: `${left}%` }}
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{
        x: ['0vw', '100vw'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* Running stick figure */}
      <svg viewBox="0 0 40 100" className="w-full h-full" fill="none" stroke="white" strokeWidth="2">
        <motion.g
          animate={{
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Head */}
          <circle cx="20" cy="10" r="8" />
          {/* Body */}
          <line x1="20" y1="18" x2="20" y2="50" />
          {/* Arms */}
          <motion.line
            x1="20" y1="28"
            animate={{
              x2: [35, 5],
              y2: [38, 18],
            }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.line
            x1="20" y1="28"
            animate={{
              x2: [5, 35],
              y2: [18, 38],
            }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          />
          {/* Legs */}
          <motion.line
            x1="20" y1="50"
            animate={{
              x2: [35, 10],
              y2: [85, 70],
            }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.line
            x1="20" y1="50"
            animate={{
              x2: [10, 35],
              y2: [70, 85],
            }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

// Animated running track lines
function TrackLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal track lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            top: `${30 + i * 10}%`,
            width: '200%',
            left: '-50%',
          }}
          animate={{
            x: ['-25%', '0%'],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Particle system for dynamic effect
function Particles() {
  const [particles] = useState(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Dynamic running pulse effect
function PulseRings() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: [100, 600],
            height: [100, 600],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 1.3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Effects */}
      <Particles />
      <PulseRings />


      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y, paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {/* Pre-title line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-white/50 mx-auto mb-8"
        />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[12vw] md:text-[10vw] lg:text-[8rem] font-black tracking-tighter leading-none"
        >
          <span className="block">{t('title')}</span>
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="block text-[8vw] md:text-[6vw] lg:text-[5rem] font-extralight tracking-[0.3em] text-white/80"
          >
            {t('subtitle')}
          </motion.span>
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent max-w-md mx-auto my-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-white/70 mb-12"
        >
          {t('tagline')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative px-10 py-4 bg-white text-black font-medium uppercase tracking-widest text-sm overflow-hidden"
        >
          <span className="relative z-10">{t('cta')}</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">{t('scroll')}</span>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>

    </section>
  );
}
