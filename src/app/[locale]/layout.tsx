import { NavWrapper } from '@/components/nav'
import { locales } from '@/config/i18n'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/components/sidebar'
// Import Tailwind CSS
import '../globals.css'

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="w-full h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full h-full flex">
            <NavWrapper />
            <main className="children-container">
              <Sidebar isMobile={false} />
              {children}
            </main>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
} 