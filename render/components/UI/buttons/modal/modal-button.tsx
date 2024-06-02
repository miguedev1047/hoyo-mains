import { Button } from '@nextui-org/button'

interface ModalButtonProps {
  children: React.ReactNode
  isLoading: boolean
}

const ModalButton = ({ children, isLoading }: ModalButtonProps) => {
  return (
    <Button
      fullWidth
      size='lg'
      type='submit'
      color='success'
      isLoading={isLoading}
      className='bg-color-light font-bold'
    >
      {children}
    </Button>
  )
}

export default ModalButton
