'use client'

import { ItemWeaponError } from '@/render/components/UI/errors/character-error'
import { fetcher } from '@/utils/helpers/fetcher'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon, WeaponByCharacter } from '@prisma/client'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'
import useSWR from 'swr'

const CharacterWeaponItem = ({
  weapon,
  index
}: {
  weapon: WeaponByCharacter
  index: number
}) => {
  const {
    data: dataWeapon,
    isLoading,
    error
  } = useSWR<Weapon>(`/api/weapons/weapon/${weapon.item}`, fetcher)

  if (error) return <ItemWeaponError message='Ha ocurrido un error.' />
  if (isLoading) return <SkeletonMaterialItems />

  return (
    <>
      <TooltipItem item={dataWeapon}>
        <Card className='p-5 bg-color-darkest'>
          <div className='flex gap-4 items-center select-none'>
            <div className='bg-color-dark w-8 h-8 grid place-items-center rounded-md'>
              <span>{index + 1}</span>
            </div>
            <figure className='flex-none relative w-10 h-10 p-1 bg-primary-color rounded-md overflow-hidden'>
              <Image
                radius='sm'
                className='w-full h-full rounded-md object-cover'
                src={dataWeapon?.imageUrl!}
                alt={dataWeapon?.name!}
              />
            </figure>
            <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
              {dataWeapon?.name}
            </h3>
          </div>
        </Card>
      </TooltipItem>
    </>
  )
}

export default CharacterWeaponItem
