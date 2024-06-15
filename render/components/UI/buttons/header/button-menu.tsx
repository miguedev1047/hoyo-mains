'use client'

import { IconLayoutSidebar } from '@tabler/icons-react'
import { useSidebarStore } from '@/utils/store/use-open'
import { Button } from '@nextui-org/button'

const ButtonMenu = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const onOpenChange = useSidebarStore((state) => state.onOpenChange)

  if (!isOpen) {
    return null
  }

  return (
    <Button
      onPress={() => onOpenChange()}
      className='bg-transparent'
      color='success'
      isIconOnly
    >
      <IconLayoutSidebar size={40} />
    </Button>
  )
}

export default ButtonMenu
