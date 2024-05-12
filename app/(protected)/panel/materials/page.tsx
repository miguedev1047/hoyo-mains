import { IconSquareRotated } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'

const MaterialPage = () => {
  return (
    <PanelSection>
      <Header
        title='Materiales'
        startContent={<IconSquareRotated size={40} />}
      />

      <div>
        <h1>Materials Page</h1>
        <p>
          This is the materials page of the panel. You can navigate to different
          sections of the panel using the sidebar.
        </p>
      </div>
    </PanelSection>
  )
}

export default MaterialPage
