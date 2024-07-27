import type { ResolvingMetadata } from 'next'
import { CharacterType } from '@/render/src/types'
import { fetchCharacterByName } from '@/render/src/panel/character/shared/utilities/services/fetch-character-by-name'
import Header from '@/render/src/panel/character/header'
import Character from '@/render/src/panel/character/character'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'

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
  const character = (await fetchCharacterByName(
    characterName
  )) as CharacterType

  return (
    <PanelContainer>
      <Header title={character?.name} />
      <Character character={character} />
    </PanelContainer>
  )
}

export default CharacterPage
