import { IconBooks } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'

const TalentsPage = () => {
  return (
    <PanelSection>
      <Header title='Talentos' startContent={<IconBooks size={40} />} />
    </PanelSection>
  )
}

export default TalentsPage
