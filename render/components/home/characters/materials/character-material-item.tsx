'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Material, MaterialsByCharacter } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { HomeSkeletonItem } from '@/render/components/UI/skeletons'
import { HomeErrorItem } from '@/render/components/UI/errors'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

const CharacterMaterialItem = ({
  material
}: {
  material: MaterialsByCharacter
}) => {
  const {
    data: dataMaterial,
    isLoading,
    error
  } = useSWR<Material>(`/api/materials/${material.item}`, fetcher)

  if (error) return <HomeErrorItem />
  if (isLoading) return <HomeSkeletonItem />

  return (
    <TooltipItem item={dataMaterial}>
      <Card className='p-5 bg-color-darkest'>
        <div className='flex gap-4 items-center select-none'>
          <Figure width='w-10' height='h-10'>
            <Image
              radius='sm'
              className='w-full h-full rounded-md object-cover'
              src={dataMaterial?.imageUrl!}
              alt={dataMaterial?.name!}
            />
          </Figure>
          <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
            {dataMaterial?.name}
          </h3>
        </div>
      </Card>
    </TooltipItem>
  )
}

export default CharacterMaterialItem
