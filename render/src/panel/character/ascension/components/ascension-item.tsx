import {
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image
} from '@nextui-org/react'
import { Material, MaterialByAscension } from '@prisma/client'
import { ItemSkeleton } from '@/render/src/panel/character/ascension/components/skeletons'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Figure } from '@/render/src/shared/components/figure'
import QuantityForm from '@/render/src/panel/character/ascension/components/forms/quantity-form'

interface AscensionProps {
  material: MaterialByAscension
}

const AscensionItem = ({ material }: AscensionProps) => {
  const {
    data: fetchedMaterialData,
    isLoading,
    error
  } = useFetch<Material>(`/api/materials/${material.materialId}`)

  if (isLoading) return <ItemSkeleton />
  if (error) return <ItemSkeleton />

  return (
    <Popover placement='bottom'>
      <PopoverTrigger>
        <div className='flex items-center gap-2 cursor-pointer'>
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
      </PopoverTrigger>
      <PopoverContent className='bg-color-dark p-3'>
        <QuantityForm material={material} />
      </PopoverContent>
    </Popover>
  )
}

export default AscensionItem
