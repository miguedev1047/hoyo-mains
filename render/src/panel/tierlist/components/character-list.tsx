import { CharacterTierType } from '@/render/src/types'
import CharacterItem from '@/render/src/panel/tierlist/components/character-item'

interface characterTierList {
  characters: CharacterTierType[]
}

const CharacterList = ({ characters }: characterTierList) => {
  return (
    <>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterItem character={character} />
        </li>
      ))}
    </>
  )
}

export default CharacterList
