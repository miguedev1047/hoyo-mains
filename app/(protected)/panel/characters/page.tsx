import { fetchCharacters } from '@/render/services/panel/characters/data'
import { CharacterType } from '@/render/src/types'
import { IconUsers } from '@tabler/icons-react'
import Characters from '@/render/src/panel/characters/characters'
import PanelWrapper from '@/render/src/panel/shared/components/ui/panel-wrapper'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import CharacterMenubar from '@/render/src/panel/characters/components/character-menubar'
import CharacterModal from '@/render/src/panel/characters/components/character-modal'

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
    <PanelWrapper>
      <PanelHeader title='Personajes' startContent={<IconUsers size={32} />} />

      <CharacterMenubar />

      <Characters characters={characters} />

      <CharacterModal />
    </PanelWrapper>
  )
}
