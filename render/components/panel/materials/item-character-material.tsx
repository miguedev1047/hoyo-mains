import { Data } from '@/types'
import { IconGripVertical } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { fetcher } from '@/utils/helpers/fetcher'
import { Material } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { ItemMaterialError } from '@/render/components/UI/errors/character-error'
import ButtonDeleteMaterial from '@/render/components/UI/buttons/material/button-delete-material'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import useSWR from 'swr'

const ItemCharacterMaterial = ({
  material,
  index
}: {
  material: Data
  index: number
}) => {
  const {
    data: dataMaterial,
    isLoading,
    error
  } = useSWR<Material>(`/api/materials/${material.item}`, fetcher)

  if (error)
    return (
      <ItemMaterialError message='Ha ocurrido un error al cargar el material.' />
    )

  if (isLoading) return <SkeletonMaterialItems />

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
              <Image
                src={dataMaterial?.imageUrl!}
                alt={dataMaterial?.name!}
                classNames={{
                  wrapper: 'size-10 bg-primary-color rounded-md'
                }}
                className='size-10 rounded-md object-cover p-1'
              />
              <h3 className='text-lg font-semibold'>{dataMaterial?.name}</h3>
            </div>

            <ButtonDeleteMaterial material={material} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ItemCharacterMaterial
