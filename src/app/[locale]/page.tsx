import { HomeBtns } from '@/components/views/homeBtns'
import { getDictionary } from '@/config/i18n'

export const runtime = 'edge'

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getDictionary(locale as any)

  return (
    <div className="w-full h-full pt-[50px]">
      <div>
        <div className="flex flex-col items-center min-h-[70vh]">
          <div className="mt-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 font-extrabold text-[48px] sm:text-[100px]">
            {t.slogan1}
          </div>

          <div className="mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-extrabold text-[48px] sm:text-[100px]">
            {t.slogan2}
          </div>

          <div className="mx-4 md:mx-0 md:w-4/5 text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-500 text-[24px] md:text-[60px] lg:text-[48px]">
            {t.slogan3}
          </div>

          <div className="flex mt-16">
            <HomeBtns />
          </div>
        </div>
      </div>
    </div>
  )
} 