import { CharacterType } from '@/render/src/types'
import TeamItem from '@/render/src/character/components/teams/team-item'

interface TeamListProps {
  character: CharacterType
}

const TeamList = ({ character }: TeamListProps) => {
  const teams = character?.teams ?? []

  return (
    <ol className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {teams?.map((team) => (
        <TeamItem key={team.id} team={team} />
      ))}
    </ol>
  )
}

export default TeamList
