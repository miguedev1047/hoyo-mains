import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { Material } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { deleteMaterial } from '@/render/src/panel/character/materials/utilities/services/delete'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { MaterialItemType } from '@/render/src/types'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { Figure } from '@/render/src/shared/components/figure'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'

interface MaterialItemProps {
  material: MaterialItemType
  index: number
}

const MaterialItem = ({ material, index }: MaterialItemProps) => {
  const materialId = material.item

  const {
    data: fetchedMaterial,
    isLoading,
    error
  } = useFetch<Material>(`/api/materials/${materialId}`)

  if (error) return <SkeletonCard showDragIcon size='sm' className='mb-4' />
  if (isLoading) return <SkeletonCard showDragIcon size='sm' className='mb-4' />

  return (
    <Draggable draggableId={material.id} index={index}>
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
                  src={fetchedMaterial?.imageUrl!}
                  alt={fetchedMaterial?.name!}
                  className='w-full h-full object-cover'
                />
              </Figure>
              <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
                {fetchedMaterial?.name}
              </h3>
            </div>

            <DeleteButton id={material.id} onCallback={deleteMaterial}>
              <IconTrash />
            </DeleteButton>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default MaterialItem
