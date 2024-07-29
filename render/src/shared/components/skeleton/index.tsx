import React from 'react'
import { skeletonWrapper } from '@/render/src/shared/utilities/classes'
import { Skeleton } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'
import { Card, CardProps } from '@nextui-org/card'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

const skeletonVariants = cva('w-full p-2 md:p-5 max-md:rounded-md shadow-none', {
  variants: {
    variant: {
      transparent: 'bg-transparent !p-0 !rounded-none shadow-none',
      default: 'bg-color-darkest',
      dark: 'bg-color-dark',
      darkest: 'bg-color-darkest'
    },
    size: {
      sm: true,
      md: true,
      lg: true
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
  const getSizes = () => {
    if (size === 'sm') return 'size-10'
    if (size === 'md') return 'size-12'
    if (size === 'lg') return 'size-14'

    return 'size-12'
  }

  return (
    <Card
      className={cn(skeletonVariants({ variant, radius }), className)}
      {...props}
      ref={ref}
    >
      <div className='w-full flex items-center md:gap-2 gap-4'>
        {showDragIcon && (
          <span className='max-md:hidden'>
            <IconGripVertical size={20} />
          </span>
        )}

        <div>
          <Skeleton className={`${getSizes()} ${skeletonWrapper}`} />
        </div>

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
