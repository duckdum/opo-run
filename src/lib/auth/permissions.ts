import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';

export type UserRole = 'runner' | 'coach' | 'admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  experience_level: string | null;
  goals: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface CurrentUser {
  user: User;
  profile: UserProfile;
}

/**
 * Get the current authenticated user with their profile
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return null;
  }

  return {
    user,
    profile: profile as UserProfile,
  };
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(): Promise<CurrentUser> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('Authentication required');
  }

  return currentUser;
}

/**
 * Require specific role - throws error if user doesn't have required role
 */
export async function requireRole(
  minimumRole: UserRole
): Promise<CurrentUser> {
  const currentUser = await requireAuth();

  const roleHierarchy: Record<UserRole, number> = {
    runner: 0,
    coach: 1,
    admin: 2,
  };

  const userRoleLevel = roleHierarchy[currentUser.profile.role];
  const requiredRoleLevel = roleHierarchy[minimumRole];

  if (userRoleLevel < requiredRoleLevel) {
    throw new Error(`Insufficient permissions. ${minimumRole} role required.`);
  }

  return currentUser;
}

/**
 * Check if current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const currentUser = await getCurrentUser();
  return currentUser?.profile.role === 'admin';
}

/**
 * Check if current user is a coach or admin
 */
export async function isCoach(): Promise<boolean> {
  const currentUser = await getCurrentUser();
  return (
    currentUser?.profile.role === 'coach' ||
    currentUser?.profile.role === 'admin'
  );
}

/**
 * Check if current user can manage a specific user
 * Admins can manage anyone, coaches can manage their assigned runners, users can manage themselves
 */
export async function canManageUser(targetUserId: string): Promise<boolean> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return false;
  }

  // Users can always manage themselves
  if (currentUser.user.id === targetUserId) {
    return true;
  }

  // Admins can manage anyone
  if (currentUser.profile.role === 'admin') {
    return true;
  }

  // Coaches can manage their assigned runners
  if (currentUser.profile.role === 'coach') {
    const supabase = await createClient();
    const { data } = await supabase
      .from('coach_assignments')
      .select('id')
      .eq('coach_id', currentUser.user.id)
      .eq('runner_id', targetUserId)
      .eq('is_active', true)
      .single();

    return !!data;
  }

  return false;
}

/**
 * Get user's role
 */
export async function getUserRole(): Promise<UserRole | null> {
  const currentUser = await getCurrentUser();
  return currentUser?.profile.role || null;
}

/**
 * Check if user has completed their profile
 */
export async function hasCompletedProfile(): Promise<boolean> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return false;
  }

  const profile = currentUser.profile;

  // Basic required fields for all users
  const hasBasicInfo = !!(
    profile.full_name &&
    profile.phone
  );

  // Runners need experience level
  if (profile.role === 'runner') {
    return hasBasicInfo && !!profile.experience_level;
  }

  // Coaches need additional verification
  if (profile.role === 'coach') {
    // Check if coach profile exists
    const supabase = await createClient();
    const { data: coachProfile } = await supabase
      .from('coach_profiles')
      .select('is_verified')
      .eq('user_id', profile.id)
      .single();

    return hasBasicInfo && !!coachProfile;
  }

  return hasBasicInfo;
}
