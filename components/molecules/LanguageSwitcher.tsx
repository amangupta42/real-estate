'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { locales, localeNamesNative, type Locale } from '@/i18n/config'
import { Button } from '@/components/ui/button'
import { trackLanguageChange } from '@/lib/analytics'

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
}

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false)
      return
    }

    // Track language change
    trackLanguageChange(newLocale)

    // Get the current path without the locale prefix
    const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, '')

    // Build new path
    let newPath = '/'
    if (newLocale !== 'en') {
      newPath = `/${newLocale}`
    }

    if (pathnameWithoutLocale && pathnameWithoutLocale !== '/') {
      newPath += pathnameWithoutLocale
    }

    // Navigate to new locale
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeNamesNative[currentLocale].nativeName}</span>
        <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-2">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLanguageChange(locale)}
                  className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-100 transition-colors ${
                    locale === currentLocale ? 'bg-gray-50' : ''
                  }`}
                >
                  <div>
                    <div className="font-medium">{localeNamesNative[locale].nativeName}</div>
                    <div className="text-xs text-muted-foreground">
                      {localeNamesNative[locale].name}
                    </div>
                  </div>
                  {locale === currentLocale && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
