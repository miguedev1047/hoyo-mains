'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { IconPencil, IconSettings, IconTrash } from '@tabler/icons-react'
import { useDropdownOptions } from '@/render/src/panel/weapons/utilities/hooks/use-dropdown-options'
import { Weapon } from '@prisma/client'

interface DropdownOptionsProps {
  weapon: Weapon
}

const DropdownOptions = ({ weapon }: DropdownOptionsProps) => {
  const { handleEdit, handleDelete, isPending } = useDropdownOptions()

  return (
    <Dropdown backdrop='opaque' className='bg-color-dark'>
      <DropdownTrigger>
        <Button
          isIconOnly
          isDisabled={isPending}
          className='bg-color-lightest text-color-darkest'
        >
          <IconSettings />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Weapon Actions'>
        <DropdownItem
          key='edit'
          startContent={<IconPencil />}
          onPress={() => handleEdit(weapon.id)}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key='delete'
          color='danger'
          startContent={<IconTrash />}
          className='text-color-red'
          onPress={() => handleDelete(weapon.id)}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownOptions
