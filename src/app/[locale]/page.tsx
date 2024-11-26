import { getDictionary } from '@/config/i18n'

export const runtime = 'edge'

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale as any)
  
  return (
    <div className="w-full h-full pt-[50px]">
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