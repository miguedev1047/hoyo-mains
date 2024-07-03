import { useViewBuildStore } from '@/utils/store/use-view-build-store'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { Button } from '@nextui-org/react'

const ViewToggle = ({ characterId }: { characterId: string | undefined }) => {
  const { isOpen, handleOpen } = useViewBuildStore((state) => ({
    isOpen: state.isOpen,
    handleOpen: state.setIsOpen
  }))

  const handleIsOpen = () => {
    if (characterId) {
      handleOpen(!isOpen, characterId!)
    }
  }

  return (
    <Button onPress={handleIsOpen} isIconOnly className='bg-transparent'>
      {isOpen ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
    </Button>
  )
}

export default ViewToggle
