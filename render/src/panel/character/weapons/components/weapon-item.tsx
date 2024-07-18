import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { Weapon } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { WeaponItemType } from '@/render/src/types'
import { Figure } from '@/render/src/shared/components/figure'
import { deleteWeapon } from '@/render/src/panel/character/weapons/utilities/services/delete'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import DeleteButton from '@/render/src/panel/shared/components/buttons/delete-button'

interface WeaponItemProps {
  weapon: WeaponItemType
  index: number
}

const WeaponItem = ({ weapon, index }: WeaponItemProps) => {
  const weaponId = weapon.item

  const {
    data: fetchedWeapon,
    isLoading,
    error
  } = useFetch<Weapon>(`/api/weapons/weapon/${weaponId}`)

  if (error) return <SkeletonCard showDragIcon size='sm' className='mb-4' />
  if (isLoading) return <SkeletonCard showDragIcon size='sm' className='mb-4' />

  return (
    <Draggable draggableId={weapon.id} index={index}>
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
                  src={fetchedWeapon?.imageUrl!}
                  alt={fetchedWeapon?.name!}
                  className='w-full h-full object-cover'
                />
              </Figure>
              <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
                {fetchedWeapon?.name}
              </h3>
            </div>

            <DeleteButton id={weapon.id} onCallback={deleteWeapon}>
              <IconTrash />
            </DeleteButton>
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default WeaponItem
