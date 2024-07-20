'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon, WeaponByCharacter } from '@prisma/client'
import React from 'react'

interface WeaponItemProps {
  weapon: WeaponByCharacter
}

const WeaponItem = ({ weapon }: WeaponItemProps) => {
  const {
    data: fetchedWeapon,
    isLoading,
    error
  } = useFetch<Weapon>(`/api/weapons/weapon/${weapon.item}`)

  if (error) return <SkeletonCard variant='dark' className='p-4 h-20' />
  if (isLoading) return <SkeletonCard variant='dark' className='p-4 h-20' />

  return (
    <Card className='bg-color-dark p-4 flex flex-row items-center gap-4'>
      <Figure>
        <Image src={fetchedWeapon?.imageUrl!} alt={fetchedWeapon?.name} />
      </Figure>

      <h2 className='font-semibold line-clamp-1'>{fetchedWeapon?.name}</h2>
    </Card>
  )
}

export default WeaponItem
