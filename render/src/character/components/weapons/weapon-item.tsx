'use client'

import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon, WeaponByCharacter } from '@prisma/client'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import Tooltip from '@/render/src/shared/components/tooltip'

interface WeaponItemProps {
  weapon: WeaponByCharacter
  index: number
}

const WeaponItem = ({ weapon, index }: WeaponItemProps) => {
  const {
    data: fetchedWeapon,
    isLoading,
    error
  } = useFetch<Weapon>(`/api/weapons/weapon/${weapon.item}`)

  if (error) return <SkeletonCard size='sm' />
  if (isLoading) return <SkeletonCard size='sm' />

  return (
    <>
      <Tooltip item={fetchedWeapon}>
        <Card className='p-5 bg-color-darkest'>
          <div className='flex gap-4 items-center select-none'>
            <div className='size-8 bg-color-dark grid place-items-center rounded-md'>
              <span>{index + 1}</span>
            </div>
            <Figure size='sm'>
              <Image
                className='w-full h-full object-cover'
                src={fetchedWeapon?.imageUrl!}
                alt={fetchedWeapon?.name!}
              />
            </Figure>
            <h3 className='text-xs md:text-base font-semibold line-clamp-1'>
              {fetchedWeapon?.name}
            </h3>
          </div>
        </Card>
      </Tooltip>
    </>
  )
}

export default WeaponItem
