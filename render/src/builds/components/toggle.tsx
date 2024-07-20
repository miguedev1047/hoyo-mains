import { Button } from '@nextui-org/button'
import { IconChevronDown } from '@tabler/icons-react'
import React from 'react'

const Toggle = () => {
  return (
    <Button
      size='sm'
      isIconOnly
      disableAnimation
      className='ml-4 bg-transparent'
    >
      <IconChevronDown />
    </Button>
  )
}

export default Toggle
