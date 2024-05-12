'use client'

import { Button } from '@nextui-org/button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'
import { IconArrowBarRight, IconUserFilled } from '@tabler/icons-react'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'sonner'

const UserButton = () => {
  const session = useSession()

  const handleLogOut = () => {
    toast.success('Sesión cerrada exitosamente!')
    signOut()
  }

  if (!session) return null

  return (
    <Dropdown className='bg-color-dark'>
      <DropdownTrigger>
        <Button isIconOnly radius='md' size='lg' className='bg-color-dark'>
          <IconUserFilled size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Admin Dropdown'>
        <DropdownItem
          key='log-out'
          color='danger'
          textValue='LogOut'
          onPress={() => handleLogOut()}
          startContent={<IconArrowBarRight />}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserButton
