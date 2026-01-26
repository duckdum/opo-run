'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-black flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[480px]">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-16">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">Back</span>
          </Link>

          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-white">OPO</span>
              <span className="text-4xl font-black text-white/20">.</span>
              <span className="text-4xl font-light text-white">RUN</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              {t('login.title')}
            </h1>
            <p className="text-lg text-white/50">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-4 bg-white/[0.05] border border-white/10 rounded-xl text-white text-base
                         placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08]
                         transition-all"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white/70">
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-4 bg-white/[0.05] border border-white/10 rounded-xl text-white text-base
                         placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08]
                         transition-all"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black rounded-xl font-semibold text-base
                       hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-white/10"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-white/40 bg-black">or</span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/[0.05] border border-white/10 rounded-xl
                     hover:bg-white/[0.08] hover:border-white/20 transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-white font-medium">Continue with Google</span>
          </button>

          {/* Footer */}
          <p className="text-center text-white/50 mt-10 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-white font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden items-center justify-center">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [50, -50, 50],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Running track animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-3/4 h-3/4" viewBox="0 0 400 400" fill="none">
            {/* Track path */}
            <motion.path
              d="M 50 200 Q 50 100 150 100 T 350 100 Q 350 100 350 200 T 350 300 Q 350 300 250 300 T 50 300 Q 50 300 50 200"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 5"
            />

            {/* Animated runner dot */}
            <motion.circle
              r="6"
              fill="#3b82f6"
              filter="url(#glow)"
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M 50 200 Q 50 100 150 100 T 350 100 Q 350 100 350 200 T 350 300 Q 350 300 250 300 T 50 300 Q 50 300 50 200"
              />
            </motion.circle>

            {/* Glow filter */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Milestone markers */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={50 + i * 100}
                cy={200 - (i % 2) * 100}
                r="3"
                fill="rgba(255,255,255,0.2)"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              />
            ))}
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Train with the best in Porto
            </h2>
            <p className="text-xl text-white/60 leading-relaxed">
              Join elite runners and professional coaches to reach your peak performance.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {[
              { number: '500+', label: 'Athletes' },
              { number: '20+', label: 'Coaches' },
              { number: '10k+', label: 'Runs' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
