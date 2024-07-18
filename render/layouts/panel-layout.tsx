import Sidebar from '@/render/src/panel/shared/components/sidebar'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full flex'>
      <Sidebar />
      {children}
    </main>
  )
}

export default PanelLayout
