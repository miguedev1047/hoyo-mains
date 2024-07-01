import { SectionFallback } from '@/render/components/UI/fallbacks'
import { Suspense } from 'react'
import { IconSword } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import WeaponsSection from '@/render/sections/weapons/weapon-section'
import WeaponModal from '@/render/components/UI/modal/weapon-modal'
import PanelWrapper from '@/render/components/UI/panel-wrapper'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Armas',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const WeaponsPage = () => {
  return (
    <Suspense fallback={<SectionFallback />}>
      <PanelWrapper>
        <Header title='Armas' startContent={<IconSword size={32} />} />

        <WeaponsSection />

        <WeaponModal />
      </PanelWrapper>
    </Suspense>
  )
}

export default WeaponsPage
