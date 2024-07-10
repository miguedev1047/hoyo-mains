import ItemCharacter from '@/render/components/panel/characters/item-character'
import { CharacterTypes } from '@/types'

interface ListCharacterProps {
  characters: CharacterTypes[]
}

const ListCharacter = ({ characters }: ListCharacterProps) => {

  return (
    <ol className='w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4'>
      {characters?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ol>
  )
}

export default ListCharacter
