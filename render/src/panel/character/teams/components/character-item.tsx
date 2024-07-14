import { Draggable } from '@hello-pangea/dnd'
import { Card, Image } from '@nextui-org/react'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { CharacterType, TeamCharacterItemType } from '@/render/src/types'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { deleteCharacter } from '../services/delete'
import { ItemSkeleton } from './skeletons'
import Figure from '@/render/src/shared/components/figure'
import DeleteButton from '../../../shared/components/buttons/delete-button'

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

  if (error) return <ItemSkeleton />
  if (isLoading) return <ItemSkeleton />

  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='max-lg:mb-4 lg:mx-2'
        >
          <Card className='p-2 md:p-5 bg-color-dark'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-4 items-center select-none'>
                <span className='max-md:hidden'>
                  <IconGripVertical size={20} />
                </span>
                <Figure
                  background='bg-primary-color'
                  width='w-12'
                  height='h-12'
                >
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
