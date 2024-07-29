import { CharacterByTeam } from '@prisma/client'
import CharacterItem from './character-item'

interface CharacterListProps {
  characters: CharacterByTeam[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <ol className='grid grid-cols-4 gap-2 md:gap-4'>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </ol>
  )
}

export default CharacterList
