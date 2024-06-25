'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { ItemMaterialError } from '@/render/components/UI/errors/character-error'
import { Material, MaterialsByCharacter } from '@prisma/client'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import useSWR from 'swr'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'

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

  if (error) return <ItemMaterialError message='Ha ocurrido un error.' />
  if (isLoading) return <SkeletonMaterialItems />

  return (
    <TooltipItem item={dataMaterial}>
      <Card className='p-5 bg-color-darkest'>
        <div className='flex gap-4 items-center select-none'>
          <figure className='flex-none relative w-10 h-10 p-1 bg-primary-color rounded-md overflow-hidden'>
            <Image
              radius='sm'
              className='w-full h-full rounded-md object-cover'
              src={dataMaterial?.imageUrl!}
              alt={dataMaterial?.name!}
            />
          </figure>
          <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
            {dataMaterial?.name}
          </h3>
        </div>
      </Card>
    </TooltipItem>
  )
}

export default CharacterMaterialItem
