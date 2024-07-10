import ItemCharacter from '@/render/components/panel/characters/item-character'
import { CharacterTypes } from '@/types'

interface ListCharacterProps {
  characters: CharacterTypes[]
}

const ListCharacter = ({ characters }: ListCharacterProps) => {

  return (
    <ol className=''>
      {characters?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ol>
  )
}

export default ListCharacter
