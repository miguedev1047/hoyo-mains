import CharacterSection from '@/render/sections/characters/character-section'
import PanelWrapper from '@/render/components/UI/panel-wrapper'

const CharacterPage = ({
  searchParams,
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
