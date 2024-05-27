import { Draggable } from '@hello-pangea/dnd'
import { Avatar, Card } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'
import { ItemCharacterError } from '@/render/components/UI/errors/character-error'
import { Characters, CharactersByTeam } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import ButtonDeleteCharacter from '@/render/components/UI/buttons/team/button-delete-character'
import SkeletonTeamCharacters from '@/render/components/UI/skeletons/skeleton-team-characters'
import useSWR from 'swr'

const CharacterItemCharacter = ({
  character,
  team,
  index
}: {
  character: Characters | undefined
  team: CharactersByTeam
  index: number
}) => {
  const {
    data: dataCharacter,
    isLoading,
    error
  } = useSWR<Characters>(
    `/api/characters/character/${team.characterId}`,
    fetcher
  )

  if (error)
    return (
      <ItemCharacterError message='Ha ocurrido un error al cargar el personaje.' />
    )

  if (isLoading) return <SkeletonTeamCharacters />

  return (
    <Draggable draggableId={team.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mx-2'
        >
          <Card className='flex flex-col gap-4 p-5 bg-color-dark'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center select-none'>
                <IconGripVertical size={20} />
                <Avatar
                  radius='sm'
                  className='bg-primary-color'
                  src={dataCharacter?.imageUrl!}
                  alt={dataCharacter?.name}
                />
                <h3 className='text-lg font-semibold capitalize'>
                  {dataCharacter?.name}
                </h3>
              </div>

              <ButtonDeleteCharacter character={character} team={team!} />
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItemCharacter
