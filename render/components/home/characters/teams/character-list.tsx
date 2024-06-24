import { Team } from '@/types'
import CharacterItem from '@/render/components/home/characters/teams/character-item'

const CharacterList = ({ team }: { team: Team }) => {
  const characters = team.characters ?? []

  return (
    <ol className='grid grid-cols-4 gap-4'>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterItem characters={character} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterList
