import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export async function middleware(request: NextRequest) {
  // First, handle Supabase auth session refresh
  const supabaseResponse = await updateSession(request);

  // If Supabase middleware returned a redirect, use it
  if (supabaseResponse.status === 307 || supabaseResponse.status === 308) {
    return supabaseResponse;
  }

  // Then, handle internationalization
  const intlResponse = intlMiddleware(request);

  // Merge Supabase cookies into intl response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  // Match all paths except static files and api routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
