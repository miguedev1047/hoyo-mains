import { Tooltip } from '@nextui-org/react'
import { Artifact, Material, Weapon } from '@prisma/client'
import React from 'react'

interface Props {
  item: Weapon | Artifact | Material
  children: React.ReactNode
}

const TooltipItemName = ({ item, children }: Props) => {
  return (
    <Tooltip
      radius='sm'
      placement='bottom-end'
      className='bg-color-light text-color-darkest font-medium'
      content={item.name}
    >
      {children}
    </Tooltip>
  )
}

export default TooltipItemName
