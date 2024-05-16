import { IconSword } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'
import WeaponsSection from '@/render/sections/weapons/weapon-section'
import WeaponModal from '@/render/components/UI/modal/weapon-modal'

const WeaponsPage = () => {
  return (
    <PanelSection>
      <Header title='Armas' startContent={<IconSword size={40} />} />

      <WeaponsSection />

      <WeaponModal />
    </PanelSection>
  )
}

export default WeaponsPage
