import { IconTrophy } from '@tabler/icons-react'
import { fetchTierlists } from '@/render/src/panel/tierlist/utilities/services/fetch'
import { TierlistType } from '@/render/src/types'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'
import TierlistMenubar from '@/render/src/panel/tierlist/components/tierlist-menubar'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import Tierlist from '@/render/src/panel/tierlist/tierlist'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Tierlist',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const TierlistPage = async () => {
  const tierlists = (await fetchTierlists()) as TierlistType[]

  return (
    <PanelContainer>
      <PanelHeader title='Tierlist' startContent={<IconTrophy size={32} />} />

      <TierlistMenubar />

      <Tierlist tierlists={tierlists} />
    </PanelContainer>
  )
}

export default TierlistPage
