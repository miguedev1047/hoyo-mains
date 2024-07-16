import React from 'react'
import { skeletonWrapper } from '@/render/src/shared/utilities/classes'
import { Skeleton } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'
import { Card, CardProps } from '@nextui-org/card'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

const skeletonVariants = cva('flex flex-row items-center justify-between p-5', {
  variants: {
    variant: {
      default: 'bg-color-darkest',
      dark: 'bg-color-dark',
      darkest: 'bg-color-darkest'
    },
    size: {
      sm: 'size-10',
      md: 'size-12',
      lg: 'size-14'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof skeletonVariants> &
    CardProps
>(({ className, variant, ...props }, ref) => {
  return (
    <Card
      className={cn(
        skeletonVariants({ variant }),
        `w-full h-full max-w-[388px] max-h-[88px] ${className}`
      )}
      {...props}
      ref={ref}
    >
      <div className='flex items-center gap-4'>
        <span className='max-md:hidden'>
          <IconGripVertical size={20} />
        </span>
        <Skeleton
          className={`${cn(
            skeletonVariants({ size: 'md' })
          )} ${skeletonWrapper}`}
        />
        <div>
          <Skeleton className={`min-w-[150px] h-4 ${skeletonWrapper}`} />
        </div>
      </div>
    </Card>
  )
})

SkeletonCard.displayName = 'SkeletonCard'

export { SkeletonCard }
