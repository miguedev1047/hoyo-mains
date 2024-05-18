import CharacterSection from '@/render/sections/characters/character-section'
import PanelWrapper from '@/render/components/UI/panel-wrapper'

const CharacterPage = ({ params }: { params: { id: string } }) => {
  const characterId = params.id

  return (
    <PanelWrapper>
      <CharacterSection characterId={characterId} />
    </PanelWrapper>
  )
}

export default CharacterPage
