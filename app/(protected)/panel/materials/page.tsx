import MaterialsSection from '@/render/sections/materials/materials-section'
import { Suspense } from 'react'
import { IconSquareRotated } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'
import MaterialModal from '@/render/components/panel/modal/material-modal'

const MaterialPage = () => {
  return (
    <Suspense>
      <PanelSection>
        <Header
          title='Materiales'
          startContent={<IconSquareRotated size={40} />}
        />

        <MaterialsSection />

        <MaterialModal />
      </PanelSection>
    </Suspense>
  )
}

export default MaterialPage
