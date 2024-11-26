export const defaultLocale = 'en'
export const locales = ['en', 'zh'] as const
export type ValidLocale = typeof locales[number]

// Get dictionary
export async function getDictionary(locale: ValidLocale) {
  return (await import(`../../public/locales/${locale}.json`)).default
} 