import { Skeleton } from '@nextui-org/react'

const SkeletonTableMaterial = () => {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
      <div>
        <Skeleton className='min-w-[150px] w-full h-5 dark:bg-primary-color rounded-md' />
      </div>
    </div>
  )
}

export default SkeletonTableMaterial
