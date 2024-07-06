import { Suspense } from 'react'
import { SearchParamsTypes } from '@/types'
import { fetchCharacters } from '@/render/services/home/characters/data'
import { CharacterTypes } from '@/types'
import Header from '@/render/components/home/header/header'
import SectionBuild from '@/render/sections/builds/section-build'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Builds',
    description:
      'Mira las mejores builds de los personajes de Genshin Impact. Encuentra la mejor build para tu personaje favorito.'
  }
}

const BuildPage = async ({ searchParams }: SearchParamsTypes) => {
  const { name, element, stars, weapon } = {
    name: searchParams.character?.toLowerCase(),
    element: searchParams.element?.toLowerCase(),
    stars: parseInt(searchParams.stars),
    weapon: searchParams.weapon?.toLowerCase()
  }

  const characters = (await fetchCharacters({
    element,
    name,
    stars,
    weapon
  })) as CharacterTypes[]


  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Suspense>
          <SectionBuild characters={characters} />
        </Suspense>
      </main>
    </>
  )
}

export default BuildPage
