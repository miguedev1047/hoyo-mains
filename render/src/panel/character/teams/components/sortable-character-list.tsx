import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { TeamItemType } from '@/render/src/types'
import { updatedOrderCharacters } from '@/render/src/panel/character/teams/utilities/services/update'
import { useMediaQuery } from '@/render/src/shared/utilities/hooks/use-media-query'
import CharacterItem from '@/render/src/panel/character/teams/components/character-item'

interface SortableCharacterListProps {
  team: TeamItemType
}

const SortableCharacterList = ({ team }: SortableCharacterListProps) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const { orderedList, onDragEnd } = useDrag({
    item: team.characters,
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
              {orderedList?.map((character, index) => (
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
            {orderedList?.map((character, index) => (
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
