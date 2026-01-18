'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Partner data - can be expanded
const partners = [
  {
    name: 'Fisiogo',
    logo: '/images/partners/fisiogo.png', // Placeholder - add actual logo
    url: 'https://fisiogo.pt',
    description: 'Fisioterapia & Osteopatia'
  },
  // Add more partners as needed
];

export default function Partners() {
  const t = useTranslations('partners');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="partners" className="relative bg-black overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div ref={containerRef} style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            {t('title')}
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Partners Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                padding: '2rem 3rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s',
              }}
            >
              {/* Logo placeholder */}
              <div style={{
                width: '120px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}>
                {partner.name}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {partner.description}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
