import { IconSword } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'

const WeaponsPage = () => {
  return (
    <PanelSection>
      <Header title='Armas' startContent={<IconSword size={40} />} />

      <div>
        <h1>Weapons Page</h1>
        <p>
          This is the weapons page of the panel. You can navigate to different
          sections of the panel using the sidebar.
        </p>
      </div>
    </PanelSection>
  )
}

export default WeaponsPage
