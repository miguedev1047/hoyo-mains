import { fetchTeamByName } from '@/render/services/home/teams/data'
import { IconUsersGroup } from '@tabler/icons-react'
import { SearchParamsTypes } from '@/types'
import { Search } from '@/render/components/UI/search/search'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import TeamsSection from '@/render/sections/teams/teams-section'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Teams',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const TeamPage = async ({ searchParams }: SearchParamsTypes) => {
  const characterName = searchParams.character?.toLowerCase()

  const teams = await fetchTeamByName(characterName)

  return (
    <PanelWrapper>
      <Header title='Equipos' startContent={<IconUsersGroup size={30} />} />

      <Search
        label='Buscar personaje'
        placeholder='Buscar...'
        searchQuery='character'
        className={'w-full'}
      />

      <TeamsSection teams={teams} />
    </PanelWrapper>
  )
}

export default TeamPage
