import {
  fetchCharacters,
  fetchTeamByName
} from '@/render/src/panel/teams/utilities/services/fetch'
import { IconUsersGroup } from '@tabler/icons-react'
import { BestTeamsType, CharacterType, SearchTypes } from '@/render/src/types'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'
import TeamMenubar from '@/render/src/panel/teams/components/team-menubar'
import Teams from '@/render/src/panel/teams/teams'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Equipos',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const BestTeamPage = async ({ searchParams }: SearchTypes) => {
  const characterName = searchParams.character?.toLowerCase()

  const characters = (await fetchCharacters()) as CharacterType[]
  const teams = (await fetchTeamByName(characterName)) as BestTeamsType[]

  return (
    <PanelContainer>
      <PanelHeader
        title='Equipos'
        startContent={<IconUsersGroup size={32} />}
      />

      <TeamMenubar />

      <Teams teams={teams} characters={characters} />
    </PanelContainer>
  )
}

export default BestTeamPage
