import { Button } from '@nextui-org/button'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useViewStore } from '../utilities/store/use-view-store'
import { CharacterType } from '../../types'

interface ToggleProps {
  build: CharacterType
}

const Toggle = ({ build }: ToggleProps) => {
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
      className='ml-4 bg-transparent'
      onPress={handleClick}
    >
      {isExpanded ? <IconChevronUp /> : <IconChevronDown />}
    </Button>
  )
}

export default Toggle
