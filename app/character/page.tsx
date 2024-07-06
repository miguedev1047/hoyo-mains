import { fetchCharactersByName } from '@/render/services/home/characters/data'
import { CharacterTypes } from '@/types'
import SectionCharacterHome from '@/render/sections/characters/character-home-section'
import Header from '@/render/components/home/header/header'

import type { ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
) {
  const queryName = searchParams.name?.toString().replace(/-/g, ' ')
  const characterName = queryName?.replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `HoYo Mains | ${characterName}`,
    description: `Información sobre el personaje ${characterName}.`
  }
}

const CharacterPage = async ({
  searchParams
}: {
  searchParams: {
    name: string
  }
}) => {
  const characterName = searchParams.name.replace(/-/g, ' ')
  const character = (await fetchCharactersByName(
    characterName
  )) as CharacterTypes

  return (
    <>
      <Header />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <SectionCharacterHome character={character} />
      </main>
    </>
  )
}

export default CharacterPage
