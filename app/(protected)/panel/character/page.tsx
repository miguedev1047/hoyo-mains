import type { ResolvingMetadata } from 'next'
import { CharacterType } from '@/render/src/types'
import Character from '@/render/src/panel/character/character'
import PanelWrapper from '@/render/src/panel/shared/components/ui/panel-wrapper'
import Header from '@/render/src/panel/character/components/character/header'
import fetchCharacterByName from '@/render/src/panel/character/utilities/services/fetch/fetch-character-by-name'

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
    title: `HoYo Panel | ${characterName}`,
    description: `Información sobre el personaje ${characterName}.`
  }
}

const CharacterPage = async ({
  searchParams
}: {
  searchParams: { name: string }
}) => {
  const characterName = searchParams.name.toLowerCase().replace(/-/g, ' ')
  const character = (await fetchCharacterByName(characterName)) as CharacterType

  return (
    <PanelWrapper>
      <Header title={character?.name} />
      <Character character={character} />
    </PanelWrapper>
  )
}

export default CharacterPage
