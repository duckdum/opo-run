'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Animated gradient orbs
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Secondary orb */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '35vw',
          height: '35vw',
          maxWidth: '400px',
          maxHeight: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Speed lines suggesting motion
function SpeedLines() {
  const lines = [
    { top: '25%', delay: 0, duration: 3 },
    { top: '45%', delay: 0.5, duration: 2.5 },
    { top: '65%', delay: 1, duration: 3.5 },
    { top: '80%', delay: 1.5, duration: 2.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: line.top,
            left: '-20%',
            width: '40%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
          animate={{
            x: ['0%', '300%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Floating particles
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Animated ring pulse
function PulseRing() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: [100, 800],
            height: [100, 800],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 5,
            delay: i * 1.7,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// Animated text character reveal
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'black',
      }}
    >
      {/* Background Effects */}
      <GradientOrbs />
      <SpeedLines />
      <FloatingParticles />
      <PulseRing />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, black, transparent, black)',
        opacity: 0.6,
      }} />

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y, padding: '0 1.5rem' }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {/* Pre-title line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80px', opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, white, transparent)',
            margin: '0 auto 2rem',
          }}
        />

        {/* Main Title with character animation */}
        <h1 style={{
          fontSize: 'clamp(3rem, 15vw, 10rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 0.9,
          marginBottom: '0.5rem',
        }}>
          <AnimatedText text={t('title')} delay={0.5} />
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            fontSize: 'clamp(1.5rem, 6vw, 4rem)',
            fontWeight: 200,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '2rem',
          }}
        >
          {t('subtitle')}
        </motion.div>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            maxWidth: '400px',
            margin: '0 auto 2rem',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '3rem',
          }}
        >
          {t('tagline')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            position: 'relative',
            padding: '1.25rem 3rem',
            background: 'white',
            color: 'black',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>{t('cta')}</span>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
            }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={scrollToAbout}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.4)',
          }}>
            {t('scroll')}
          </span>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown style={{ width: '20px', height: '20px', color: 'rgba(255,255,255,0.4)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
