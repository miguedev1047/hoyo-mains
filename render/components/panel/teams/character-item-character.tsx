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
  team,
  character,
  index
}: {
  team: CharactersByTeam
  character: Characters | undefined
  index: number
}) => {
  const {
    data: dataCharacter,
    isLoading,
    error
  } = useSWR<Characters>(
    `/api/characters/character/${team.characterItem}`,
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
          className='mb-4 lg:mx-2'
        >
          <Card className='flex flex-col gap-2 md:gap-4 p-2 md:p-5 bg-color-dark'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center select-none'>
                <span className='max-md:hidden'>
                  <IconGripVertical size={20} />
                </span>
                <Avatar
                  radius='sm'
                  className='bg-primary-color'
                  src={dataCharacter?.imageUrl!}
                  alt={dataCharacter?.name}
                />
                <h3 className='text-sm md:text-lg font-semibold capitalize line-clamp-1'>
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
