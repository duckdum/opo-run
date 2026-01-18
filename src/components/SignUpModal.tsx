'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Gift, Send, CheckCircle, AlertCircle, Loader2, Shirt, Mail } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
}

interface SubmitResponse {
  success: boolean;
  tshirtEligible?: boolean;
  emailSent?: boolean;
  message?: string;
  error?: string;
}

const COOKIE_NAME = 'opo_modal_shown';

function getModalCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
  return match ? match[2] : null;
}

function setModalCookie(): void {
  if (typeof document === 'undefined') return;
  const today = new Date().toDateString();
  const expires = new Date();
  expires.setHours(23, 59, 59, 999);
  document.cookie = `${COOKIE_NAME}=${today}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function shouldShowModal(): boolean {
  const cookieValue = getModalCookie();
  const today = new Date().toDateString();
  return cookieValue !== today;
}

export default function SignUpModal() {
  const t = useTranslations('signup');
  const tModal = useTranslations('modal');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShowModal()) {
        setIsOpen(true);
        setModalCookie();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result: SubmitResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      setStatus('success');
      setSubmitResult(result);
      setFormData({ name: '', email: '', phone: '', experience: '', goals: '' });
    } catch {
      setStatus('error');
      setSubmitResult(null);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    borderRadius: '0',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.5rem',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Container - handles centering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9998,
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflowY: 'auto',
            }}
          >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#000000',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                padding: '0.5rem',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close"
            >
              <X style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            </button>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              {/* T-shirt promo image */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Image
                  src={locale === 'pt' ? '/images/tshirt-promo-pt.png' : '/images/tshirt-promo-en.png'}
                  alt="Free T-shirt for first 20 members"
                  width={380}
                  height={253}
                  style={{ width: '100%', height: 'auto', maxWidth: '380px' }}
                  priority
                />
              </div>

              {/* Form */}
              {status !== 'success' ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                    {/* Name */}
                    <div>
                      <label style={labelStyle}>{t('name')}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="Joao Silva"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>{t('email')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="joao@email.com"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label style={labelStyle}>{t('experience')}</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        style={{
                          ...inputStyle,
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundSize: '1rem',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <option value="" style={{ background: 'black' }}>{t('selectPlaceholder')}</option>
                        <option value="beginner" style={{ background: 'black' }}>{t('experienceOptions.beginner')}</option>
                        <option value="intermediate" style={{ background: 'black' }}>{t('experienceOptions.intermediate')}</option>
                        <option value="advanced" style={{ background: 'black' }}>{t('experienceOptions.advanced')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'white',
                      color: 'black',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      border: 'none',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      opacity: status === 'loading' ? 0.5 : 1,
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
                        {t('submitting')}
                      </>
                    ) : (
                      <>
                        {t('submit')}
                        <Send style={{ width: '0.875rem', height: '0.875rem' }} />
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      background: 'rgba(239,68,68,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <AlertCircle style={{ width: '1rem', height: '1rem', color: '#ef4444', flexShrink: 0 }} />
                      <span style={{ color: '#f87171', fontSize: '0.875rem' }}>{t('error')}</span>
                    </div>
                  )}

                  {/* Footer note */}
                  <div style={{
                    marginTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'center',
                  }}>
                    <Gift style={{ width: '0.875rem', height: '0.875rem', color: 'rgba(255,255,255,0.5)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{t('foundingMember')}</span>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'rgba(34,197,94,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}>
                    <CheckCircle style={{ width: '2rem', height: '2rem', color: '#22c55e' }} />
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '0.75rem',
                  }}>
                    {t('success')}
                  </h3>

                  {submitResult?.tshirtEligible && (
                    <div style={{
                      padding: '1rem',
                      background: 'rgba(34,197,94,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      justifyContent: 'center',
                    }}>
                      <Shirt style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e', flexShrink: 0 }} />
                      <span style={{ color: '#4ade80', fontSize: '0.9rem' }}>{t('tshirtEligible')}</span>
                    </div>
                  )}

                  <div style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <Mail style={{ width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.6)', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{t('emailConfirmation')}</span>
                  </div>

                  <button
                    onClick={handleClose}
                    style={{
                      padding: '0.875rem 2rem',
                      background: 'white',
                      color: 'black',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tModal('close')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
