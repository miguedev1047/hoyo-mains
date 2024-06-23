import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'

const SkeletonMaterialItems = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest mb-4'>
      <div className='flex items-end gap-4'>
        <div className='flex items-center gap-7'>
          <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
        </div>
        <div>
          <Skeleton className='min-w-48 w-full h-5 dark:bg-primary-color rounded-md' />
        </div>
      </div>
    </Card>
  )
}

export default SkeletonMaterialItems
