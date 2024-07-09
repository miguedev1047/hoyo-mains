import {
  fetchCharacters,
  fetchTeamByName
} from '@/render/services/panel/teams/best-teams/data'
import { IconUsersGroup } from '@tabler/icons-react'
import { SearchParamsTypes, BestTeamType } from '@/types'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import BestTeamSection from '@/render/sections/teams/teams-section'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Equipos',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const BestTeamPage = async ({ searchParams }: SearchParamsTypes) => {
  const characterName = searchParams.character?.toLowerCase()

  const teams = (await fetchTeamByName(characterName)) as BestTeamType[]
  const characters = await fetchCharacters()

  return (
    <PanelWrapper>
      <Header title='Equipos' startContent={<IconUsersGroup size={30} />} />
      <BestTeamSection teams={teams} characters={characters} />
    </PanelWrapper>
  )
}

export default BestTeamPage
