import ListCharacter from '@/render/components/panel/characters/list-character'
import CharacterNav from '@/render/components/panel/characters/character-nav'
import { CharacterTypes } from '@/types'

interface ListCharacterProps {
  characters: CharacterTypes[]
}

const CharactersSection = ({ characters }: ListCharacterProps) => {
  return (
    <section className='space-y-4'>
      <CharacterNav />
      <ListCharacter characters={characters} />
    </section>
  )
}

export default CharactersSection
