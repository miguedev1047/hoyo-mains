import { CharacterTypes, BestTeamType } from '@/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { updatedOrderTeams } from '@/render/services/panel/teams/best-teams/update'
import { useDrag } from '@/utils/hooks/misc/use-drag'
import BestTeamItem from '@/render/components/panel/teams/best-teams/best-team-item'

interface BestTeamListTypes {
  teams: BestTeamType[]
  characters: CharacterTypes[]
}

const BestTeamList = ({ teams, characters }: BestTeamListTypes) => {
  const { onDragEnd, orderedList } = useDrag({
    item: teams,
    name: 'teamList',
    callback: updatedOrderTeams
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction='vertical' droppableId='teamList' type='teamList'>
        {(provided) => (
          <ol
            className='select-none'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedList.map((team, index) => (
              <BestTeamItem
                team={team}
                index={index}
                key={team.id}
                characters={characters}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default BestTeamList
