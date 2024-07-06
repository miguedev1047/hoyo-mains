import { CharacterTypes } from '@/types'
import CharacterTeamItem from './character-team-item'

const CharacterTeamList = ({ character }: { character: CharacterTypes }) => {
  const teams = character.teams ?? []

  return (
    <ol className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {teams.map((team) => (
        <CharacterTeamItem key={team.id} team={team}  />
      ))}
    </ol>
  )
}

export default CharacterTeamList
