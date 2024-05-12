import { IconHome } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'

const PanelHome = () => {
  return (
    <PanelSection>
      <Header title='Inicio' startContent={<IconHome size={40} />} />

      <div>
        <h1>Home Page</h1>
        <p>
          This is the home page of the panel. You can navigate to different
          sections of the panel using the sidebar.
        </p>
      </div>
    </PanelSection>
  )
}

export default PanelHome
