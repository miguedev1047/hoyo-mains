import { Characters, Data } from '@/types'
import { IconGripVertical } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { fetcher } from '@/utils/helpers/fetcher'
import { Material } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { ItemMaterialError } from '@/render/components/UI/errors/character-error'
import ButtonDeleteMaterial from '@/render/components/UI/buttons/material/button-delete-material'
import Figure from '@/render/components/UI/misc/figure'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import useSWR from 'swr'

const ItemCharacterMaterial = ({
  material,
  character,
  index
}: {
  material: Data
  character: Characters | undefined
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

            <ButtonDeleteMaterial character={character} material={material} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ItemCharacterMaterial
