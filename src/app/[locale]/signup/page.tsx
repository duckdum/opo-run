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
  const [role, setRole] = useState<'runner' | 'coach'>('runner');
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
          role,
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute inset-0">
          <div
            className="w-full h-full opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -4 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </motion.svg>
            <span className="text-sm font-medium">Back to home</span>
          </Link>

          {/* Logo & Title */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1 mb-6"
            >
              <span className="text-3xl font-black text-white">OPO</span>
              <span className="text-3xl font-black text-white/30">.</span>
              <span className="text-3xl font-light text-white">RUN</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2"
            >
              {t('signup.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-sm"
            >
              {t('signup.subtitle')}
            </motion.p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4 mb-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-medium text-white/80 mb-2">{t('signup.fullName')}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={t('signup.fullNamePlaceholder')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30
                         focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all hover:border-white/20"
                style={{ WebkitBoxShadow: '0 0 0 1000px transparent inset', WebkitTextFillColor: 'white' }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className="block text-sm font-medium text-white/80 mb-2">{t('signup.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('signup.emailPlaceholder')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30
                         focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all hover:border-white/20"
                style={{ WebkitBoxShadow: '0 0 0 1000px transparent inset', WebkitTextFillColor: 'white' }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label className="block text-sm font-medium text-white/80 mb-2">{t('signup.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder={t('signup.passwordPlaceholder')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30
                         focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all hover:border-white/20"
                style={{ WebkitBoxShadow: '0 0 0 1000px transparent inset', WebkitTextFillColor: 'white' }}
              />
              <p className="text-xs text-white/40 mt-1.5">{t('signup.passwordRequirement')}</p>
            </motion.div>

            {/* Role */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <label className="block text-sm font-medium text-white/80 mb-3">{t('signup.role')}</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'runner', emoji: '🏃', label: t('signup.runnerRole'), desc: t('signup.runnerDescription') },
                  { value: 'coach', emoji: '👨‍🏫', label: t('signup.coachRole'), desc: t('signup.coachDescription') }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRole(item.value as 'runner' | 'coach')}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      role === item.value ? 'border-white/30 bg-white/10' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="font-semibold text-white text-sm mb-0.5">{item.label}</div>
                    <div className="text-xs text-white/40 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Terms */}
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-white checked:border-white cursor-pointer"
              />
              <span className="text-xs text-white/60 leading-relaxed">{t('signup.terms')}</span>
            </motion.label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !acceptedTerms}
              whileHover={{ scale: !loading && acceptedTerms ? 1.02 : 1 }}
              whileTap={{ scale: !loading && acceptedTerms ? 0.98 : 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full py-4 mt-2 bg-gradient-to-r from-white to-white/90 text-black rounded-xl font-semibold
                       hover:from-white/90 hover:to-white/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed
                       shadow-lg shadow-white/20"
            >
              {loading ? t('signup.creatingAccount') : t('signup.createAccount')}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-xs text-white/40">{t('signup.or')}</span>
            </div>
          </div>

          {/* Google */}
          <motion.button
            onClick={handleGoogleSignup}
            disabled={loading || !acceptedTerms}
            whileHover={{ scale: !loading && acceptedTerms ? 1.02 : 1 }}
            whileTap={{ scale: !loading && acceptedTerms ? 0.98 : 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/5 border border-white/10 rounded-xl
                     hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-white font-medium text-sm">{t('signup.signUpWithGoogle')}</span>
          </motion.button>

          {/* Footer */}
          <p className="text-center text-white/50 mt-8 text-sm">
            {t('signup.hasAccount')}{' '}
            <Link href="/login" className="text-white font-semibold hover:underline underline-offset-2">
              {t('signup.signInLink')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
