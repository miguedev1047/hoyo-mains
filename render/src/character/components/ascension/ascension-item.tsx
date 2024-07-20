import { Badge, Image } from '@nextui-org/react'
import { Material, MaterialByAscension } from '@prisma/client'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'

interface AscensionProps {
  material: MaterialByAscension
}

const AscensionItem = ({ material }: AscensionProps) => {
  const {
    data: fetchedMaterialData,
    isLoading,
    error
  } = useFetch<Material>(`/api/materials/${material.materialId}`)

  if (isLoading)
    return (
      <SkeletonCard
        size='sm'
        variant='transparent'
        radius='none'
        className='p-0'
      />
    )
  if (error)
    return (
      <SkeletonCard
        size='sm'
        variant='transparent'
        radius='none'
        className='p-0'
      />
    )

  return (
    <div className='flex items-center gap-2'>
      <Badge placement='top-left' content={material.quantity}>
        <Figure size='sm'>
          <Image
            radius='sm'
            className='w-full h-full object-cover'
            src={fetchedMaterialData?.imageUrl!}
            alt={fetchedMaterialData?.name}
          />
        </Figure>
      </Badge>
      <h3 className='text-xs line-clamp-1'>{fetchedMaterialData?.name}</h3>
    </div>
  )
}

export default AscensionItem
