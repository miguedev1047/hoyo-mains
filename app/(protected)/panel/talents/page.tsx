import { IconBooks } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'

const TalentsPage = () => {
  return (
    <PanelSection>
      <Header title='Talentos' startContent={<IconBooks size={40} />} />

      <div>
        <h1>Talents Page</h1>

        <p>
          This is the talents page. Here you can see all the talents available
          to your character.
        </p>
      </div>
    </PanelSection>
  )
}

export default TalentsPage
