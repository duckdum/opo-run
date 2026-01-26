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
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[45%] flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16">
          <div className="w-full max-w-[440px]">
            {/* Back */}
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group">
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: -3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </motion.svg>
              <span className="text-sm font-medium">Back</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.75rem] font-black text-white tracking-tight leading-none">OPO</span>
                  <span className="text-[2.75rem] font-black text-white/15 leading-none">.</span>
                  <span className="text-[2.75rem] font-light text-white tracking-tight leading-none">RUN</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-[2.5rem] font-bold text-white mb-2 tracking-tight leading-none">
                  {t('login.title')}
                </h1>
                <p className="text-[1.0625rem] text-white/45 leading-relaxed">
                  {t('login.subtitle')}
                </p>
              </motion.div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleEmailLogin}
              className="space-y-6"
            >
              <div>
                <label className="block text-[0.8125rem] font-medium text-white/60 mb-2.5 tracking-wide">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full h-12 px-5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[0.9375rem]
                           placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                           transition-all duration-200"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[0.8125rem] font-medium text-white/60 tracking-wide">
                    PASSWORD
                  </label>
                  <Link
                    href="/reset-password"
                    className="text-[0.8125rem] text-white/40 hover:text-white/70 transition-colors font-medium"
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
                  className="w-full h-12 px-5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[0.9375rem]
                           placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
                           transition-all duration-200"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className="w-full h-12 mt-8 bg-white text-black rounded-xl font-semibold text-[0.9375rem]
                         hover:bg-white/95 active:bg-white/90 transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-[0.8125rem] text-white/30 bg-black font-medium tracking-wider">OR</span>
              </div>
            </div>

            {/* Google */}
            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full h-12 flex items-center justify-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl
                       hover:bg-white/[0.05] hover:border-white/[0.12] active:bg-white/[0.04] transition-all duration-200
                       disabled:opacity-40"
            >
              <svg className="w-[1.125rem] h-[1.125rem]" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-white font-medium text-[0.9375rem]">Continue with Google</span>
            </motion.button>

            {/* Footer */}
            <p className="text-center text-white/40 mt-12 text-[0.9375rem]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-white font-semibold hover:text-white/80 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Experience */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-gradient-to-br from-zinc-950 via-black to-zinc-950 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-16 py-20">
          {/* GPS Route Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
          >
            <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
              {/* GPS Route Path - Drawing animation */}
              <motion.path
                d="M 50 150 Q 100 80, 150 120 T 250 100 Q 300 80, 350 130 T 450 150"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 3, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
              />

              {/* Route points (waypoints) */}
              {[
                { cx: 50, cy: 150, delay: 0 },
                { cx: 150, cy: 120, delay: 0.8 },
                { cx: 250, cy: 100, delay: 1.6 },
                { cx: 350, cy: 130, delay: 2.4 },
                { cx: 450, cy: 150, delay: 3 }
              ].map((point, i) => (
                <motion.g key={i}>
                  <motion.circle
                    cx={point.cx}
                    cy={point.cy}
                    r="4"
                    fill="white"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.9 }}
                    transition={{ delay: point.delay, duration: 0.3 }}
                  />
                  <motion.circle
                    cx={point.cx}
                    cy={point.cy}
                    r="8"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ delay: point.delay + 0.1, duration: 0.4 }}
                  />
                </motion.g>
              ))}

              {/* Moving runner dots along the path */}
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <motion.circle
                    r="5"
                    fill="#3b82f6"
                    filter="url(#dotGlow)"
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: "100%",
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      offsetDistance: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2
                      },
                      opacity: {
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.1, 0.9, 1],
                        delay: i * 2
                      }
                    }}
                    style={{
                      offsetPath: "path('M 50 150 Q 100 80, 150 120 T 250 100 Q 300 80, 350 130 T 450 150')"
                    }}
                  />
                  {/* Trail effect */}
                  <motion.circle
                    r="3"
                    fill="#3b82f6"
                    opacity="0.4"
                    initial={{ offsetDistance: "0%" }}
                    animate={{
                      offsetDistance: "100%",
                      opacity: [0, 0.4, 0.4, 0]
                    }}
                    transition={{
                      offsetDistance: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2 + 0.15
                      },
                      opacity: {
                        duration: 6,
                        repeat: Infinity,
                        times: [0, 0.1, 0.9, 1],
                        delay: i * 2 + 0.15
                      }
                    }}
                    style={{
                      offsetPath: "path('M 50 150 Q 100 80, 150 120 T 250 100 Q 300 80, 350 130 T 450 150')"
                    }}
                  />
                </g>
              ))}

              {/* Distance markers */}
              <motion.text
                x="50"
                y="175"
                fill="white"
                opacity="0.4"
                fontSize="11"
                fontWeight="500"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.2 }}
              >
                START
              </motion.text>
              <motion.text
                x="250"
                y="85"
                fill="white"
                opacity="0.4"
                fontSize="11"
                fontWeight="500"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.8 }}
              >
                5.3 KM
              </motion.text>
              <motion.text
                x="450"
                y="175"
                fill="white"
                opacity="0.4"
                fontSize="11"
                fontWeight="500"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 3.2 }}
              >
                10K
              </motion.text>

              {/* Gradients and filters */}
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                  <stop offset="50%" stopColor="rgba(99, 102, 241, 0.6)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" />
                </linearGradient>
                <filter id="dotGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
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
            className="text-center max-w-lg mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Train with the best runners in Porto
            </h2>
            <p className="text-xl text-white/50 leading-relaxed">
              Join elite athletes and world-class coaches to unlock your true potential.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-12 w-full max-w-2xl"
          >
            {[
              { value: '500+', label: 'Active Athletes', color: 'from-blue-500 to-cyan-500' },
              { value: '20+', label: 'Expert Coaches', color: 'from-purple-500 to-pink-500' },
              { value: '10k+', label: 'Training Sessions', color: 'from-orange-500 to-red-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 font-medium tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
