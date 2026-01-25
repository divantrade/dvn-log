import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // Don't show /en for default locale
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - Static files
  // - Studio (Sanity)
  matcher: [
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
