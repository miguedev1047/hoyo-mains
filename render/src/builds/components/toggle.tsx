import { Button } from '@nextui-org/button'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useViewStore } from '@/render/src/builds/utilities/store/use-view-store'
import { CharacterType } from '@/render/src/types'
import clsx from 'clsx'

interface ToggleProps {
  build: CharacterType
}

export const Toggle = ({ build }: ToggleProps) => {
  const { isOpen, cardId, updateOpen } = useViewStore((state) => ({
    isOpen: state.isOpen,
    cardId: state.cardId,
    updateOpen: state.setIsOpen
  }))

  const handleClick = () => {
    updateOpen(!isOpen, build.id)
  }


  const buildId = build.id
  const isExpanded = isOpen && cardId === buildId

  return (
    <Button
      size='sm'
      isIconOnly
      disableAnimation
      className={clsx('ml-4 bg-transparent', isExpanded ? 'mt-16' : '')}
      onPress={handleClick}
    >
      {isExpanded ? <IconChevronUp /> : <IconChevronDown />}
    </Button>
  )
}
