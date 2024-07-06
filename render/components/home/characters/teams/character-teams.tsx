import { CharacterTypes } from '@/types'
import CharacterTeamList from './character-team-list'

const CharacterTeams = ({ character }: { character: CharacterTypes | undefined }) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Equipos
      </h3>

      <CharacterTeamList character={character} />
    </div>
  )
}

export default CharacterTeams
