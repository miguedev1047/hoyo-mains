import React from 'react'
import { cn } from '@/libs/utils'

const NotFound = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full h-full max-h-[calc(100vh_-_16rem)] grid place-items-center ',
      className
    )}
    {...props}
  />
))
NotFound.displayName = 'NotFoundPanel'

const NotFoundTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'font-extrabold text-2xl md:text-4xl text-color-light/75',
      className
    )}
    {...props}
  />
))
NotFoundTitle.displayName = 'AlertTitle'

export { NotFound, NotFoundTitle }
