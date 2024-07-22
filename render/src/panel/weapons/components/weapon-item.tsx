import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { Figure } from '@/render/src/shared/components/figure'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import DropdownOptions from '@/render/src/panel/weapons/components/dropdown-options'
import clsx from 'clsx'

interface WeaponItemProps {
  weapon: Weapon
}

const WeaponItem = ({ weapon }: WeaponItemProps) => {
  return (
    <Card
      className={clsx(
        'bg-color-dark border-2',
        getStarBorderColor(weapon.stars)
      )}
    >
      <CardBody className='flex flex-row items-center justify-between'>
        <article className='flex items-center gap-4'>
          <Figure size='md'>
            <Image
              className='w-full h-full object-cover'
              src={weapon.imageUrl!}
              alt={weapon.name}
            />
          </Figure>
          <h3 className='text-sm font-medium line-clamp-1'>{weapon.name}</h3>
        </article>

        <DropdownOptions weapon={weapon} />
      </CardBody>
    </Card>
  )
}

export default WeaponItem
