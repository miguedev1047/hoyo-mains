'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { CharacterType } from '@/render/src/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderTeams } from '@/render/src/panel/character/teams/services/update'
import TeamItem from '@/render/src/panel/character/teams/components/team-item'

const SortableTeamList = ({ character }: { character: CharacterType }) => {
  const { orderedList, onDragEnd } = useDrag({
    item: character.teams,
    name: 'teamList',
    callback: updatedOrderTeams
  })

  if (!orderedList.length) return null

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='teamList' type='teamList'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {orderedList.map((team, index) => (
              <TeamItem
                key={team.id}
                character={character}
                index={index}
                team={team}
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
