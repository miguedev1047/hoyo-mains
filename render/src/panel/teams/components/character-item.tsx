import { Card } from '@nextui-org/card'
import { Draggable } from '@hello-pangea/dnd'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { Image } from '@nextui-org/react'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { BestTeamCharacterType, CharacterType } from '@/render/src/types'
import { deleteCharacter } from '@/render/src/panel/teams/utilities/services/delete'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { Figure } from '@/render/src/shared/components/figure'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'
import clsx from 'clsx'

interface CharacterItemProps {
  character: BestTeamCharacterType
  index: number
}

const CharacterItem = ({ character, index }: CharacterItemProps) => {
  const characterId = character?.characterId

  const { data, isLoading, error } = useFetch<CharacterType>(
    `/api/characters/character/${characterId}`
  )

  if (error) return <SkeletonCard showDragIcon variant='darkest' />
  if (isLoading) return <SkeletonCard showDragIcon variant='darkest' />

  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided, snapshot) => (
        <li
          className='max-lg:mb-4'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            className={clsx(
              'bg-color-darkest p-5',
              snapshot.isDragging && 'border-[1px] border-color-lightest'
            )}
          >
            <div className='flex items-center justify-between gap-2'>
              <article className='flex items-center gap-4'>
                <IconGripVertical size={20} />
                <Figure>
                  <Image
                    radius='sm'
                    src={data?.imageUrl!}
                    alt={data?.name}
                    className='w-ful h-full object-cover'
                  />
                </Figure>
                <h2 className='capitalize line-clamp-1 text-base md:text-lg font-medium'>
                  {data?.name}
                </h2>
              </article>
              <DeleteButton id={character.id} onCallback={deleteCharacter}>
                <IconTrash size={20} />
              </DeleteButton>
            </div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItem
