import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'

const SkeletonTeamCharacters = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-2 p-5 bg-color-dark mx-2'>
      <div className='flex items-end gap-4'>
        <div className='flex items-center gap-2'>
          <IconGripVertical size={20} />
          <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
        </div>
        <div>
          <Skeleton className='min-w-32 w-full h-5 dark:bg-primary-color rounded-md' />
        </div>
      </div>
    </Card>
  )
}

export default SkeletonTeamCharacters
