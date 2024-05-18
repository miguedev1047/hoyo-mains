import MaterialsSection from '@/render/sections/materials/materials-section'
import { Suspense } from 'react'
import { IconSquareRotated } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import MaterialModal from '@/render/components/UI/modal/material-modal'

const MaterialPage = () => {
  return (
    <Suspense>
      <PanelWrapper>
        <Header
          title='Materiales'
          startContent={<IconSquareRotated size={40} />}
        />

        <MaterialsSection />

        <MaterialModal />
      </PanelWrapper>
    </Suspense>
  )
}

export default MaterialPage
