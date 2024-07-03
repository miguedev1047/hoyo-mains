import { skeletonWrapper } from '@/utils/classes'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'

export const HomeSkeletonCharacters = () => {
  const skeletonArray = Array.from({ length: 70 }, (_, i) => i)
  return (
    <ul className='relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 overflow-hidden gap-4 select-none'>
      {skeletonArray.map((index) => (
        <li key={index} className='space-y-2'>
          <Card>
            <Skeleton className={`aspect-square ${skeletonWrapper}`} />
          </Card>
          <Card>
            <Skeleton className={`h-10 ${skeletonWrapper}`} />
          </Card>
        </li>
      ))}
    </ul>
  )
}

export const HomeSkeletonTableItem = () => {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
      <div>
        <Skeleton className='min-w-[150px] w-full h-5 dark:bg-primary-color rounded-md' />
      </div>
    </div>
  )
}

export const HomeSkeletonItem = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest mb-2'>
      <div className='flex items-center gap-4'>
        <div className='bg-color-dark w-8 h-8 grid place-items-center rounded-md'>
          <Skeleton className='w-full h-full dark:bg-color-dark rounded-md' />
        </div>
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

export const HomeSkeletonCharacterTeam = () => {
  return (
    <Card>
      <Skeleton className={`aspect-square ${skeletonWrapper}`} />
    </Card>
  )
}

export const BuildSkeletonItem = () => {
  return (
    <Card className='bg-color-darkest p-2 rounded-md'>
      <div className='flex items-center gap-3'>
        <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
        <div>
          <Skeleton className='min-w-[150px] w-full h-5 dark:bg-primary-color rounded-md' />
        </div>
      </div>
    </Card>
  )
}

export const PanelSkeletonTeamCharacters = () => {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
      <div>
        <Skeleton className='min-w-[150px] w-full h-5 dark:bg-primary-color rounded-md' />
      </div>
    </div>
  )
}

export const PanelSkeletonTableItem = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-2 p-5 bg-color-dark max-xl:mb-4 mx-2'>
      <div className='flex items-center gap-4'>
        <IconGripVertical size={20} />
        <div className='flex items-center gap-2'>
          <Skeleton className='size-10 dark:bg-primary-color rounded-md' />
        </div>
        <div>
          <Skeleton className='min-w-32 w-full h-5 dark:bg-primary-color rounded-md' />
        </div>
      </div>
    </Card>
  )
}

export const PanelSkeletonItem = () => {
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest mb-4'>
      <div className='flex items-center gap-4'>
        <IconGripVertical size={20} />
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
