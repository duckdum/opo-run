'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { defaultLocale } from '@/i18n/config';

// Homepage scroll sections
const scrollItems = ['home', 'about', 'programs', 'gallery', 'contact'] as const;

// Separate pages
const pageItems = [
  { key: 'events', href: '/events' },
  { key: 'blog', href: '/blog' },
  { key: 'trainers', href: '/trainers' },
] as const;

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on the homepage (pathname from next-intl excludes locale prefix)
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    // next-intl's useRouter handles locale switching automatically
    // pathname from next-intl already excludes the locale prefix
    router.replace(pathname || '/', { locale: newLocale as 'pt' | 'en' });
  };

  const handleScrollSection = (section: string) => {
    setIsOpen(false);
    if (!isHomePage) {
      // Navigate to homepage first, then scroll
      // Using window.location for hash navigation
      const basePath = locale === defaultLocale ? '' : `/${locale}`;
      window.location.href = `${basePath}/#${section}`;
      return;
    }
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageNavigation = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        )}
        style={{ height: '60px' }}
      >
        {/* Logo - fixed at left edge */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
        >
          <motion.div
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl md:text-2xl font-black tracking-tight">
              OPO
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white/40">
              .
            </span>
            <span className="text-xl md:text-2xl font-light tracking-wider">
              RUN
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>

        {/* Navigation - centered with page content, with padding for logo and language switcher */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', height: '100%', paddingLeft: '8rem', paddingRight: '8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {/* Homepage scroll links */}
              {scrollItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleScrollSection(item)}
                  className="relative text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {t(item)}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}

              {/* Divider */}
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />

              {/* Page links */}
              {pageItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => handlePageNavigation(item.href)}
                  className={clsx(
                    "relative text-xs uppercase tracking-widest transition-colors",
                    pathname.includes(item.href) ? "text-white" : "text-white/70 hover:text-white"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {t(item.key)}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white origin-left"
                    initial={{ scaleX: pathname.includes(item.href) ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}

          </div>
        </div>

        {/* Language Switcher - fixed at right edge on desktop */}
        <div
          className="hidden md:flex"
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <button
            onClick={() => switchLocale('pt')}
            style={{
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: 'none',
              background: locale === 'pt' ? 'rgba(255,255,255,0.1)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: locale === 'pt' ? 'white' : 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>🇵🇹</span>
            PT
          </button>
          <button
            onClick={() => switchLocale('en')}
            style={{
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: 'none',
              background: locale === 'en' ? 'rgba(255,255,255,0.1)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: locale === 'en' ? 'white' : 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>🇬🇧</span>
            EN
          </button>
        </div>

        {/* Mobile Menu Button - fixed at right edge, same distance as logo from left */}
        <motion.button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            right: '1.5rem',
            top: '18px',
            zIndex: 9999,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {/* Homepage scroll links */}
              {scrollItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => handleScrollSection(item)}
                  className="text-2xl font-light uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  {t(item)}
                </motion.button>
              ))}

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.35 }}
                style={{ width: '100px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '1rem 0' }}
              />

              {/* Page links */}
              {pageItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  onClick={() => handlePageNavigation(item.href)}
                  className={clsx(
                    "text-2xl font-light uppercase tracking-widest transition-colors",
                    pathname.includes(item.href) ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {t(item.key)}
                </motion.button>
              ))}

              {/* Mobile Language Switcher with Flags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '2.5rem',
                }}
              >
                <button
                  onClick={() => {
                    switchLocale('pt');
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    border: 'none',
                    background: locale === 'pt' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: locale === 'pt' ? 'white' : 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🇵🇹</span>
                  PT
                </button>
                <button
                  onClick={() => {
                    switchLocale('en');
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    border: 'none',
                    background: locale === 'en' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: locale === 'en' ? 'white' : 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🇬🇧</span>
                  EN
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
