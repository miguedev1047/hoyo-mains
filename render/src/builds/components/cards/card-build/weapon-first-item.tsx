'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { CharacterType } from '@/render/src/types'
import { useFetch } from '@/utils/hooks/general/use-fetch'
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
      <Card className='bg-color-dark p-4 flex flex-row items-center gap-4'>
        <Figure>
          <Image src={weapon?.imageUrl!} alt={weapon?.name} />
        </Figure>
        <h4 className='font-medium line-clamp-1'>{weapon?.name}</h4>
      </Card>
    </Tooltip>
  )
}

export default WeaponFirstItem
