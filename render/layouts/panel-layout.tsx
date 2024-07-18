import Sidebar from "../src/panel/shared/components/sidebar"

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full flex'>
      <Sidebar />
      {children}
    </main>
  )
}

export default PanelLayout
