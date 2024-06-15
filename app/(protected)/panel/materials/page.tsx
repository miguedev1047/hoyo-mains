import { SectionFallback } from '@/render/components/UI/fallbacks'
import { Suspense } from 'react'
import { IconSquareRotated } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import MaterialModal from '@/render/components/UI/modal/material-modal'
import MaterialsSection from '@/render/sections/materials/materials-section'

const MaterialPage = () => {
  return (
    <Suspense fallback={<SectionFallback />}>
      <PanelWrapper>
        <Header
          title='Materiales'
          startContent={<IconSquareRotated size={32} />}
        />

        <MaterialsSection />

        <MaterialModal />
      </PanelWrapper>
    </Suspense>
  )
}

export default MaterialPage
