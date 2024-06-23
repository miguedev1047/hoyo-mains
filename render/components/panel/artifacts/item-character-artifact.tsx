import { IconGripVertical } from '@tabler/icons-react'
import { fetcher } from '@/utils/helpers/fetcher'
import { Artifact } from '@prisma/client'
import { ItemArtifactError } from '@/render/components/UI/errors/character-error'
import { Draggable } from '@hello-pangea/dnd'
import { Characters, Data } from '@/types'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import ButtonDeleteArtifact from '@/render/components/UI/buttons/artifact/button-delete-artifact'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
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

  if (error)
    return (
      <ItemArtifactError message='Ha ocurrido un error al cargar el artefacto.' />
    )

  if (isLoading) return <SkeletonMaterialItems />

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
              <Image
                src={dataArtifact?.imageUrl!}
                alt={dataArtifact?.name!}
                classNames={{
                  wrapper: 'size-10 bg-primary-color rounded-md'
                }}
                className='size-10 rounded-md object-cover p-1'
              />
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
