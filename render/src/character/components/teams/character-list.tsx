import { TeamByCharacterType } from '@/render/src/types'
import CharacterItem from '@/render/src/character/components/teams/character-item'

interface CharacterListProps {
  team: TeamByCharacterType
}

const CharacterList = ({ team }: CharacterListProps) => {
  const characters = team?.characters ?? []

  return (
    <ol className='grid grid-cols-4 gap-2 md:gap-4'>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterItem character={character} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterList
