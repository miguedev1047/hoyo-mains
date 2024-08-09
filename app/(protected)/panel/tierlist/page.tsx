import { IconTrophy } from '@tabler/icons-react'
import {
  fetchCharacters,
  fetchTierlists,
} from '@/render/src/panel/tierlist/utilities/services/fetch'
import { CharacterType, TierlistType } from '@/render/src/types'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'
import TierlistMenubar from '@/render/src/panel/tierlist/components/tierlist-menubar'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import Tierlist from '@/render/src/panel/tierlist/tierlist'

interface TierlistPageProps {
  searchParams: {
    id: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Tierlist',
    description: 'Panel de administración de HoYo Mains.',
  }
}

const TierlistPage = async ({ searchParams }: TierlistPageProps) => {
  const tierlistId = searchParams.id

  const tierlists = (await fetchTierlists(tierlistId)) as TierlistType[]
  const characters = (await fetchCharacters()) as CharacterType[]

  return (
    <PanelContainer>
      <PanelHeader
        title='Tierlist'
        startContent={<IconTrophy size={32} />}
      />

      <TierlistMenubar />

      <Tierlist
        tierlists={tierlists}
        characters={characters}
      />
    </PanelContainer>
  )
}

export default TierlistPage
