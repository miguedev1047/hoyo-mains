'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  ModalFooterProps,
} from '@nextui-org/modal'
import {
  Button,
  ButtonProps,
  Image,
  Listbox,
  ListboxItem,
  ListboxProps,
  ScrollShadow,
  Tooltip,
} from '@nextui-org/react'
import { Slot } from '@radix-ui/react-slot'
import { Input, InputProps } from '@nextui-org/input'
import { Figure } from '@/render/src/shared/components/figure'
import React, { useCallback, useEffect } from 'react'
import { cn } from '@/libs/utils'

type ArrayItem = Array<Record<string, any>>

interface MultiSelectModalProps {
  searchValue: string
  isOpen: boolean
  selectedKeys: Set<string>
  filteredItems: ArrayItem
  isDismissable?: boolean
  searchPlaceholder?: string
  isKeyboardDismissDisabled?: boolean
  items: ArrayItem
  emptyContent?: string
  isLoading?: boolean
  setSearchValue: (searchValue: string) => void
  onOpenChange: (isOpen: boolean) => void
  setFilteredItems: (filteredItems: ArrayItem) => void
  setSelectedKeys: (keys: Set<string>) => void
  onSubmit: (e: any) => void
}

// export const MultiSelectModal = ({
//   isOpen,
//   items,
//   selectedKeys,
//   filteredItems,
//   searchValue,
//   isDismissable = true,
//   emptyContent = 'No hay resultados.',
//   searchPlaceholder = 'Buscar...',
//   isKeyboardDismissDisabled = false,
//   isLoading = false,
//   onOpenChange,
//   setSearchValue,
//   setFilteredItems,
//   setSelectedKeys,
//   onSubmit,
// }: MultiSelectModalProps) => {

//   useEffect(() => {
//     handleFilteredItems(items)
//   }, [searchValue])

//   const handleFilteredItems = useCallback(
//     (items: Array<Record<string, any>>) => {
//       const newFilteredItems = items.filter((item) =>
//         item.name.toLowerCase().includes(searchValue.toLowerCase())
//       )

//       setFilteredItems(newFilteredItems)
//     },
//     [searchValue]
//   )

//   return (
//     <Modal
//       hideCloseButton
//       backdrop='opaque'
//       isDismissable={isDismissable}
//       isKeyboardDismissDisabled={isKeyboardDismissDisabled}
//       placement='top-center'
//       onOpenChange={onOpenChange}
//       isOpen={isOpen}
//       className='bg-color-dark'
//     >
//       <ModalContent>
//         {() => (
//           <form
//             onSubmit={onSubmit}
//             className='w-full py-2'
//           >
//             <ModalHeader className='p-0'>
//               <Input
//                 value={searchValue}
//                 onValueChange={setSearchValue}
//                 placeholder={searchPlaceholder}
//                 labelPlacement='inside'
//                 variant='underlined'
//                 className='mb-1'
//                 size='lg'
//                 classNames={{ input: 'pl-[10px] font-light' }}
//               />
//             </ModalHeader>
//             <ModalBody className='p-0'>
//               <ScrollShadow
//                 hideScrollBar
//                 className='flex flex-col h-full max-h-[200px] sm:max-h-[480px] overflow-y-auto'
//               >
//                 <Listbox
//                   aria-label='Select character'
//                   selectionMode='multiple'
//                   emptyContent={emptyContent}
//                   items={filteredItems}
//                   selectedKeys={selectedKeys}
//                   // @ts-ignore
//                   onSelectionChange={setSelectedKeys}
//                 >
//                   {(item) => (
//                     <ListboxItem
//                       textValue={item.id}
//                       key={item.id}
//                     >
//                       <div className='flex items-center gap-4'>
//                         <Figure>
//                           <Image
//                             src={item.imageUrl!}
//                             alt={item.name}
//                           />
//                         </Figure>

//                         <h2 className='capitalize'>{item.name}</h2>
//                       </div>
//                     </ListboxItem>
//                   )}
//                 </Listbox>
//               </ScrollShadow>
//             </ModalBody>
//             <ModalFooter className='flex-col text-center p-0 px-2'>
//               <Button
//                 fullWidth
//                 isLoading={isLoading}
//                 isDisabled={isLoading}
//                 type='submit'
//                 className='bg-color-lightest text-color-darkest font-bold'
//               >
//                 Añadir
//               </Button>
//             </ModalFooter>
//           </form>
//         )}
//       </ModalContent>
//     </Modal>
//   )
// }

export const MultiSelectModal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
    />
  )
})
MultiSelectModal.displayName = 'MultiSelectModal'

interface MultiSelectModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  tooltipContent?: string
  isSquared?: boolean
}

export const MultiSelectModalTrigger = React.forwardRef<
  HTMLButtonElement,
  MultiSelectModalTriggerProps & ButtonProps
>(({ tooltipContent, asChild, isSquared, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Tooltip
      className='bg-color-dark text-color-lightest font-bold'
      content={tooltipContent}
    >
      <Comp
        {...props}
        ref={ref}
        className={cn('w-full h-full', isSquared && 'aspect-square', className)}
      />
    </Tooltip>
  )
})
MultiSelectModalTrigger.displayName = 'MultiSelectModalTrigger'

interface MultiSelectModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onSubmit?: (e: any) => void
}

export const MultiSelectModalContent = React.forwardRef<
  HTMLDivElement,
  MultiSelectModalContentProps & ModalProps
>(
  (
    {
      isOpen,
      children,
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      backdrop = 'opaque',
      onSubmit,
      onOpenChange,
    },
    ref
  ) => {
    return (
      <Modal
        hideCloseButton
        placement='top-center'
        isOpen={isOpen}
        backdrop={backdrop}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        onOpenChange={onOpenChange}
        ref={ref}
        className='bg-color-dark'
      >
        <ModalContent>
          {() => (
            <form
              className='w-full py-2'
              onSubmit={onSubmit}
            >
              {children}
            </form>
          )}
        </ModalContent>
      </Modal>
    )
  }
)
MultiSelectModalContent.displayName = 'MultiSelectModalContent'

interface MultiSelectModalSearch
  extends React.HTMLAttributes<HTMLInputElement> {
  searchPlaceholder?: string
  value?: string
  searchValue?: string
  onValueChange?: (value: string) => void
  setSearchValue?: (value: string) => void
}

export const MultiSelectModalSearch = React.forwardRef<
  HTMLInputElement,
  MultiSelectModalSearch & InputProps
>(({ className, value, searchValue, searchPlaceholder, ...props }, ref) => {
  return (
    <ModalHeader className='p-0 mb-1'>
      <Input
        placeholder={searchPlaceholder}
        labelPlacement='inside'
        variant='underlined'
        classNames={{ input: 'pl-[10px] font-light' }}
        size='lg'
        ref={ref}
        {...props}
      />
    </ModalHeader>
  )
})
MultiSelectModalSearch.displayName = 'MultiSelectModalSearch'

export const MultiSelectModalList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  return (
    <ModalBody className='p-0'>
      <ScrollShadow
        hideScrollBar
        className='flex flex-col h-full max-h-[200px] sm:max-h-[480px] overflow-y-auto'
        ref={ref}
      >
        {children}
      </ScrollShadow>
    </ModalBody>
  )
})
MultiSelectModalList.displayName = 'MultiSelectModalList'

interface MultiSelectModalItemsProps {
  emptyContent?: string
  items: Array<Record<string, any>>
  filteredItems: Array<Record<string, string>>
  selectedKeys: Set<string>
  searchValue: string
  defaultSelectedKeys: Set<string>
  setFilteredItems: (value: Array<Record<string, any>>) => void
  setSelectedKeys: (keys: Set<string>) => void
}

export const MultiSelectModalItems = React.forwardRef<
  HTMLDivElement,
  MultiSelectModalItemsProps
>(
  (
    {
      items,
      searchValue,
      emptyContent,
      selectedKeys,
      defaultSelectedKeys,
      filteredItems,
      setSelectedKeys,
      setFilteredItems,
    },
    ref
  ) => {
    useEffect(() => {
      handleFilteredItems(items)
    }, [searchValue])

    const handleFilteredItems = useCallback(
      (items: Array<Record<string, any>>) => {
        const newFilteredItems = items.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )

        setFilteredItems(newFilteredItems)
      },
      [searchValue]
    )

    return (
      <Listbox
        aria-label='Select Items'
        selectionMode='multiple'
        emptyContent={emptyContent}
        items={filteredItems}
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={selectedKeys}
        // @ts-ignore
        onSelectionChange={setSelectedKeys}
        ref={ref}
      >
        {(item) => (
          <ListboxItem
            textValue={item.id}
            key={item.id}
          >
            <div className='flex items-center gap-4'>
              <Figure>
                <Image
                  src={item.imageUrl!}
                  alt={item.name}
                />
              </Figure>

              <h2 className='capitalize'>{item.name}</h2>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    )
  }
)
MultiSelectModalItems.displayName = 'MultiSelectModalItems'

interface MultiSelectModalFooterProps extends ModalFooterProps {}

export const MultiSelectModalFooter = React.forwardRef<
  HTMLDivElement,
  MultiSelectModalFooterProps
>(({ ...props }, ref) => {
  return (
    <ModalFooter
      className='p-0 pt-1 px-2'
      {...props}
      ref={ref}
    />
  )
})
