'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="text-xs uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors font-medium relative group"
        >
          Dashboard
          <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </Link>
        <button
          onClick={handleSignOut}
          className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors font-light"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        href="/login"
        className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors font-light"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="text-xs uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors font-medium relative group"
      >
        Sign Up
        <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Link>
    </div>
  );
}
