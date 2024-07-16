import { CharacterType, TeamItemType } from '@/render/src/types'
import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@nextui-org/card'
import { IconTrash } from '@tabler/icons-react'
import { deleteTeam } from '@/render/src/panel/teams/utilities/services/delete'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import TeamTitle from '@/render/src/panel/teams/components/team-title'
import SortableCharacterList from '@/render/src/panel/teams/components/sortable-character-list'
import CharacterSelector from '@/render/src/panel/teams/components/character-selector'

interface TeamItemProps {
  team: TeamItemType
  index: number
  characters: CharacterType[]
}

const TeamItem = ({ team, characters, index }: TeamItemProps) => {
  return (
    <Draggable draggableId={team.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mb-4'
        >
          <Card className='flex flex-col gap-4 p-5 bg-color-dark'>
            <article className='flex items-center gap-4'>
              <DeleteButton id={team.id} onCallback={deleteTeam}>
                <IconTrash />
              </DeleteButton>
              <TeamTitle team={team}>{team.name}</TeamTitle>
            </article>

            <SortableCharacterList team={team} />
            <CharacterSelector characters={characters} team={team} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default TeamItem
