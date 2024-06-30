import { MaterialByAscension } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { Badge, Image } from '@nextui-org/react'
import { Material } from '@prisma/client'
import { HomeSkeletonTableItem } from '@/render/components/UI/skeletons'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

const CharacterAscensionMaterialItem = ({
  material
}: {
  material: MaterialByAscension
}) => {
  const {
    data: dataMaterial,
    isLoading,
    error
  } = useSWR<Material>(`/api/materials/${material.materialId}`, fetcher)

  if (isLoading) return <HomeSkeletonTableItem />
  if (error) return null

  return (
    <div className='flex items-center gap-2'>
      <Badge placement='top-left' content={material.quantity}>
        <Figure width='w-10' height='w-10'>
          <Image
            radius='sm'
            className='w-full h-full object-cover'
            src={dataMaterial?.imageUrl!}
            alt={dataMaterial?.name}
          />
        </Figure>
      </Badge>
      <h3 className='text-xs line-clamp-1'>{dataMaterial?.name}</h3>
    </div>
  )
}

export default CharacterAscensionMaterialItem
