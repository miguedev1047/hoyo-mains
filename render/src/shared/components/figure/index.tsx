import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

const figureVariants = cva(
  'overflow-hidden relative grid place-content-center bg-primary-color',
  {
    variants: {
      size: {
        sm: 'size-10',
        md: 'size-12',
        lg: 'size-14',
        xl: 'size-16',
        '2xl': 'size-20',
        '3xl': 'size-24'
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      size: 'md',
      radius: 'md'
    }
  }
)

const Figure = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof figureVariants>
>(({ className, size, ...props }, ref) => {
  return (
    <figure
      className={cn(figureVariants({ size: 'md', radius: 'lg' }), className)}
      {...props}
      ref={ref}
    />
  )
})

Figure.displayName = 'Figure'

export { Figure }
