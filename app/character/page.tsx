import type { ResolvingMetadata } from 'next'
import { fetchCharacterByName } from '@/render/src/character/utilities/services/fetch'
import { CharacterType } from '@/render/src/types'
import Navigation from '@/render/src/shared/components/navigation'
import Character from '@/render/src/character/character'

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

  const character = (await fetchCharacterByName({
    name: characterName
  })) as CharacterType

  return (
    <>
      <Navigation />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Character character={character} />
      </main>
    </>
  )
}

export default CharacterPage
