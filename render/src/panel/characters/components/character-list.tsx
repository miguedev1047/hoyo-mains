import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { CharacterType } from '@/render/src/types'
import CharacterItem from '@/render/src/panel/characters/components/character-item'

interface CharacterListProps {
  characters: CharacterType[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  if (!characters.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron personajes</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <ol className='w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4'>
      {characters.map((character) => (
        <CharacterItem key={character.id} item={character} />
      ))}
    </ol>
  )
}

export default CharacterList
