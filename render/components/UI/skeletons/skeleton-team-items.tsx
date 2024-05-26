import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'

const SkeletonTeamItems = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest mb-4'>
      <div>
        <Skeleton className='min-w-48 w-full h-5 dark:bg-primary-color rounded-md' />
      </div>
    </Card>
  )
}

export default SkeletonTeamItems
