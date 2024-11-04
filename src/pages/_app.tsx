import RedirectGuard from '@/guard/RedirectGuard'
import { Providers } from '@/providers/providers'
import type { AppProps } from 'next/app'
import './globals.css'
import NextProgress from 'next-progress'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/router'
import Script from 'next/script'
import messageen from '@/lang/en.json'
import messagevi from '@/lang/vi.json'
import { Roboto } from 'next/font/google'

const inter = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM fully loaded and parsed')
    })
    document.getElementById('__NEXT_DATA__')?.textContent
  }

  return (
    <Providers>
      <RedirectGuard>
        <NextProgress />
        <NextIntlClientProvider locale={router.locale} timeZone="Europe/Vienna" messages={router.locale === 'en' ? messageen : messagevi}>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
          <Script async src={`https://cse.google.com/cse.js?cx=c49bdc9e3c3b648cb`} />
        </NextIntlClientProvider>
      </RedirectGuard>
    </Providers>
  )
}
