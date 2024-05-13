import CharacterSection from '@/render/sections/characters/character-section'
import PanelSection from '@/render/sections/panel/panel-section'

const CharacterPage = ({ params }: { params: { id: string } }) => {
  const characterId = params.id

  return (
    <PanelSection>
      <CharacterSection characterId={characterId} />
    </PanelSection>
  )
}

export default CharacterPage
