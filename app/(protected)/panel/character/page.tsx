import CharacterSection from '@/render/sections/characters/character-section'
import PanelWrapper from '@/render/components/UI/panel-wrapper'

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
    title: `HoYo Panel | ${characterName}`,
    description: `Información sobre el personaje ${characterName}.`
  }
}

const CharacterPage = ({
  searchParams
}: {
  searchParams: { name: string }
}) => {
  const characterName = searchParams.name

  return (
    <PanelWrapper>
      <CharacterSection characterName={characterName} />
    </PanelWrapper>
  )
}

export default CharacterPage
