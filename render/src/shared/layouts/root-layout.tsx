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
          <div className='fixed top-0 left-0 h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>

          <div className='fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'></div>
          {children}
        </Providers>
      </body>
    </html>
  )
}
