import { skeletonWrapper } from '@/render/src/shared/utilities/classes'
import { Card, Skeleton } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'

export const ItemSkeleton = () => {
  return (
    <Card className='flex flex-row items-center justify-between p-5 bg-color-dark mb-4 lg:mx-2'>
      <div className='flex items-center gap-4'>
        <span className='max-md:hidden'>
          <IconGripVertical size={20} />
        </span>
        <Skeleton className={`size-12 ${skeletonWrapper}`} />
        <div>
          <Skeleton className={`min-w-[150px] h-4 ${skeletonWrapper}`} />
        </div>
      </div>
    </Card>
  )
}
