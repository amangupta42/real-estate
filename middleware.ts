import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Don't use a prefix for the default locale
  localePrefix: 'as-needed',
})

export const config = {
  // Temporarily disabled - pages not in [locale] folder structure
  // To re-enable i18n, restructure app directory: app/[locale]/page.tsx
  matcher: ['/(hi|mr)/:path*'],
}
