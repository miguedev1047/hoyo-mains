import { updatedOrderTeams } from '@/render/services/panel/teams/update'
import { Characters, Team } from '@/types'
import { reOrder } from '@/utils/helpers/re-order'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import CharacterItemTeam from '@/render/components/panel/teams/character-item-team'

const SortableTeamList = ({
  character
}: {
  character: Characters | undefined
}) => {
  const teams = useMemo(() => character?.teams ?? [], [character])
  const [orderedList, setOrderedList] = useState<Team[]>(teams)

  useEffect(() => {
    setOrderedList(teams)
  }, [teams, character])

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // Si es arrastrado en la misma posición
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Ordenamos en la lista
    if (type === 'teamList') {
      const items = reOrder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )

      setOrderedList(items)
      const { status, message } = await updatedOrderTeams(items)
      if (status === 201) {
        toast.success(message)
        return
      }
    }
  }

  if (!orderedList.length) return null

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='teamList' type='teamList'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {orderedList.map((team, index) => (
              <CharacterItemTeam
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
