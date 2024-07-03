import { useViewBuildStore } from '@/utils/store/use-view-build-store'
import { Button, Tooltip } from '@nextui-org/react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

const ViewToggle = () => {
  const { isOpen, handleOpen } = useViewBuildStore((state) => ({
    isOpen: state.isOpen,
    handleOpen: state.setIsOpen
  }))

  return (
    <Tooltip
      className='bg-color-light text-color-darkest'
      content={isOpen ? 'Cerrar' : 'Ver más'}
    >
      <Button
        onPress={() => handleOpen(!isOpen)}
        isIconOnly
        className='bg-transparent'
      >
        {isOpen ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
      </Button>
    </Tooltip>
  )
}

export default ViewToggle
