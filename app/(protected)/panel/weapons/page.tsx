import { Suspense } from 'react'
import { IconSword } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import WeaponsSection from '@/render/sections/weapons/weapon-section'
import WeaponModal from '@/render/components/UI/modal/weapon-modal'
import PanelWrapper from '@/render/components/UI/panel-wrapper'

const WeaponsPage = () => {
  return (
    <Suspense>
      <PanelWrapper>
        <Header title='Armas' startContent={<IconSword size={40} />} />

        <WeaponsSection />

        <WeaponModal />
      </PanelWrapper>
    </Suspense>
  )
}

export default WeaponsPage
