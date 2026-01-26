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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      {/* Back button */}
      <Link href="/" className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50">
        <motion.div
          className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          whileHover={{ x: -4 }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">Back</span>
        </motion.div>
      </Link>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
              {t('signup.title')}
            </h1>
            <p className="text-white/40 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-light">
              {t('signup.subtitle')}
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSignup} className="space-y-6 sm:space-y-7 lg:space-y-8">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 font-medium mb-3 sm:mb-4">
                {t('signup.fullName')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
                className="w-full px-1 sm:px-0 py-3 sm:py-4 bg-transparent border-0 border-b border-white/10 text-white text-lg sm:text-xl lg:text-2xl
                         placeholder:text-white/20 font-light
                         focus:outline-none focus:border-white/30
                         transition-colors duration-300"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
                placeholder={t('signup.fullNamePlaceholder')}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 font-medium mb-3 sm:mb-4">
                {t('signup.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-1 sm:px-0 py-3 sm:py-4 bg-transparent border-0 border-b border-white/10 text-white text-lg sm:text-xl lg:text-2xl
                         placeholder:text-white/20 font-light
                         focus:outline-none focus:border-white/30
                         transition-colors duration-300"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
                placeholder={t('signup.emailPlaceholder')}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 font-medium mb-3 sm:mb-4">
                {t('signup.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full px-1 sm:px-0 py-3 sm:py-4 bg-transparent border-0 border-b border-white/10 text-white text-lg sm:text-xl lg:text-2xl
                         placeholder:text-white/20 font-light
                         focus:outline-none focus:border-white/30
                         transition-colors duration-300"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
                placeholder={t('signup.passwordPlaceholder')}
              />
              <p className="text-xs text-white/30 mt-3 tracking-wide">{t('signup.passwordRequirement')}</p>
            </div>

            {/* Role selection */}
            <div className="pt-4">
              <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-6">
                {t('signup.role')}
              </label>
              <div className="space-y-4">
                {/* Runner */}
                <motion.label
                  whileHover={{ scale: 1.005 }}
                  className={`flex items-center px-6 py-5 border-2 rounded-2xl cursor-pointer transition-all ${
                    role === 'runner'
                      ? 'border-white/30 bg-white/[0.03]'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="runner"
                    checked={role === 'runner'}
                    onChange={(e) => setRole(e.target.value as 'runner')}
                    className="w-5 h-5 mr-5 accent-white"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg mb-1">
                      {t('signup.runnerRole')}
                    </div>
                    <div className="text-sm text-white/40">{t('signup.runnerDescription')}</div>
                  </div>
                </motion.label>

                {/* Coach */}
                <motion.label
                  whileHover={{ scale: 1.005 }}
                  className={`flex items-center px-6 py-5 border-2 rounded-2xl cursor-pointer transition-all ${
                    role === 'coach'
                      ? 'border-white/30 bg-white/[0.03]'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="coach"
                    checked={role === 'coach'}
                    onChange={(e) => setRole(e.target.value as 'coach')}
                    className="w-5 h-5 mr-5 accent-white"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg mb-1">
                      {t('signup.coachRole')}
                    </div>
                    <div className="text-sm text-white/40">{t('signup.coachDescription')}</div>
                  </div>
                </motion.label>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 accent-white"
              />
              <label htmlFor="terms" className="text-sm text-white/50 leading-relaxed">
                {t('signup.terms')}
              </label>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading || !acceptedTerms}
              whileHover={{ scale: !loading && acceptedTerms ? 1.01 : 1 }}
              whileTap={{ scale: !loading && acceptedTerms ? 0.99 : 1 }}
              className="w-full py-5 bg-white rounded-full text-black font-bold text-base uppercase tracking-[0.2em]
                       hover:bg-white/90 transition-all duration-200
                       disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? t('signup.creatingAccount') : t('signup.createAccount')}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 text-xs uppercase tracking-[0.3em] bg-zinc-950 text-white/30 font-medium">
                {t('signup.or')}
              </span>
            </div>
          </div>

          {/* Google button */}
          <motion.button
            onClick={handleGoogleSignup}
            disabled={loading || !acceptedTerms}
            whileHover={{ scale: !loading && acceptedTerms ? 1.01 : 1 }}
            whileTap={{ scale: !loading && acceptedTerms ? 0.99 : 1 }}
            className="w-full flex items-center justify-center gap-4 py-5 px-8
                     bg-transparent border border-white/10 rounded-full
                     hover:border-white/20 hover:bg-white/[0.02]
                     transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-base font-bold text-white uppercase tracking-[0.2em]">
              {t('signup.signUpWithGoogle')}
            </span>
          </motion.button>

          {/* Footer */}
          <p className="text-center text-sm text-white/40 mt-12">
            {t('signup.hasAccount')}{' '}
            <Link href="/login" className="text-white font-bold hover:underline underline-offset-4 transition-all">
              {t('signup.signInLink')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
