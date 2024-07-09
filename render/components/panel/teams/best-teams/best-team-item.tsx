import { updatedOrderCharacters } from '@/render/services/panel/teams/best-teams/update'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { CharacterTypes, BestTeamType } from '@/types'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useDrag } from '@/utils/hooks/misc/use-drag'
import CharacterSelector from '@/render/components/panel/teams/best-teams/character-selector'
import CharacterItem from '@/render/components/panel/teams/best-teams/character-item'
import TeamTitle from '@/render/components/panel/teams/best-teams/best-team-title'

interface BestTeamItemTypes {
  team: BestTeamType
  characters: CharacterTypes[]
  index: number
}

const BestTeamItem = ({ team, characters, index }: BestTeamItemTypes) => {
  const teamMembers = team.characters

  const { orderedList, onDragEnd } = useDrag({
    item: teamMembers,
    name: 'characterList',
    callback: updatedOrderCharacters
  })

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
              <TeamTitle team={team} />
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
                      {orderedList?.map((character, index) => (
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

export default BestTeamItem
