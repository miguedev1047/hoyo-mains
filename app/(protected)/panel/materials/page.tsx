import { IconSquareRotated } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'
import MaterialModal from '@/render/components/panel/modal/material-modal'
import MaterialsSection from '@/render/sections/materials/materials-section'

const MaterialPage = () => {
  return (
    <PanelSection>
      <Header
        title='Materiales'
        startContent={<IconSquareRotated size={40} />}
      />

      <MaterialsSection />

      <MaterialModal />
    </PanelSection>
  )
}

export default MaterialPage
