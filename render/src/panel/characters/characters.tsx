import { CharacterType } from '@/render/src/types'
import CharacterList from '@/render/src/panel/characters/components/character-list'

interface CharactersTypes {
  characters: CharacterType[]
}

const Characters = ({ characters }: CharactersTypes) => {
  return <CharacterList characters={characters} />
}

export default Characters
