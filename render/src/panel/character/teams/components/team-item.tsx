import { CharacterType, TeamItemType } from '@/render/src/types'
import { Draggable } from '@hello-pangea/dnd'
import { deleteTeam } from '@/render/src/panel/character/teams/utilities/services/delete'
import { Card } from '@nextui-org/react'
import { IconTrash } from '@tabler/icons-react'
import TeamTitle from '@/render/src/panel/character/teams/components/team-title'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import SortableCharacterList from '@/render/src/panel/character/teams/components/sortable-character-list'
import CharacterSelector from '@/render/src/panel/character/teams/components/character-selector'

interface TeamItemProps {
  team: TeamItemType
  index: number
  character: CharacterType
}

const TeamItem = ({ team, character, index }: TeamItemProps) => {
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
              <DeleteButton id={team.id} onCallback={deleteTeam}>
                <IconTrash />
              </DeleteButton>
              <TeamTitle team={team}>{team.name}</TeamTitle>
            </article>

            <SortableCharacterList team={team} />
            <CharacterSelector character={character} team={team} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default TeamItem
