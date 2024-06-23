import SkeletonTableMaterial from '@/render/components/UI/skeletons/skeleton-table-material'
import { MaterialByAscension } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { Badge, Image } from '@nextui-org/react'
import { Material } from '@prisma/client'
import useSWR from 'swr'

const ItemAscensionMaterial = ({
  material
}: {
  material: MaterialByAscension
}) => {
  const {
    data: dataMaterial,
    isLoading,
    error
  } = useSWR<Material>(`/api/materials/${material.materialId}`, fetcher)

  if (isLoading) return <SkeletonTableMaterial />
  if (error) return null

  return (
    <div className='flex items-center gap-2 cursor-pointer'>
      <Badge placement='top-left' content={material.quantity}>
        <figure className='w-10 h-10 bg-primary-color p-1 rounded-md flex-none relative'>
          <Image
            radius='sm'
            className='w-full h-full object-cover'
            src={dataMaterial?.imageUrl!}
            alt={dataMaterial?.name}
          />
        </figure>
      </Badge>
      <h3 className='text-xs line-clamp-1'>{dataMaterial?.name}</h3>
    </div>
  )
}

export default ItemAscensionMaterial
