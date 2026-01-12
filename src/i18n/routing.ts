import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Export navigation utilities that are locale-aware
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
