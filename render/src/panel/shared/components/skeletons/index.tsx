import { skeletonWrapper } from '@/render/src/shared/utilities/classes'
import { Card, Skeleton } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'

export const ItemSkeleton = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest mb-4'>
      <div className='flex items-center gap-4'>
        <IconGripVertical size={20} />
        <Skeleton className={`size-10 ${skeletonWrapper}`} />
        <div>
          <Skeleton className={`min-w-[150px] h-4 ${skeletonWrapper}`} />
        </div>
      </div>
    </Card>
  )
}
