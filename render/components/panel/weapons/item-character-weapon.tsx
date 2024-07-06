import { CharacterTypes, Data } from '@/types'
import { IconGripVertical } from '@tabler/icons-react'
import { Draggable } from '@hello-pangea/dnd'
import { fetcher } from '@/utils/helpers/fetcher'
import { Weapon } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { PanelErrorItem } from '@/render/components/UI/errors'
import { PanelSkeletonItem } from '@/render/components/UI/skeletons'
import ButtonDeleteWeapon from '@/render/components/UI/buttons/weapon/button-delete-weapon'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

const ItemCharacterWeapon = ({
  weapon,
  character,
  index
}: {
  weapon: Data
  character: CharacterTypes | undefined
  index: number
}) => {
  const {
    data: dataWeapon,
    isLoading,
    error
  } = useSWR<Weapon>(`/api/weapons/weapon/${weapon.item}`, fetcher)

  if (error) return <PanelErrorItem />
  if (isLoading) return <PanelSkeletonItem />

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
              <Figure width='w-10' height='h-10'>
                <Image
                  radius='sm'
                  className='w-full h-full object-cover'
                  src={dataWeapon?.imageUrl!}
                  alt={dataWeapon?.name!}
                />
              </Figure>
              <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
                {dataWeapon?.name}
              </h3>
            </div>

            <ButtonDeleteWeapon character={character} weapon={weapon} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ItemCharacterWeapon
