'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Card, Image } from '@nextui-org/react'
import { Material, MaterialsByCharacter } from '@prisma/client'
import Tooltip from '@/render/src/shared/components/tooltip'

interface MaterialItemProps {
  material: MaterialsByCharacter
}

const MaterialItem = ({ material }: MaterialItemProps) => {
  const {
    data: fetchedMaterial,
    isLoading,
    error
  } = useFetch<Material>(`/api/materials/material/${material.item}`)

  if (error) return <SkeletonCard size='sm' />
  if (isLoading) return <SkeletonCard size='sm' />

  return (
    <>
      <Tooltip item={fetchedMaterial}>
        <Card className='p-5 bg-color-darkest'>
          <div className='flex gap-4 items-center select-none'>
            <Figure size='sm'>
              <Image
                className='w-full h-full object-cover'
                src={fetchedMaterial?.imageUrl!}
                alt={fetchedMaterial?.name!}
              />
            </Figure>
            <h3 className='text-xs md:text-base font-semibold line-clamp-1'>
              {fetchedMaterial?.name}
            </h3>
          </div>
        </Card>
      </Tooltip>
    </>
  )
}

export default MaterialItem
