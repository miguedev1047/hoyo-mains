import Sidebar from '@/components/panel/home/navigation/siderbar'

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full flex gap-2'>
      <Sidebar />
      {children}
    </main>
  )
}

export default PanelLayout
