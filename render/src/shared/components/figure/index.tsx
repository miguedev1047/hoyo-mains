import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

const figureVariants = cva(
  'overflow-hidden relative bg-primary-color',
  {
    variants: {
      size: {
        sm: 'size-10 grid place-content-center',
        md: 'size-12 grid place-content-center',
        lg: 'size-14 grid place-content-center',
        xl: 'size-16 grid place-content-center',
        '2xl': 'size-20 grid place-content-center',
        '3xl': 'size-24 grid place-content-center',
        '4xl': 'size-32 grid place-content-center',
        square: 'w-[160px] h-[160px]',
        full: 'w-full h-full'
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      size: 'md',
      radius: 'lg'
    }
  }
)

const Figure = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof figureVariants>
>(({ className, size, radius, ...props }, ref) => {
  return (
    <figure
      className={cn(figureVariants({ size, radius }), className)}
      {...props}
      ref={ref}
    />
  )
})

Figure.displayName = 'Figure'

export { Figure }
