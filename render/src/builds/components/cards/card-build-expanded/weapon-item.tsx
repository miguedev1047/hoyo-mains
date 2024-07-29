'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { Card } from '@nextui-org/card'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Image } from '@nextui-org/react'
import { Weapon, WeaponByCharacter } from '@prisma/client'
import Tooltip from '@/render/src/shared/components/tooltip'

interface WeaponItemProps {
  weapon: WeaponByCharacter
}

const WeaponItem = ({ weapon }: WeaponItemProps) => {
  const {
    data: fetchedWeapon,
    isLoading,
    error
  } = useFetch<Weapon>(`/api/weapons/weapon/${weapon.item}`)

  if (isLoading) return <SkeletonCard variant='dark' className='p-2 md:p-4 h-20 max-md:rounded-md' />
  if (error) return <SkeletonCard variant='dark' className='p-2 md:p-4 h-20 max-md:rounded-md' />

  return (
    <Tooltip item={fetchedWeapon}>
      <Card className='bg-color-dark p-2 md:p-4 flex flex-row items-center gap-2 md:gap-4 max-md:rounded-md'>
        <Figure size='sm' className='p-1'>
          <Image src={fetchedWeapon?.imageUrl!} alt={fetchedWeapon?.name} />
        </Figure>
        <h4 className='text-sm md:text-base font-medium line-clamp-1'>{fetchedWeapon?.name}</h4>
      </Card>
    </Tooltip>
  )
}

export default WeaponItem
