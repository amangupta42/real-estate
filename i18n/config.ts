export const locales = ['en', 'hi', 'mr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
}

export const localeNamesNative: Record<Locale, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  mr: { name: 'Marathi', nativeName: 'मराठी' },
}
