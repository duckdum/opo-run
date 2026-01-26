'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Running figure animation */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ left: '-10%' }}
          animate={{ left: '110%' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0, -8, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Runner silhouette */}
              <motion.g
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: 'center' }}
              >
                <circle cx="60" cy="30" r="12" fill="white" opacity="0.9" />
                <ellipse cx="60" cy="55" rx="8" ry="20" fill="white" opacity="0.9" />
                <motion.line
                  x1="60" y1="50" x2="75" y2="40"
                  stroke="white" strokeWidth="4" strokeLinecap="round"
                  opacity="0.9"
                  animate={{
                    x2: [75, 70, 75],
                    y2: [40, 45, 40],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.line
                  x1="60" y1="50" x2="45" y2="60"
                  stroke="white" strokeWidth="4" strokeLinecap="round"
                  opacity="0.9"
                  animate={{
                    x2: [45, 50, 45],
                    y2: [60, 55, 60],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.15
                  }}
                />
                <motion.line
                  x1="60" y1="70" x2="50" y2="95"
                  stroke="white" strokeWidth="4" strokeLinecap="round"
                  opacity="0.9"
                  animate={{
                    x2: [50, 45, 50],
                    y2: [95, 90, 95],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.line
                  x1="60" y1="70" x2="70" y2="95"
                  stroke="white" strokeWidth="4" strokeLinecap="round"
                  opacity="0.9"
                  animate={{
                    x2: [70, 75, 70],
                    y2: [95, 90, 95],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.15
                  }}
                />
              </motion.g>
            </svg>
          </motion.div>
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          <h2 className="text-6xl font-black text-white mb-6">
            OPO<span className="text-white/40">.</span>RUN
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Join Porto's premier running community. Train smarter, run faster, achieve more.
          </p>
          <div className="mt-12 space-y-4">
            {['Professional coaching', 'Track your progress', 'Join group runs'].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/70">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">Back to home</span>
          </Link>

          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {t('login.title')}
            </h1>
            <p className="text-white/50">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl overflow-hidden"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {t('login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('login.emailPlaceholder')}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30
                         focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {t('login.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('login.passwordPlaceholder')}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30
                         focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/reset-password"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {t('login.forgotPassword')}
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 bg-white text-black rounded-xl font-semibold
                       hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('login.signingIn') : t('login.signIn')}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-white/40 bg-black">
                {t('login.or')}
              </span>
            </div>
          </div>

          {/* Google Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-xl
                     hover:bg-white/[0.07] hover:border-white/20 transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-white font-medium">
              {t('login.signInWithGoogle')}
            </span>
          </motion.button>

          {/* Footer */}
          <p className="text-center text-white/50 mt-8 text-sm">
            {t('login.noAccount')}{' '}
            <Link href="/signup" className="text-white font-semibold hover:underline underline-offset-4">
              {t('login.signUpLink')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
