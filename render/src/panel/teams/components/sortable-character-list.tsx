import { BestTeamType } from '@/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderCharacters } from '@/render/src/panel/teams/utilities/services/update'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import CharacterItem from '@/render/src/panel/teams/components/character-item'

interface SortableCharacterListTypes {
  team: BestTeamType
}

const SortableCharacterList = ({ team }: SortableCharacterListTypes) => {
  const teamMembers = team.characters

  const { orderedList, onDragEnd } = useDrag({
    item: teamMembers,
    name: 'characterList',
    callback: updatedOrderCharacters
  })

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
