import Sidebar from '@/render/components/navigation/panel/siderbar'

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full flex gap-4'>
      <Sidebar />
      {children}
    </div>
  )
}

export default PanelLayout
