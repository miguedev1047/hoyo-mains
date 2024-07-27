import type { ResolvingMetadata } from 'next'
import { fetchCharacterByName } from '@/render/src/character/utilities/services/fetch'
import { CharacterType } from '@/render/src/types'
import RootContainer from '@/render/src/shared/components/containers/root-container'
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
    <RootContainer>
      <Character character={character} />
    </RootContainer>
  )
}

export default CharacterPage
