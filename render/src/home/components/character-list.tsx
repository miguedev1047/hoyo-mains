import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { Character } from '@prisma/client'
import CharacterItem from '@/render/src/home/components/character-item'

interface CharacterListProps {
  characters: Character[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  if (!characters?.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron personajes</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <ol className='relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 overflow-hidden gap-4 select-none'>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </ol>
  )
}

export default CharacterList
