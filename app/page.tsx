import { fetchCharacters } from '@/render/src/home/utilities/services/fetch'
import { CharacterType } from '@/render/src/types'
import RootContainer from '@/render/src/shared/components/containers/root-container'
import Home from '@/render/src/home/home'

interface HomePageProps {
  searchParams: {
    name: string
    element: string
    stars: string
    weapon: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Inicio',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { name, element, stars, weapon } = {
    name: searchParams.name,
    element: searchParams.element,
    stars: parseInt(searchParams.stars!),
    weapon: searchParams.weapon
  }

  const characters = (await fetchCharacters({
    name,
    element,
    weapon,
    stars
  })) as CharacterType[]

  return (
    <RootContainer>
      <Home characters={characters} />
    </RootContainer>
  )
}
