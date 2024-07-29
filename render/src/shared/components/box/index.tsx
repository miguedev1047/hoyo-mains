import { cn } from '@/libs/utils'
import { Card, CardBody, CardHeader, CardProps } from '@nextui-org/card'
import React from 'react'

const BoxCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardProps
>(({ className, ...props }, ref) => {
  return (
    <Card
      className={cn('bg-default-50 max-md:rounded-md px-2 md:px-4 py-4 space-y-4', className)}
      ref={ref}
      {...props}
    />
  )
})
BoxCard.displayName = 'BoxCard'

const BoxCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & CardProps
>(({ className, children, ...props }, ref) => {
  return (
    <CardHeader className='p-0' ref={ref} {...props}>
      <div
        className={cn(
          'w-full flex flex-wrap gap-4 justify-between items-center',
          className
        )}
      >
        {children}
      </div>
    </CardHeader>
  )
})
BoxCardHeader.displayName = 'HomeBoxHeader'

const BoxCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn('text-base md:text-2xl capitalize font-bold', className)}
      ref={ref}
      {...props}
    />
  )
})
BoxCardTitle.displayName = 'BoxCardTitle'

const BoxCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardProps
>(({ className, ...props }, ref) => {
  return (
    <CardBody className={cn('p-0', className)} ref={ref} {...props} />
  )
})
BoxCardBody.displayName = 'BoxCardBody'

const BoxCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardProps
>(({ className, ...props }, ref) => {
  return (
    <CardBody className={cn('p-0', className)} ref={ref} {...props} />
  )
})
BoxCardFooter.displayName = 'BoxCardFooter'

export { BoxCard, BoxCardHeader, BoxCardTitle, BoxCardBody, BoxCardFooter }
