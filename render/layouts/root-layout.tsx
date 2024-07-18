import '@/styles/globals.css'
import { fontDM_Sans } from '@/config/fonts'
import { Toaster } from 'sonner'
import { Providers } from '@/app/providers'
import clsx from 'clsx'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel',
    description: 'Panel de administración de HoYo Mains.'
  }
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
          'app-theme bg-background font-sans antialiased relative flex flex-col h-full p-2',
          fontDM_Sans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Toaster position='top-right' richColors />
          <div className='absolute top-0 left-0 h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
          {children}
        </Providers>
      </body>
    </html>
  )
}
