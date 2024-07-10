import { CharacterType } from '@/render/src/types'
import CharacterList from '@/render/src/panel/characters/components/character-list'
import CharacterNoItems from '@/render/src/panel/characters/components/no-items-found'

interface FetchCharactersTypes {
  characters: CharacterType[]
}

const Characters = ({ characters }: FetchCharactersTypes) => {
  if (!characters?.length) return <CharacterNoItems />

  return (
    <>
      <CharacterList characters={characters} />
    </>
  )
}

export default Characters
