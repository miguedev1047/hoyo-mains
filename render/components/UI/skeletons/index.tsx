import { skeletonWrapper } from '@/utils/classes'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/react'

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
