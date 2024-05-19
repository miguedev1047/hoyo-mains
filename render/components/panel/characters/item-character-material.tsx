import { Data } from '@/types'
import { IconGripVertical } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { fetcher } from '@/utils/helpers/fetcher'
import { Material } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import ButtonDeleteMaterial from '@/render/components/UI/buttons/material/button-delete-material'
import useSWR from 'swr'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import { CharacterMaterialItemError } from '@/render/components/UI/errors/character-error'

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
      <CharacterMaterialItemError message='Ha ocurrido un error al cargar el material.' />
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
            <div className='flex gap-4  select-none'>
              <div className='flex gap-7 items-center'>
                <IconGripVertical size={20} />
                <Image
                  width={32}
                  height={32}
                  src={dataMaterial?.imageUrl!}
                  alt={dataMaterial?.name!}
                  className='w-8 h-8 rounded-full'
                />
              </div>
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
