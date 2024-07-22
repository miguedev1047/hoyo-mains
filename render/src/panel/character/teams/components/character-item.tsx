import { Draggable } from '@hello-pangea/dnd'
import { Card, Image } from '@nextui-org/react'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { CharacterType, TeamCharacterItemType } from '@/render/src/types'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { deleteCharacter } from '@/render/src/panel/character/teams/utilities/services/delete'
import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import clsx from 'clsx'

interface CharacterItemProps {
  character: TeamCharacterItemType
  index: number
}

const CharacterItem = ({ character, index }: CharacterItemProps) => {
  const {
    data: fetchedCharacter,
    isLoading,
    error
  } = useFetch<CharacterType>(
    `/api/characters/character/${character.characterItem}`
  )

  if (error)
    return (
      <SkeletonCard showDragIcon className='max-w-[358px]' variant='dark' />
    )
  if (isLoading)
    return (
      <SkeletonCard showDragIcon className='max-w-[358px]' variant='dark' />
    )

  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='max-xl:mb-4'
        >
          <Card
            className={clsx(
              'bg-color-dark p-5',
              snapshot.isDragging && 'border-[1px] border-color-lightest'
            )}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-4 items-center select-none'>
                <span className='max-md:hidden'>
                  <IconGripVertical size={20} />
                </span>
                <Figure size='md'>
                  <Image
                    radius='sm'
                    className='w-full h-full object-cover'
                    src={fetchedCharacter?.imageUrl!}
                    alt={fetchedCharacter?.name}
                  />
                </Figure>
                <h3 className='text-sm md:text-lg font-semibold capitalize line-clamp-1'>
                  {fetchedCharacter?.name}
                </h3>
              </div>

              <DeleteButton id={character.id!} onCallback={deleteCharacter}>
                <IconTrash />
              </DeleteButton>
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItem
