import { Characters } from '@/types'
import CharacterFormTeam from '@/render/components/panel/teams/character-form-team'
import SortableTeamList from '@/render/components/panel/teams/sortable-team-list'

const CharacterTeams = ({
  character
}: {  
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Equipos
      </h3>
      <SortableTeamList character={character} />
      <CharacterFormTeam character={character} />
    </div>
  )
}

export default CharacterTeams