'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const packages = ['starter', 'evolution', 'performance', 'mentoria'] as const;

export default function Packages() {
  const t = useTranslations('packages');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="programs" className="relative bg-black overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div ref={containerRef} style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            {t('title')}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Packages Grid */}
        <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {packages.map((pkg, index) => {
            const isPopular = pkg === 'evolution';
            const features = t.raw(`${pkg}.features`) as string[];

            return (
              <motion.div
                key={pkg}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                style={{ position: 'relative', height: '100%' }}
              >
                <div
                  style={{
                    height: '100%',
                    padding: '2.5rem',
                    background: isPopular ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isPopular ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isPopular ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div style={{ position: 'absolute', top: '-0.75rem', left: '2rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'white',
                        color: 'black',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}>
                        {t('evolution.popular')}
                      </span>
                    </div>
                  )}

                  {/* Package content */}
                  <div style={{ paddingTop: isPopular ? '1rem' : 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Package name */}
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t(`${pkg}.name`)}</h3>

                    {/* Description */}
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.9rem', minHeight: '2.5rem' }}>{t(`${pkg}.description`)}</p>

                    {/* Features */}
                    <ul style={{ marginBottom: '2rem', flex: 1 }}>
                      {features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}
                        >
                          <Check style={{ width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s',
                        background: isPopular ? 'white' : 'rgba(255,255,255,0.1)',
                        color: isPopular ? 'black' : 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: 'auto',
                      }}
                    >
                      {t('cta')}
                      <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', marginTop: '4rem' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
