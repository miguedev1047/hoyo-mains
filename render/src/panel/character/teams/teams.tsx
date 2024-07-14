import { CharacterType } from '@/render/src/types'
import SortableTeamList from '@/render/src/panel/character/teams/components/sortable-team-list'
import FormTeam from '@/render/src/panel/character/teams/components/team-form'

interface TeamsProps {
  character: CharacterType
}

const Teams = ({ character }: TeamsProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Equipos
      </h3>

      <SortableTeamList character={character} />
      <FormTeam character={character} />
    </div>
  )
}

export default Teams
