'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Gift, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
}

export default function SignUp() {
  const t = useTranslations('signup');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', experience: '', goals: '' });
    } catch {
      setStatus('error');
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

      <div ref={containerRef} className="max-w-3xl mx-auto" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: '4rem' }}
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

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)' }}>
            <Gift style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{t('gift')}</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
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

            {/* Phone */}
            <div>
              <label style={labelStyle}>{t('phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
                placeholder="+351 912 345 678"
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

          {/* Status Messages */}
          {status === 'success' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} />
              <span style={{ color: '#4ade80' }}>{t('success')}</span>
            </div>
          )}

          {status === 'error' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
              <span style={{ color: '#f87171' }}>{t('error')}</span>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
