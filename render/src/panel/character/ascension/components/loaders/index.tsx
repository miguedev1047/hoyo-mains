import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react'

interface FormLoaderProps {
  children: React.ReactNode
}

export const FormLoader = ({ children }: FormLoaderProps) => {
  return (
    <Button
      size='lg'
      fullWidth
      isLoading
      isDisabled
      color='success'
      className='bg-color-light font-bold'
      startContent={<IconPlus />}
    >
      {children}
    </Button>
  )
}
