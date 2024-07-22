import Navigation from '@/render/src/shared/components/navigation'
import Teams from '@/render/src/teams/teams'
import { fetchTeamsByName } from '@/render/src/teams/utilities/services/fetch'
import { BestTeamsType } from '@/render/src/types'

interface TeamPageProps {
  searchParams: {
    name: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Eequipos',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}

const TeamPage = async ({ searchParams }: TeamPageProps) => {
  const characterName = searchParams?.name

  const teams = (await fetchTeamsByName(characterName)) as BestTeamsType[]

  return (
    <>
      <Navigation />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Teams teams={teams} />
      </main>
    </>
  )
}

export default TeamPage
