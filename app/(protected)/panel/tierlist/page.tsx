import { IconTrophy } from '@tabler/icons-react'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'
import TierlistMenubar from '@/render/src/panel/tierlist/components/tierlist-menubar'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Tierlist',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const TierlistPage = () => {
  return (
    <PanelContainer>
      <PanelHeader title='Tierlist' startContent={<IconTrophy size={32} />} />

      <TierlistMenubar />
    </PanelContainer>
  )
}

export default TierlistPage
