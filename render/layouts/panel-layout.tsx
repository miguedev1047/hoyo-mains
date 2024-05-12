import { sitePanel } from '@/config/site'
import Sidebar from '@/render/components/navigation/panel/siderbar'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: {
    default: sitePanel.name,
    template: `%s - ${sitePanel.description}`
  }
}

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full flex gap-4'>
      <Sidebar />
      {children}
    </main>
  )
}

export default PanelLayout
