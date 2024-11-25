import { getDictionary } from '@/config/i18n'
import LanguageSwitcher from '@/components/language-switcher'

export const runtime = 'edge'

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale as any)
  
  return (
    <div className="w-[1000px] h-[600px] flex">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold">{dict.common.welcome}</h1>
      <nav>
        <ul className="list-disc">
          <li>{dict.navigation.home}</li>
          <li>{dict.navigation.about}</li>
        </ul>
      </nav>
    </div>
  )
} 