'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales } from '@/config/i18n'
import { useCallback } from 'react'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = useCallback((newLocale: string) => {
    // Get current path and replace language part
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    
    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    
    router.push(newPath)
    router.refresh()
  }, [pathname, router])

  // Get current language
  const currentLocale = pathname.split('/')[1]

  return (
    <div>
      <select 
        onChange={(e) => handleChange(e.target.value)}
        value={currentLocale}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === 'en' ? 'English' : '中文'}
          </option>
        ))}
      </select>
    </div>
  )
} 