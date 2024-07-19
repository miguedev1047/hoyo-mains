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
      transparent: 'bg-transparent',
      default: 'bg-color-darkest',
      dark: 'bg-color-dark',
      darkest: 'bg-color-darkest'
    },
    size: {
      sm: 'size-10',
      md: 'size-12',
      lg: 'size-14',
      full: 'w-full h-full'
    },
    radius: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      none: 'rounded-none'
    },
    showDragIcon: {
      true: 'cursor-move'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    radius: 'xl'
  }
})

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof skeletonVariants> &
    CardProps
>(({ className, showDragIcon, radius, variant, size, ...props }, ref) => {
  return (
    <Card
      className={cn(
        skeletonVariants({ variant, radius }),
        `w-full h-full shadow-none ${className}`
      )}
      {...props}
      ref={ref}
    >
      <div className='flex items-center gap-4'>
        {showDragIcon && (
          <span className='max-md:hidden'>
            <IconGripVertical size={20} />
          </span>
        )}
        <Skeleton
          className={`${cn(skeletonVariants({ size }))} ${skeletonWrapper}`}
        />
        <div>
          <Skeleton className={`min-w-[150px] h-4 ${skeletonWrapper}`} />
        </div>
      </div>
    </Card>
  )
})

SkeletonCard.displayName = 'SkeletonCard'

const skeletonSquareVariants = cva(
  'size-full bg-color-darkest aspect-square select-none',
  {
    variants: {
      size: {
        sm: 'size-10',
        md: 'size-12',
        lg: 'size-14',
        xl: 'size-16',
        '2xl': 'size-20',
        '3xl': 'size-24',
        '4xl': 'size-32',
        square: 'w-[160px] h-[160px]',
        full: 'w-full h-full'
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        none: 'rounded-none'
      }
    },
    defaultVariants: {
      size: 'md',
      radius: 'xl'
    }
  }
)

const SkeletonSquare = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof skeletonSquareVariants> &
    CardProps
>(({ className, radius, size, ...props }, ref) => {
  return (
    <Card
      className={cn(skeletonSquareVariants({ radius }), className)}
      {...props}
      ref={ref}
    >
      <Skeleton
        className={`${cn(skeletonSquareVariants({ size }))} ${skeletonWrapper}`}
      />
    </Card>
  )
})

SkeletonSquare.displayName = 'SkeletonSquare'

export { SkeletonCard, SkeletonSquare }
