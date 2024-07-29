import { fetchCharacters } from '@/render/src/panel/characters/utilities/services/fetch'
import { CharacterType } from '@/render/src/types'
import { IconUsers } from '@tabler/icons-react'
import Characters from '@/render/src/panel/characters/characters'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import CharacterMenubar from '@/render/src/panel/characters/components/character-menubar'
import CharacterSheet from '@/render/src/panel/characters/components/character-sheet'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'

interface FetchCharactersByNameTypes {
  searchParams: {
    name: string
    element?: string
    weapon?: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Personajes',
    description: 'Panel de administración de HoYo Mains.'
  }
}

export default async function CharactersPage({
  searchParams
}: FetchCharactersByNameTypes) {
  const { name, element, weapon } = {
    name: searchParams.name?.toLocaleLowerCase(),
    element: searchParams?.element,
    weapon: searchParams?.weapon
  }

  const characters = (await fetchCharacters({
    name,
    element,
    weapon
  })) as CharacterType[]

  return (
    <PanelContainer>
      <PanelHeader title='Personajes' startContent={<IconUsers size={32} />} />

      <CharacterMenubar />

      <Characters characters={characters} />

      <CharacterSheet />
    </PanelContainer>
  )
}
