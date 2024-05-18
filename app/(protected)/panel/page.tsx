import { Suspense } from 'react'
import { IconHome } from '@tabler/icons-react'
import { Divider } from '@nextui-org/divider'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import HomeSection from '@/render/sections/panel/home-section'

const PanelHome = () => {
  return (
    <PanelWrapper>
      <Header title='Inicio' startContent={<IconHome size={40} />} />

      <Divider />

      <Suspense>
        <HomeSection />
      </Suspense>
    </PanelWrapper>
  )
}

export default PanelHome
