import { fetchCharacters } from '@/render/services/panel/characters/data'
import { CharacterTypes } from '@/types'
import { IconUsers } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import CharacterModal from '@/render/components/UI/modal/character-modal'
import CharactersSection from '@/render/sections/characters/characters-section'

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

const CharactersPage = async ({ searchParams }: FetchCharactersByNameTypes) => {
  const { name, element, weapon } = {
    name: searchParams.name?.toLocaleLowerCase(),
    element: searchParams.element,
    weapon: searchParams.weapon
  }

  const characters = (await fetchCharacters({
    name,
    element,
    weapon
  })) as CharacterTypes[]

  return (
    <PanelWrapper>
      <Header title='Personajes' startContent={<IconUsers size={32} />} />

      <CharactersSection characters={characters} />

      <CharacterModal />
    </PanelWrapper>
  )
}

export default CharactersPage
