'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Shirt, Mail } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
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

export default function SignUp() {
  const t = useTranslations('signup');
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    experience: '',
    goals: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);

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
      setFormData({ name: '', email: '', experience: '', goals: '' });
    } catch {
      setStatus('error');
      setSubmitResult(null);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.75rem',
  };

  return (
    <section id="signup" className="relative bg-black overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>

      <div ref={containerRef} style={{ maxWidth: '72rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {t('badge')}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            {t('title')}
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Left Column - T-shirt Promo Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src={locale === 'pt' ? '/images/tshirt-promo-pt.png' : '/images/tshirt-promo-en.png'}
              alt="Free T-shirt for first 20 members"
              width={500}
              height={333}
              style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
              priority
            />
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
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
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="" style={{ background: 'black' }}>{t('selectPlaceholder')}</option>
                  <option value="beginner" style={{ background: 'black' }}>{t('experienceOptions.beginner')}</option>
                  <option value="intermediate" style={{ background: 'black' }}>{t('experienceOptions.intermediate')}</option>
                  <option value="advanced" style={{ background: 'black' }}>{t('experienceOptions.advanced')}</option>
                </select>
              </div>
            </div>

            {/* Goals */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>{t('goals')}</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={4}
                style={{ ...inputStyle, resize: 'none' }}
                placeholder={t('goalsPlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '1.25rem',
                background: 'white',
                color: 'black',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.5 : 1,
              }}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                  {t('submitting')}
                </>
              ) : (
                <>
                  {t('submit')}
                  <Send style={{ width: '1rem', height: '1rem' }} />
                </>
              )}
            </button>

            {/* Success Message - Enhanced */}
            {status === 'success' && submitResult && (
              <div style={{ marginTop: '1.5rem' }}>
                {/* Main success message */}
                <div style={{
                  padding: '1rem',
                  background: 'rgba(34,197,94,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e', flexShrink: 0 }} />
                  <span style={{ color: '#4ade80' }}>{t('success')}</span>
                </div>

                {/* T-shirt eligibility */}
                {submitResult.tshirtEligible && (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}>
                    <Shirt style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{t('tshirtEligible')}</span>
                  </div>
                )}

                {/* Email confirmation */}
                <div style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255,255,255,0.6)', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{t('emailConfirmation')}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
                <span style={{ color: '#f87171' }}>{t('error')}</span>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
