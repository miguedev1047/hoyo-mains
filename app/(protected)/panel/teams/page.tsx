import {
  fetchCharacters,
  fetchTeamByName
} from '@/render/services/panel/teams/general-teams/data'
import { IconUsersGroup } from '@tabler/icons-react'
import { SearchParamsTypes, TeamProps } from '@/types'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import TeamsSection from '@/render/sections/teams/teams-section'
import TeamNav from '@/render/components/panel/teams/general-teams/team-nav'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Equipos',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const TeamPage = async ({ searchParams }: SearchParamsTypes) => {
  const characterName = searchParams.character?.toLowerCase()

  const teams = (await fetchTeamByName(characterName)) as TeamProps[]
  const characters = await fetchCharacters()

  return (
    <PanelWrapper>
      <Header title='Equipos' startContent={<IconUsersGroup size={30} />} />

      <TeamNav />

      <TeamsSection teams={teams} characters={characters} />
    </PanelWrapper>
  )
}

export default TeamPage
