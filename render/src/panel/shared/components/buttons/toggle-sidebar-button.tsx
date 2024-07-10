'use client'

import { Button } from '@nextui-org/button'
import { useMediaQuery } from '@/render/src/panel/shared/utilities/hooks/use-media-query'
import { useSidebarStore } from '@/render/src/panel/shared/utilities/store/use-sidebar-store'
import { IconLayoutSidebar } from '@tabler/icons-react'

const ToggleSidebarButton = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const onOpenChange = useSidebarStore((state) => state.onOpenChange)
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  if (!isMediumScreen) {
    return (
      <Button
        onPress={() => onOpenChange()}
        className='bg-transparent md:hidden'
        color='success'
        isIconOnly
      >
        <IconLayoutSidebar size={32} />
      </Button>
    )
  }

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
      <IconLayoutSidebar size={32} />
    </Button>
  )
}

export default ToggleSidebarButton
