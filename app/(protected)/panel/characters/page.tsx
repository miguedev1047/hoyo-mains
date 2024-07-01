import { IconUsers } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import CharacterModal from '@/render/components/UI/modal/character-modal'
import CharactersSection from '@/render/sections/characters/characters-section'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Personajes',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const CharactersPage = () => {
  return (
    <PanelWrapper>
      <Header title='Personajes' startContent={<IconUsers size={32} />} />

      <CharactersSection />

      <CharacterModal />
    </PanelWrapper>
  )
}

export default CharactersPage
