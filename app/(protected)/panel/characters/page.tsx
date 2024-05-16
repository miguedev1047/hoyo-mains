import { IconUsers } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'
import CharacterModal from '@/render/components/UI/modal/character-modal'
import CharactersSection from '@/render/sections/characters/characters-section'

const CharactersPage = () => {
  return (
    <PanelSection>
      <Header title='Personajes' startContent={<IconUsers size={40} />} />

      <CharactersSection />

      <CharacterModal />
    </PanelSection>
  )
}

export default CharactersPage
