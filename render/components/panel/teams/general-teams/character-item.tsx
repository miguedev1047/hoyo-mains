import { Draggable } from '@hello-pangea/dnd'
import { PanelErrorItem } from '@/render/components/UI/errors'
import { PanelSkeletonItem } from '@/render/components/UI/skeletons'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'
import Figure from '@/render/components/UI/misc/figure'

interface Props {
  id: string
  characterId: string | null
  teamId: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

const CharacterItem = ({
  character,
  index
}: {
  character: Props
  index: number
}) => {
  const characterId = character?.characterId

  const { data, isLoading, error } = useFetch(
    `/api/characters/character/${characterId}`
  )

  if (isLoading) return <PanelSkeletonItem />
  if (error) return <PanelErrorItem />

  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='lg:mx-2'
        >
          <Card className='bg-color-darkest p-5'>
            <article className='flex items-center gap-4'>
              <IconGripVertical size={20} />
              <Figure padding='p-0'>
                <Image src={data.imageUrl!} alt={data.name} />
              </Figure>
              <h2 className='capitalize text-base md:text-lg font-medium'>
                {data.name}
              </h2>
            </article>
            <div>{/* TODO: Add delete button */}</div>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default CharacterItem
