import React from 'react'
import {
  Button as PrimitiveTrigger,
  ButtonProps as PrimitivieTriggerProps,
  Modal as PrimitiveSheet,
  ModalBody as PrimitiveBody,
  ModalContent as PrimitivieContent,
  ModalHeader as PrimitiveHeader,
  ModalProps as PrimitiveProps,
  ModalFooter as PrimitiveFooter
} from '@nextui-org/react'
import { cva } from 'class-variance-authority'
import { cn } from '@/libs/utils'
import { IconPlus } from '@tabler/icons-react'
import { SheetAnimations } from '@/render/src/shared/components/sheet/logic'

const Sheet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PrimitiveProps
>(({ ...props }, ref) => {
  return <div {...props} ref={ref} />
})
Sheet.displayName = 'Sheet'

interface SheetTriggerProps extends PrimitivieTriggerProps {
  isVisible?: boolean
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & SheetTriggerProps
>(({ className, isVisible = false, ...props }, ref) => {
  if (isVisible) return null

  return (
    <PrimitiveTrigger
      color='success'
      size='lg'
      startContent={<IconPlus />}
      className='bg-color-light font-bold'
      ref={ref}
      {...props}
    />
  )
})
SheetTrigger.displayName = 'SheetTrigger'

const sheetVariants = cva('fixed z-50 gap-4 bg-default-50 p-6 shadow-lg', {
  variants: {
    side: {
      top: 'inset-x-0 top-0 max-h-[440px]',
      bottom: 'inset-x-0 bottom-0 max-h-[440px]',
      left: 'inset-y-0 left-0 h-full w-[480px]',
      right: 'inset-y-0 right-0 h-full w-[480px]'
    }
  },
  defaultVariants: {
    side: 'right'
  }
})

interface SheetContentProps extends PrimitiveProps {
  side?: 'left' | 'right' | 'top' | 'bottom'
}

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SheetContentProps
>(
  (
    {
      className,
      classNames,
      side = 'right',
      isOpen,
      children,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const animations = SheetAnimations({ side })

    return (
      <PrimitiveSheet
        size='full'
        onOpenChange={onOpenChange}
        className={cn(sheetVariants({ side }), className)}
        classNames={classNames}
        motionProps={animations}
        isOpen={isOpen}
        ref={ref}
        {...props}
      >
        <PrimitivieContent>{() => children}</PrimitivieContent>
      </PrimitiveSheet>
    )
  }
)
SheetContent.displayName = 'SheetContent'

const SheetHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLDivElement> & PrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <PrimitiveHeader
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left p-0',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
SheetHeader.displayName = 'SheetHeader'

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn('text-xl text-balance font-bold', className)}
      ref={ref}
      {...props}
    />
  )
})
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn('text-base text-pretty font-light', className)}
      ref={ref}
      {...props}
    />
  )
})
SheetDescription.displayName = 'SheetDescription'

const SheetBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <PrimitiveBody
      className={cn('space-y-2 p-0', className)}
      ref={ref}
      {...props}
    />
  )
})
SheetBody.displayName = 'SheetBody'

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <PrimitiveFooter
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end p-0',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
SheetFooter.displayName = 'SheetFooter'

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter
}
