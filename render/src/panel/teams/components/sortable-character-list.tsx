import { useMediaQuery } from '@/render/src/shared/utilities/hooks/use-media-query'
import { BestTeamsType } from '@/render/src/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderCharacters } from '@/render/src/panel/teams/utilities/services/update'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import CharacterItem from '@/render/src/panel/teams/components/character-item'

interface SortableCharacterListTypes {
  team: BestTeamsType
}

const SortableCharacterList = ({ team }: SortableCharacterListTypes) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const teamMembers = team.characters

  const { orderedList, onDragEnd } = useDrag({
    item: teamMembers,
    name: 'characterList',
    callback: updatedOrderCharacters
  })

  if (!isDesktop)
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          direction='vertical'
          droppableId='characterList'
          type='characterList'
        >
          {(provided) => (
            <ol
              className='grid grid-cols-1 select-none'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {orderedList.map((character, index) => (
                <CharacterItem
                  index={index}
                  key={character.id}
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
        direction='horizontal'
        droppableId='characterList'
        type='characterList'
      >
        {(provided) => (
          <ol
            className='grid grid-cols-4 select-none'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedList.map((character, index) => (
              <CharacterItem
                index={index}
                key={character.id}
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
