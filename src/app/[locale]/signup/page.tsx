'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User2, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8">
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to home</span>
          </motion.div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {t('signup.title')}
            </h1>
            <p className="text-white/50 text-base">
              {t('signup.subtitle')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSignup} className="space-y-5 mb-8">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {t('signup.fullName')}
              </label>
              <div className="relative">
                <User2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder={t('signup.fullNamePlaceholder')}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30
                           focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {t('signup.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder={t('signup.emailPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30
                           focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                {t('signup.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder={t('signup.passwordPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30
                           focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    WebkitTextFillColor: 'white'
                  }}
                />
              </div>
              <p className="text-xs text-white/40 mt-2">{t('signup.passwordRequirement')}</p>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">
                {t('signup.role')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setRole('runner')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    role === 'runner'
                      ? 'border-white/30 bg-white/5'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏃</div>
                    <div className="font-semibold text-white text-sm mb-1">
                      {t('signup.runnerRole')}
                    </div>
                    <div className="text-xs text-white/40 leading-tight">
                      {t('signup.runnerDescription')}
                    </div>
                  </div>
                  {role === 'runner' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                    </div>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setRole('coach')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    role === 'coach'
                      ? 'border-white/30 bg-white/5'
                      : 'border-white/10 bg-transparent hover:border-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">👨‍🏫</div>
                    <div className="font-semibold text-white text-sm mb-1">
                      {t('signup.coachRole')}
                    </div>
                    <div className="text-xs text-white/40 leading-tight">
                      {t('signup.coachDescription')}
                    </div>
                  </div>
                  {role === 'coach' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                    </div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 appearance-none border-2 border-white/20 rounded bg-transparent checked:bg-white checked:border-white transition-all cursor-pointer"
                  />
                  {acceptedTerms && (
                    <Check className="w-3 h-3 text-black absolute pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-snug">
                  {t('signup.terms')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !acceptedTerms}
              whileHover={{ scale: !loading && acceptedTerms ? 1.02 : 1 }}
              whileTap={{ scale: !loading && acceptedTerms ? 0.98 : 1 }}
              className="w-full py-4 bg-white text-black rounded-2xl font-semibold text-base
                       hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-white/10"
            >
              {loading ? t('signup.creatingAccount') : t('signup.createAccount')}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-white/40 bg-black">
                {t('signup.or')}
              </span>
            </div>
          </div>

          {/* Google Button */}
          <motion.button
            onClick={handleGoogleSignup}
            disabled={loading || !acceptedTerms}
            whileHover={{ scale: !loading && acceptedTerms ? 1.02 : 1 }}
            whileTap={{ scale: !loading && acceptedTerms ? 0.98 : 1 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl
                     hover:bg-white/[0.07] hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-white font-medium">
              {t('signup.signUpWithGoogle')}
            </span>
          </motion.button>

          {/* Footer */}
          <p className="text-center text-white/50 mt-8">
            {t('signup.hasAccount')}{' '}
            <Link href="/login" className="text-white font-semibold hover:underline underline-offset-4">
              {t('signup.signInLink')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
