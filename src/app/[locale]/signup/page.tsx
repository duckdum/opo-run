'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError(t('signup.termsRequired'));
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/onboarding');
      router.refresh();
    }
  };

  const handleGoogleSignup = async () => {
    if (!acceptedTerms) {
      setError(t('signup.termsRequired'));
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=/onboarding`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black flex'>
      {/* Form Panel - Full width on mobile, 45% on desktop */}
      <div className='w-full lg:w-[45%] flex flex-col'>
        <div className='flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16'>
          <div className='w-full max-w-[440px]'>
            {/* Back */}
            <Link
              href='/'
              className='inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group'
            >
              <motion.svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                whileHover={{ x: -3 }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </motion.svg>
              <span className='text-sm font-medium'>Back</span>
            </Link>

            {/* Header */}
            <div className='mb-8'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6'
              >
                <div className='flex items-baseline gap-1'>
                  <span className='text-[2.75rem] font-black text-white tracking-tight leading-none'>
                    OPO
                  </span>
                  <span className='text-[2.75rem] font-black text-white/15 leading-none'>
                    .
                  </span>
                  <span className='text-[2.75rem] font-light text-white tracking-tight leading-none'>
                    RUN
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className='text-[2.5rem] font-bold text-white mb-2 tracking-tight leading-none'>
                  {t('signup.title')}
                </h1>
                <p className='text-[1.0625rem] text-white/45 leading-relaxed'>
                  {t('signup.subtitle')}
                </p>
              </motion.div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl'
              >
                <p className='text-red-400 text-sm'>{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleEmailSignup}
              className='space-y-6'
            >
              <div>
                <label className='block text-[0.8125rem] font-medium text-white/60 mb-2.5 tracking-wide'>
                  FULL NAME
                </label>
                <input
                  type='text'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder={t('signup.fullNamePlaceholder')}
                  className='w-full h-12 px-5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[0.9375rem]
                           placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                           transition-all duration-200'
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                  }}
                />
              </div>

              <div>
                <label className='block text-[0.8125rem] font-medium text-white/60 mb-2.5 tracking-wide'>
                  EMAIL
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete='email'
                  placeholder='you@example.com'
                  className='w-full h-12 px-5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[0.9375rem]
                           placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                           transition-all duration-200'
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                  }}
                />
              </div>

              <div>
                <label className='block text-[0.8125rem] font-medium text-white/60 mb-2.5 tracking-wide'>
                  PASSWORD
                </label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete='new-password'
                  placeholder='Enter your password'
                  className='w-full h-12 px-5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[0.9375rem]
                           placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                           transition-all duration-200'
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                  }}
                />
                <p className='text-xs text-white/40 mt-2.5'>
                  {t('signup.passwordRequirement')}
                </p>
              </div>

              {/* Terms */}
              <label className='flex items-start gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className='mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-white cursor-pointer'
                />
                <span className='text-xs text-white/50 leading-relaxed'>
                  {t('signup.terms')}
                </span>
              </label>

              {/* Submit */}
              <motion.button
                type='submit'
                disabled={loading || !acceptedTerms}
                whileHover={{ scale: loading || !acceptedTerms ? 1 : 1.01 }}
                whileTap={{ scale: loading || !acceptedTerms ? 1 : 0.99 }}
                className='w-full h-12 mt-8 bg-white text-black rounded-xl font-semibold text-[0.9375rem]
                         hover:bg-white/95 active:bg-white/90 transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed'
              >
                {loading
                  ? t('signup.creatingAccount')
                  : t('signup.createAccount')}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <div className='relative my-8'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-white/[0.06]' />
              </div>
              <div className='relative flex justify-center'>
                <span className='px-3 text-[0.8125rem] text-white/30 bg-black font-medium tracking-wider'>
                  OR
                </span>
              </div>
            </div>

            {/* Google */}
            <motion.button
              onClick={handleGoogleSignup}
              disabled={loading || !acceptedTerms}
              whileHover={{ scale: loading || !acceptedTerms ? 1 : 1.01 }}
              whileTap={{ scale: loading || !acceptedTerms ? 1 : 0.99 }}
              className='w-full h-12 flex items-center justify-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl
                       hover:bg-white/[0.05] hover:border-white/[0.12] active:bg-white/[0.04] transition-all duration-200
                       disabled:opacity-40'
            >
              <svg className='w-[1.125rem] h-[1.125rem]' viewBox='0 0 24 24'>
                <path
                  fill='#EA4335'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#4285F4'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#34A853'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span className='text-white font-medium text-[0.9375rem]'>
                {t('signup.signUpWithGoogle')}
              </span>
            </motion.button>

            {/* Footer */}
            <p className='text-center text-white/40 mt-12 text-[0.9375rem]'>
              {t('signup.hasAccount')}{' '}
              <Link
                href='/login'
                className='text-white font-semibold hover:text-white/80 transition-colors'
              >
                {t('signup.signInLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Experience */}
      <div className='hidden lg:flex lg:w-[55%] relative bg-gradient-to-br from-zinc-950 via-black to-zinc-950 overflow-hidden'>
        {/* Subtle Background */}
        <div className='absolute inset-0'>
          <motion.div
            className='absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full'
            style={{
              background:
                'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col items-center justify-center w-full px-16 py-20'>
          {/* Circular Progress Rings - Training Zones */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='mb-20'
          >
            <svg width='400' height='320' viewBox='0 0 400 320' fill='none'>
              {/* Center label - Pace */}
              <motion.text
                x='200'
                y='145'
                fill='white'
                fontSize='48'
                fontWeight='700'
                textAnchor='middle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                4:32
              </motion.text>
              <motion.text
                x='200'
                y='168'
                fill='white'
                fontSize='13'
                fontWeight='500'
                textAnchor='middle'
                opacity='0.5'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6 }}
              >
                MIN/KM
              </motion.text>

              {/* Outer ring - Long Run */}
              <motion.circle
                cx='200'
                cy='140'
                r='120'
                stroke='rgba(59, 130, 246, 0.15)'
                strokeWidth='2'
                fill='none'
              />
              <motion.circle
                cx='200'
                cy='140'
                r='120'
                stroke='url(#ring1Gradient)'
                strokeWidth='2'
                strokeLinecap='round'
                fill='none'
                strokeDasharray='753'
                initial={{ strokeDashoffset: 753 }}
                animate={{ strokeDashoffset: 753 * 0.35 }}
                transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                style={{
                  transformOrigin: '200px 140px',
                  transform: 'rotate(-90deg)',
                }}
              />
              <motion.text
                x='200'
                y='35'
                fill='rgba(59, 130, 246, 0.9)'
                fontSize='11'
                fontWeight='600'
                textAnchor='middle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.2 }}
              >
                LONG RUN
              </motion.text>

              {/* Middle ring - Tempo */}
              <motion.circle
                cx='200'
                cy='140'
                r='95'
                stroke='rgba(168, 85, 247, 0.15)'
                strokeWidth='2'
                fill='none'
              />
              <motion.circle
                cx='200'
                cy='140'
                r='95'
                stroke='url(#ring2Gradient)'
                strokeWidth='2'
                strokeLinecap='round'
                fill='none'
                strokeDasharray='597'
                initial={{ strokeDashoffset: 597 }}
                animate={{ strokeDashoffset: 597 * 0.25 }}
                transition={{ delay: 0.7, duration: 1.5, ease: 'easeOut' }}
                style={{
                  transformOrigin: '200px 140px',
                  transform: 'rotate(-90deg)',
                }}
              />
              <motion.text
                x='140'
                y='65'
                fill='rgba(168, 85, 247, 0.9)'
                fontSize='11'
                fontWeight='600'
                textAnchor='middle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.3 }}
              >
                TEMPO
              </motion.text>

              {/* Inner ring - Interval */}
              <motion.circle
                cx='200'
                cy='140'
                r='70'
                stroke='rgba(239, 68, 68, 0.15)'
                strokeWidth='2'
                fill='none'
              />
              <motion.circle
                cx='200'
                cy='140'
                r='70'
                stroke='url(#ring3Gradient)'
                strokeWidth='2'
                strokeLinecap='round'
                fill='none'
                strokeDasharray='440'
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 * 0.6 }}
                transition={{ delay: 0.9, duration: 1.5, ease: 'easeOut' }}
                style={{
                  transformOrigin: '200px 140px',
                  transform: 'rotate(-90deg)',
                }}
              />
              <motion.text
                x='145'
                y='105'
                fill='rgba(239, 68, 68, 0.9)'
                fontSize='11'
                fontWeight='600'
                textAnchor='middle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.4 }}
              >
                INTERVAL
              </motion.text>

              {/* Data points */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                {/* Current pace indicator */}
                <circle
                  cx='200'
                  cy='20'
                  r='4'
                  fill='#3b82f6'
                  filter='url(#dotGlow3)'
                />
                <motion.circle
                  cx='200'
                  cy='20'
                  r='8'
                  stroke='#3b82f6'
                  strokeWidth='1.5'
                  fill='none'
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0.3, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.g>

              {/* Bottom stats - Running specific */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <text
                  x='80'
                  y='290'
                  fill='white'
                  fontSize='20'
                  fontWeight='700'
                  textAnchor='middle'
                >
                  21.1
                </text>
                <text
                  x='80'
                  y='305'
                  fill='white'
                  fontSize='10'
                  fontWeight='500'
                  textAnchor='middle'
                  opacity='0.5'
                >
                  KM TOTAL
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <text
                  x='200'
                  y='290'
                  fill='white'
                  fontSize='20'
                  fontWeight='700'
                  textAnchor='middle'
                >
                  180
                </text>
                <text
                  x='200'
                  y='305'
                  fill='white'
                  fontSize='10'
                  fontWeight='500'
                  textAnchor='middle'
                  opacity='0.5'
                >
                  CADENCE
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <text
                  x='320'
                  y='290'
                  fill='white'
                  fontSize='20'
                  fontWeight='700'
                  textAnchor='middle'
                >
                  +42
                </text>
                <text
                  x='320'
                  y='305'
                  fill='white'
                  fontSize='10'
                  fontWeight='500'
                  textAnchor='middle'
                  opacity='0.5'
                >
                  ELEV GAIN
                </text>
              </motion.g>

              <defs>
                <linearGradient
                  id='ring1Gradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <stop offset='0%' stopColor='rgba(59, 130, 246, 0.9)' />
                  <stop offset='100%' stopColor='rgba(37, 99, 235, 0.9)' />
                </linearGradient>
                <linearGradient
                  id='ring2Gradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <stop offset='0%' stopColor='rgba(168, 85, 247, 0.9)' />
                  <stop offset='100%' stopColor='rgba(147, 51, 234, 0.9)' />
                </linearGradient>
                <linearGradient
                  id='ring3Gradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <stop offset='0%' stopColor='rgba(239, 68, 68, 0.9)' />
                  <stop offset='100%' stopColor='rgba(220, 38, 38, 0.9)' />
                </linearGradient>
                <filter id='dotGlow3'>
                  <feGaussianBlur stdDeviation='3' result='coloredBlur' />
                  <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='text-center max-w-lg mb-20'
          >
            <h2 className='text-5xl font-bold text-white mb-5 leading-tight tracking-tight'>
              Every pace has a purpose
            </h2>
            <p className='text-xl text-white/50 leading-relaxed'>
              Master your training zones. Track every split. Run with precision.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className='grid grid-cols-3 gap-12 w-full max-w-2xl'
          >
            {[
              {
                value: '500+',
                label: 'Active Athletes',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                value: '20+',
                label: 'Expert Coaches',
                color: 'from-purple-500 to-pink-500',
              },
              {
                value: '10k+',
                label: 'Training Sessions',
                color: 'from-orange-500 to-red-500',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className='text-center'
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className='text-sm text-white/40 font-medium tracking-wide'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
