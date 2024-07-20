import { fetchBuilds } from '@/render/src/builds/utilities/services/fetch'
import { CharacterType } from '@/render/src/types'
import Builds from '@/render/src/builds/builds'
import Navigation from '@/render/src/shared/components/navigation'

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
    <>
      <Navigation />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Builds builds={builds} />
      </main>
    </>
  )
}

export default BuildPage
