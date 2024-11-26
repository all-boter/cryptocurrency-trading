import { NavWrapper } from '@/components/nav'
import { locales } from '@/config/i18n'
import '../globals.css'  // Import Tailwind CSS

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export default function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="w-full h-full">
        <main className="w-full h-full">
          <NavWrapper />
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
} 