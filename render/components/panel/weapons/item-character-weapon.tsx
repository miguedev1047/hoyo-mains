import { Data } from '@/types'
import { IconGripVertical } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { fetcher } from '@/utils/helpers/fetcher'
import { Weapon } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { CharacterMaterialItemError } from '@/render/components/UI/errors/character-error'
import ButtonDeleteWeapon from '@/render/components/UI/buttons/weapon/button-delete-weapon'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import useSWR from 'swr'

const ItemCharacterWeapon = ({
  weapon,
  index
}: {
  weapon: Data
  index: number
}) => {
  const {
    data: dataWeapon,
    isLoading,
    error
  } = useSWR<Weapon>(`/api/weapons/weapon/${weapon.item}`, fetcher)

  if (error)
    return (
      <CharacterMaterialItemError message='Ha ocurrido un error al cargar el arma.' />
    )

  if (isLoading) return <SkeletonMaterialItems />

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
            <div className='flex gap-4  select-none'>
              <div className='flex gap-7 items-center'>
                <IconGripVertical size={20} />
                <Image
                  width={32}
                  height={32}
                  src={dataWeapon?.imageUrl!}
                  alt={dataWeapon?.name!}
                  className='w-8 h-8 rounded-full'
                />
              </div>
              <h3 className='text-lg font-semibold'>{dataWeapon?.name}</h3>
            </div>

            <ButtonDeleteWeapon weapon={weapon} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ItemCharacterWeapon
