import { CharacterTypes, TeamProps } from '@/types'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { reOrder } from '@/utils/helpers/re-order'
import { toast } from 'sonner'
import { updatedOrderTeams } from '@/render/services/panel/teams/general-teams/update'
import GeneralTeamItem from '@/render/components/panel/teams/general-teams/general-team-item'

const CharacterGeneralTeamList = ({
  teams,
  characters
}: {
  teams: TeamProps[]
  characters: CharacterTypes[]
}) => {
  const [orderedList, setOrderedList] = useState<TeamProps[]>(teams)

  useEffect(() => {
    setOrderedList(teams)
  }, [teams])

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
        <Droppable direction='vertical' droppableId='teamList' type='teamList'>
          {(provided) => (
            <ol
              className='select-none'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {orderedList.map((team, index) => (
                <GeneralTeamItem
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

export default CharacterGeneralTeamList
