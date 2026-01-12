'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, ArrowUp } from 'lucide-react';

// Custom Strava icon since lucide doesn't have it
function StravaIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/oportorunninglab' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/oportorunninglab' },
  { name: 'Strava', icon: StravaIcon, href: 'https://strava.com/clubs/oportorunninglab' },
];

const navLinks = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'programs', href: '#programs' },
  { name: 'gallery', href: '#gallery' },
  { name: 'contact', href: '#signup' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" style={{ position: 'relative', background: 'black', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: '-24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48px',
          height: '48px',
          background: 'white',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <ArrowUp style={{ width: '20px', height: '20px' }} />
      </motion.button>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem'
        }}>
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>OPO</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)' }}>.</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.1em' }}>RUN</span>
              </div>
            </Link>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {t('tagline')}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>
              <MapPin style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '0.875rem' }}>{t('location')}</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1.5rem'
            }}>
              Menu
            </h4>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textDecoration: 'none'
                  }}
                >
                  {tNav(link.name)}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact Column */}
          <div>
            <h4 style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1.5rem'
            }}>
              {t('followUs')}
            </h4>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none'
                    }}
                    aria-label={social.name}
                  >
                    <Icon style={{ width: '20px', height: '20px' }} />
                  </a>
                );
              })}
            </div>

            {/* Email */}
            <a
              href="mailto:info@oportorunninglab.pt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              <Mail style={{ width: '16px', height: '16px' }} />
              info@oportorunninglab.pt
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © {currentYear} Oporto Running Lab. {t('rights')}.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('terms')}
            </Link>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
