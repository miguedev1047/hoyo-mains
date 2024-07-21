import { MaterialByAscension } from '@prisma/client'
import { useOpenPopover } from '../store/use-open-popover'

interface OpenPopoverProps {
  material: MaterialByAscension
}

export const useOpen = ({ material }: OpenPopoverProps) => {
  const { open, setOpen, itemId } = useOpenPopover((state) => ({
    open: state.open,
    itemId: state.itemId,
    setOpen: state.setOpen
  }))

  const materialId = material?.id
  const isOpen = open && itemId === materialId

  const handleOpen = (open: boolean, itemId: string) => {
    setOpen({ open, itemId })
  }

  const handleClose = () => {
    setOpen({ open: false, itemId: '' })
  }

  return {
    isOpen,
    handleOpen,
    handleClose
  }
}
