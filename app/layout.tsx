import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site'
import { fontDM_Sans } from '@/config/fonts'
import { Toaster } from 'sonner'
import { Providers } from './providers'
import clsx from 'clsx'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'app-theme min-h-screen bg-background font-sans antialiased',
          fontDM_Sans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Toaster position='bottom-right' richColors />
          <div className='relative flex flex-col h-screen'>
            <main className='container mx-auto max-w-7xl p-8 flex-grow'>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
