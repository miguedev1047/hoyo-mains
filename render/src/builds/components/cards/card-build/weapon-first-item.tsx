'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { CharacterType } from '@/render/src/types'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import Tooltip from '@/render/src/shared/components/tooltip'

interface WeaponFirstItemProps {
  build: CharacterType
}

const WeaponFirstItem = ({ build }: WeaponFirstItemProps) => {
  const [firstWeapon] = build.weapons

  const {
    data: weapon,
    isLoading,
    error
  } = useFetch<Weapon>(`/api/weapons/weapon/${firstWeapon.item}`)

  if (isLoading) return <SkeletonCard variant='dark' className='p-4 h-20' />
  if (error) return <SkeletonCard variant='dark' className='p-4 h-20' />

  return (
    <Tooltip item={weapon}>
      <Card className='bg-color-dark p-2 md:p-4 flex flex-row items-center gap-2 md:gap-4 max-md:rounded-md'>
        <Figure size='sm' className='p-1'>
          <Image src={weapon?.imageUrl!} alt={weapon?.name} />
        </Figure>
        <h4 className='text-sm md:text-base font-medium line-clamp-1'>{weapon?.name}</h4>
      </Card>
    </Tooltip>
  )
}

export default WeaponFirstItem
