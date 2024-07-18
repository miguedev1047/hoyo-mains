'use client'

import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { Artifact } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { WeaponItemType } from '@/render/src/types'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { deleteArtifact } from '@/render/src/panel/character/artifacts/utilities/services/delete'
import { Figure } from '@/render/src/shared/components/figure'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'

interface ArtifactItemProps {
  artifact: WeaponItemType
  index: number
}

const ArtifactItem = ({ artifact, index }: ArtifactItemProps) => {
  const artifactId = artifact.item

  const {
    data: fetchedArtifact,
    isLoading,
    error
  } = useFetch<Artifact>(`/api/artifacts/artifact/${artifactId}`)

  if (error) return <SkeletonCard showDragIcon size='sm' className='mb-4' />
  if (isLoading) return <SkeletonCard showDragIcon size='sm' className='mb-4' />

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
              <Figure size='sm'>
                <Image
                  src={fetchedArtifact?.imageUrl!}
                  alt={fetchedArtifact?.name!}
                  className='w-full h-full object-cover'
                />
              </Figure>
              <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
                {fetchedArtifact?.name}
              </h3>
            </div>

            <DeleteButton id={artifact.id} onCallback={deleteArtifact}>
              <IconTrash />
            </DeleteButton>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ArtifactItem
