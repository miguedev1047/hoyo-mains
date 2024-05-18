import { IconUsers } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/sections/panel-wrapper'
import CharacterModal from '@/render/components/UI/modal/character-modal'
import CharactersSection from '@/render/sections/characters/characters-section'

const CharactersPage = () => {
  return (
    <PanelWrapper>
      <Header title='Personajes' startContent={<IconUsers size={40} />} />

      <CharactersSection />

      <CharacterModal />
    </PanelWrapper>
  )
}

export default CharactersPage
