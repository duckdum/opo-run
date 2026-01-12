'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Stethoscope, Apple, Brain, ExternalLink } from 'lucide-react';

const services = [
  { key: 'physio', icon: Stethoscope },
  { key: 'nutrition', icon: Apple },
  { key: 'psychology', icon: Brain },
] as const;

export default function Services() {
  const t = useTranslations('services');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative bg-black overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div ref={containerRef} className="max-w-6xl mx-auto" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            {t('title')}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {services.map(({ key, icon: Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{
                padding: '2.5rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s',
              }}
            >
              {/* Icon */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                }}>
                  <Icon style={{ width: '2rem', height: '2rem', color: 'rgba(255,255,255,0.7)' }} />
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                {t(`${key}.title`)}
              </h3>

              {/* Description */}
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {t(`${key}.description`)}
              </p>

              {/* Partner badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: t(`${key}.partner`) === 'Fisiogo' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: t(`${key}.partner`) === 'Fisiogo' ? 'white' : 'rgba(255,255,255,0.4)',
                }}>
                  {t(`${key}.partner`)}
                </span>
                {t(`${key}.partner`) === 'Fisiogo' && (
                  <ExternalLink style={{ width: '0.875rem', height: '0.875rem', color: 'rgba(255,255,255,0.4)' }} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
