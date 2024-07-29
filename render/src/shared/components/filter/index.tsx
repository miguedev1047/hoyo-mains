import { cn } from '@/libs/utils'
import { Card, CardProps } from '@nextui-org/card'
import React from 'react'

const Filter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div className={cn('w-full max-lg:mt-3', className)} ref={ref} {...props} />
  )
})
Filter.displayName = 'Filter'

const FilterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardProps
>(({ className, ...props }, ref) => {
  return (
    <Card
      className={cn(
        'bg-default-50 p-1 md:p-4 grid grid-cols-1 lg:grid-cols-3 gap-2 max-md:rounded-md',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
FilterContent.displayName = 'FilterContent'

const FilterItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn('w-full flex flex-wrap justify-center gap-2', className)}
      ref={ref}
      {...props}
    />
  )
})
FilterItem.displayName = 'FilterItem'

export { Filter, FilterContent, FilterItem }
