'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';

export default function OnboardingPage() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'runner' | 'coach' | null>(null);

  // Form fields
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [goals, setGoals] = useState('');
  const [bio, setBio] = useState('');

  // Coach-specific fields
  const [certifications, setCertifications] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, phone')
      .eq('id', user.id)
      .single();

    if (profile) {
      setUserRole(profile.role as 'runner' | 'coach');

      // If profile already has phone, redirect to dashboard
      if (profile.phone) {
        router.push('/dashboard');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          phone,
          experience_level: userRole === 'runner' ? experienceLevel : null,
          goals: userRole === 'runner' ? goals : null,
          bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // If coach, create coach profile
      if (userRole === 'coach') {
        const certificationsArray = certifications
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean);
        const specialtiesArray = specialties
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

        const { error: coachError } = await supabase
          .from('coach_profiles')
          .insert({
            user_id: user.id,
            certifications: certificationsArray,
            specialties: specialtiesArray,
            years_experience: parseInt(yearsExperience) || 0,
          });

        if (coachError && coachError.code !== '23505') {
          // Ignore duplicate key error
          throw coachError;
        }
      }

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('onboarding.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('onboarding.title')}
          </h1>
          <p className="text-gray-600">{t('onboarding.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('onboarding.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('onboarding.phonePlaceholder')}
            />
          </div>

          {userRole === 'runner' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('onboarding.experienceLevel')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <label
                      key={level}
                      className="flex items-center justify-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={level}
                        checked={experienceLevel === level}
                        onChange={(e) => setExperienceLevel(e.target.value as any)}
                        className="sr-only"
                      />
                      <span className={experienceLevel === level ? 'font-semibold text-blue-600' : ''}>
                        {t(`onboarding.${level}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('onboarding.goals')}
                </label>
                <textarea
                  id="goals"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('onboarding.goalsPlaceholder')}
                />
              </div>
            </>
          )}

          {userRole === 'coach' && (
            <>
              <div>
                <label
                  htmlFor="certifications"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('onboarding.certifications')}
                </label>
                <input
                  id="certifications"
                  type="text"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('onboarding.certificationsPlaceholder')}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t('onboarding.certificationsHint')}
                </p>
              </div>

              <div>
                <label
                  htmlFor="specialties"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('onboarding.specialties')}
                </label>
                <input
                  id="specialties"
                  type="text"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('onboarding.specialtiesPlaceholder')}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t('onboarding.specialtiesHint')}
                </p>
              </div>

              <div>
                <label
                  htmlFor="yearsExperience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('onboarding.yearsExperience')}
                </label>
                <input
                  id="yearsExperience"
                  type="number"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('onboarding.bio')}
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('onboarding.bioPlaceholder')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('onboarding.completing') : t('onboarding.complete')}
          </button>
        </form>
      </div>
    </div>
  );
}
