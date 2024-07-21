import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { BestTeamsType, CharacterType } from '@/render/src/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderTeams } from '@/render/src/panel/teams/utilities/services/update'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import TeamItem from '@/render/src/panel/teams/components/team-item'

interface SortableTeamListProps {
  teams: BestTeamsType[]
  characters: CharacterType[]
}

const SortableTeamList = ({ teams, characters }: SortableTeamListProps) => {
  const { orderedList, onDragEnd } = useDrag({
    item: teams,
    name: 'teamList',
    callback: updatedOrderTeams
  })

  if (!orderedList?.length)
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron equipos</NotFoundTitle>
      </NotFound>
    )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction='vertical' droppableId='teamList' type='teamList'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {orderedList.map((team, index) => (
              <TeamItem
                characters={characters}
                key={team.id}
                team={team}
                index={index}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableTeamList
