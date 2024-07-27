import { BestTeamsType } from '@/render/src/types'
import { fetchTeamsByName } from '@/render/src/teams/utilities/services/fetch'
import RootContainer from '@/render/src/shared/components/containers/root-container'
import Teams from '@/render/src/teams/teams'

interface TeamPageProps {
  searchParams: {
    name: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Equipos',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}

const TeamPage = async ({ searchParams }: TeamPageProps) => {
  const characterName = searchParams?.name

  const teams = (await fetchTeamsByName(characterName)) as BestTeamsType[]

  return (
    <RootContainer>
      <Teams teams={teams} />
    </RootContainer>
  )
}

export default TeamPage
