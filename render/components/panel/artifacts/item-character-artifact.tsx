import { IconGripVertical } from '@tabler/icons-react'
import { fetcher } from '@/utils/helpers/fetcher'
import { Artifact } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'
import { Characters, Data } from '@/types'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { PanelSkeletonItem } from '@/render/components/UI/skeletons'
import { PanelErrorItem } from '@/render/components/UI/errors'
import ButtonDeleteArtifact from '@/render/components/UI/buttons/artifact/button-delete-artifact'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

const ItemCharacterArtifact = ({
  artifact,
  character,
  index
}: {
  artifact: Data
  character: Characters | undefined
  index: number
}) => {
  const {
    data: dataArtifact,
    isLoading,
    error
  } = useSWR<Artifact>(`/api/artifacts/artifact/${artifact.item}`, fetcher)

  if (error) return <PanelErrorItem />
  if (isLoading) return <PanelSkeletonItem />

  return (
    <Draggable draggableId={artifact.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mb-4'
        >
          <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest'>
            <div className='flex gap-4 items-center select-none'>
              <IconGripVertical size={20} />
              <Figure width='w-10' height='h-10'>
                <Image
                  src={dataArtifact?.imageUrl!}
                  alt={dataArtifact?.name!}
                  className='w-full h-full object-cover'
                />
              </Figure>
              <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
                {dataArtifact?.name}
              </h3>
            </div>

            <ButtonDeleteArtifact character={character} artifact={artifact} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ItemCharacterArtifact
