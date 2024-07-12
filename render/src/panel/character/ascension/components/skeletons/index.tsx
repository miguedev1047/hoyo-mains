import { skeletonWrapper } from '@/render/src/shared/utilities/classes'
import { Skeleton } from '@nextui-org/react'

export const ItemSkeleton = () => {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className={`size-10 ${skeletonWrapper}`} />
      <div>
        <Skeleton className={`min-w-[150px] h-4 ${skeletonWrapper}`} />
      </div>
    </div>
  )
}
