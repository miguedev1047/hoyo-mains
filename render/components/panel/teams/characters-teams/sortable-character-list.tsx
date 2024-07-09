import { updatedOrderCharacters } from '@/render/services/panel/teams/character-teams/update'
import { CharacterTypes, Team } from '@/types'
import { CharacterByTeam } from '@prisma/client'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useMemo, useState } from 'react'
import { reOrder } from '@/utils/helpers/re-order'
import { toast } from 'sonner'
import { useMediaQuery } from '@/utils/hooks/general/use-media-query'
import CharacterItemCharacter from '@/render/components/panel/teams/characters-teams/character-item-character'

const SortableCharacterList = ({
  character,
  team
}: {
  character: CharacterTypes | undefined
  team: Team
}) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const characters = useMemo(() => team.characters ?? [], [team])
  const [orderedList, setOrderedList] = useState<CharacterByTeam[] | undefined>(
    characters
  )

  useEffect(() => {
    setOrderedList(characters)
  }, [characters])

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
      const items = reOrder(orderedList!, source.index, destination.index).map(
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

  if (isDesktop)
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          direction='horizontal'
          droppableId='characterList'
          type='characterList'
        >
          {(provided) => (
            <ol
              className='grid grid-cols-4 '
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {orderedList?.map((characterData, index) => (
                <CharacterItemCharacter
                  key={characterData.id}
                  index={index}
                  team={characterData}
                  character={character}
                />
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        direction='vertical'
        droppableId='characterList'
        type='characterList'
      >
        {(provided) => (
          <ol
            className='grid grid-cols-1'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedList?.map((characterData, index) => (
              <CharacterItemCharacter
                key={characterData.id}
                index={index}
                team={characterData}
                character={character}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableCharacterList
