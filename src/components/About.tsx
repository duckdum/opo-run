'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, TrendingUp, Heart, Sparkles } from 'lucide-react';

const programItems = [
  { key: 'group', icon: Users },
  { key: 'technique', icon: Target },
  { key: 'personalized', icon: TrendingUp },
  { key: 'special', icon: Sparkles },
  { key: 'support', icon: Heart },
] as const;

export default function About() {
  const t = useTranslations('about');
  const tProgram = useTranslations('program');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative bg-black overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>

      <div ref={containerRef} style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            {t('title')}
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="about-content-grid">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ fontSize: '1.25rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>
              {t('description')}
            </p>

            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
              {t('approach')}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>
                {t('location')}
              </span>
            </div>
          </motion.div>

          {/* Right - Mission Statement */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div style={{ padding: '3rem', background: 'rgba(255,255,255,0.03)' }}>
              <blockquote style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 300, fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                &ldquo;{t('mission')}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>

        {/* Program Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1rem' }}>{tProgram('title')}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.125rem' }}>{tProgram('subtitle')}</p>
          </div>

          {/* Program Items Grid - 3 on top, 2 centered below */}
          <div className="program-grid-top" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {programItems.slice(0, 3).map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ padding: '2rem', textAlign: 'center' }}
              >
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Icon style={{ width: '2.5rem', height: '2.5rem', color: 'rgba(255,255,255,0.7)' }} />
                </div>

                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {tProgram(`items.${key}.title`)}
                </h4>

                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {tProgram(`items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
          {/* Bottom 2 items centered */}
          <div className="program-grid-bottom" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            maxWidth: '600px',
            margin: '2rem auto 0',
            alignItems: 'flex-start'
          }}>
            {programItems.slice(3).map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                style={{ padding: '2rem', textAlign: 'center', flex: '0 0 250px' }}
              >
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Icon style={{ width: '2.5rem', height: '2.5rem', color: 'rgba(255,255,255,0.7)' }} />
                </div>

                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {tProgram(`items.${key}.title`)}
                </h4>

                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {tProgram(`items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
