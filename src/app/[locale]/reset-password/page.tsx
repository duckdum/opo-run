'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?redirectTo=/update-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      {/* Back button */}
      <Link href="/login" className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50">
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
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
              {t('resetPassword.title') || 'Reset Password'}
            </h1>
            <p className="text-white/40 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-light">
              {t('resetPassword.subtitle') || 'Enter your email to receive a reset link'}
            </p>
          </div>

          {/* Success message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
            >
              <p className="text-green-400 text-sm text-center">
                {t('resetPassword.success') || 'Check your email for the password reset link!'}
              </p>
            </motion.div>
          )}

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
          <form onSubmit={handleResetPassword} className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Email */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 font-medium mb-3 sm:mb-4">
                {t('resetPassword.email') || 'Email'}
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
                         transition-colors duration-300
                         autofill:bg-transparent autofill:text-white"
                style={{
                  WebkitBoxShadow: '0 0 0 1000px transparent inset',
                  WebkitTextFillColor: 'white'
                }}
                placeholder={t('resetPassword.emailPlaceholder') || 'you@example.com'}
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full py-4 sm:py-5 bg-white rounded-full text-black font-bold text-sm sm:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em]
                       hover:bg-white/90 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (t('resetPassword.sending') || 'Sending...') : (t('resetPassword.sendLink') || 'Send Reset Link')}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-white/40 mt-8 sm:mt-10 lg:mt-12">
            {t('resetPassword.remember') || 'Remember your password?'}{' '}
            <Link href="/login" className="text-white font-bold hover:underline underline-offset-4 transition-all">
              {t('resetPassword.signIn') || 'Sign in'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
