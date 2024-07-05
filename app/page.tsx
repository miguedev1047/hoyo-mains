import { characterType, SearchParamsTypes } from '@/types'
import { getCharactersByName } from '@/render/services/home/characters/data'
import { Suspense } from 'react'
import Header from '@/render/components/home/header/header'
import SectionHome from '@/render/sections/home/section-home'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Inicio',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

export default async function Home({ searchParams }: SearchParamsTypes) {
  const characterName = searchParams.character?.toLowerCase()

  const characters = (await getCharactersByName({
    name: characterName
  })) as characterType[]

  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Suspense>
          <SectionHome characters={characters} />
        </Suspense>
      </main>
    </>
  )
}
