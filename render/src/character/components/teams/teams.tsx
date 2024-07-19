import { CharacterType } from '@/render/src/types'
import TeamList from '@/render/src/character/components/teams/team-list'

interface TeamsProps {
  character: CharacterType
}

const Teams = ({ character }: TeamsProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Equipos
      </h3>

      <TeamList character={character} />
    </div>
  )
}

export default Teams
