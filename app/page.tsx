import { CharacterTypes, SearchParamsTypes } from '@/types'
import { fetchCharacters } from '@/render/services/home/characters/data'
import { Suspense } from 'react'
import Header from '@/render/components/home/header/header'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Inicio',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

export default async function Home({ searchParams }: SearchParamsTypes) {
  const { name, element, stars, weapon } = {
    name: searchParams.character?.toLowerCase(),
    element: searchParams.element?.toLowerCase(),
    stars: parseInt(searchParams?.stars ?? '0'),
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
        </Suspense>
      </main>
    </>
  )
}
