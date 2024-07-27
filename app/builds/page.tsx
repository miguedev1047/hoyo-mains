import { fetchBuilds } from '@/render/src/builds/utilities/services/fetch'
import { CharacterType } from '@/render/src/types'
import RootContainer from '@/render/src/shared/components/containers/root-container'
import Builds from '@/render/src/builds/builds'

interface BuildPageProps {
  searchParams: {
    name: string
    element: string
    stars: string
    weapon: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Builds',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}

const BuildPage = async ({ searchParams }: BuildPageProps) => {
  const { name, element, stars, weapon } = {
    name: searchParams.name?.toLowerCase(),
    element: searchParams.element?.toLowerCase(),
    stars: parseInt(searchParams?.stars!),
    weapon: searchParams.weapon?.toLowerCase()
  }

  const builds = (await fetchBuilds({
    name,
    element,
    stars,
    weapon
  })) as CharacterType[]

  return (
    <RootContainer>
      <Builds builds={builds} />
    </RootContainer>
  )
}

export default BuildPage
