import { IconGripVertical } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { Material } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { MaterialItemType } from '@/render/src/types'
import Figure from '@/render/src/shared/components/figure'

const MaterialItem = ({
  material,
  index
}: {
  material: MaterialItemType
  index: number
}) => {
  const materialId = material.item

  const {
    data: dataMaterial,
    isLoading,
    error
  } = useFetch<Material>(`/api/materials/${materialId}`)

  if (error) return
  if (isLoading) return

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
              <Figure width='w-10' height='h-10'>
                <Image
                  src={dataMaterial?.imageUrl!}
                  alt={dataMaterial?.name!}
                  className='w-full h-full object-cover'
                />
              </Figure>
              <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
                {dataMaterial?.name}
              </h3>
            </div>

            {/* TODO: Add delete button here */}
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default MaterialItem
