'use client'

import React from 'react'
import { Card, CardProps } from '@nextui-org/card'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

const alertVariants = cva(
  'p-5 mb-4 border-[1px] relative w-full rounded-lg border p-4 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        success: 'text-success-500 bg-success-500/20 border-success-500/40',
        error: 'text-color-red bg-color-red/20 border-color-red/40',
        info: 'text-primary-500 bg-primary/20 border-primary-500/40',
        warning: 'text-warning-500 bg-warning-500/20 border-warning-500/40',
        default: 'text-primary-500 bg-primary/20 border-primary-500/40'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> &
    CardProps
>(({ className, variant, ...props }, ref) => {
  return (
    <Card
      className={cn(alertVariants({ variant }), className)}
      ref={ref}
      role='alert'
      {...props}
    />
  )
})

Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold leading-none tracking-tight', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
