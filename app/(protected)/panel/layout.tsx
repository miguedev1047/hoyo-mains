import Sidebar from '@/render/components/navigation/panel/siderbar'

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full flex gap-2'>
      <Sidebar />
      {children}
    </main>
  )
}

export default PanelLayout
