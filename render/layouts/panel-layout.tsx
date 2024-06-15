import Sidebar from '@/render/components/navigation/panel/siderbar'

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex'>
      <Sidebar />
      {children}
    </main>
  )
}

export default PanelLayout
