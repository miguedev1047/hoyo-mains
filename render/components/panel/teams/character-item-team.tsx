import { CharacterTypes, Team } from '@/types'
import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@nextui-org/react'
import CharacterSelector from '@/render/components/panel/teams/character-selector'
import SortableCharacterList from '@/render/components/panel/teams/sortable-character-list'
import ButtonDeleteTeam from '@/render/components/UI/buttons/team/button-delete-team'
import CharacterTeamTitle from '@/render/components/panel/teams/character-team-title'

const CharacterItemTeam = ({
  team,
  character,
  index
}: {
  team: Team
  character: CharacterTypes | undefined
  index: number
}) => {
  return (
    <Draggable draggableId={team.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mb-4'
        >
          <Card className='flex flex-col gap-4 p-5 bg-color-darkest'>
            <article className='flex items-center gap-4'>
              <ButtonDeleteTeam character={character} team={team} />
              <CharacterTeamTitle team={team} character={character} />
            </article>

            <SortableCharacterList character={character} team={team} />
            <CharacterSelector character={character} team={team} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItemTeam
