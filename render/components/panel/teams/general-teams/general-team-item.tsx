import { updatedOrderCharacters } from '@/render/services/panel/teams/general-teams/update'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { CharacterTypes, TeamProps } from '@/types'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { reOrder } from '@/utils/helpers/re-order'
import { toast } from 'sonner'
import CharacterSelector from '@/render/components/panel/teams/general-teams/character-selector'
import CharacterItem from '@/render/components/panel/teams/general-teams/character-item'

interface Props {
  id: string
  characterId: string | null
  teamId: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

const GeneralTeamItem = ({
  team,
  characters,
  index
}: {
  team: TeamProps
  characters: CharacterTypes[]
  index: number
}) => {
  const teamMembers = team.characters
  const [orderedList, setOrderedList] = useState<Props[]>(teamMembers)

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
    if (type === 'characterList') {
      const items = reOrder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )

      setOrderedList(items)
      const { status, message } = await updatedOrderCharacters(items)
      if (status === 201) {
        toast.success(message)
        return
      }
    }
  }

  if (!orderedList.length) return null

  return (
    <Draggable draggableId={team.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mb-4'
        >
          <Card className='bg-color-dark p-3'>
            <CardHeader>
              <article>
                {/* TODO: Add delete button */}
                {/* TODO: Add title component */}
                <h2 className='capitalize text-base md:text-lg font-medium'>
                  {team.name}
                </h2>
              </article>
            </CardHeader>
            <CardBody className='space-y-2'>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  direction='horizontal'
                  droppableId='characterList'
                  type='characterList'
                >
                  {(provided) => (
                    <ol
                      className='grid grid-cols-4'
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {orderedList.map((character, index) => (
                        <CharacterItem
                          key={character.id}
                          character={character}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </ol>
                  )}
                </Droppable>
              </DragDropContext>
              <CharacterSelector team={team} characters={characters} />
            </CardBody>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default GeneralTeamItem
