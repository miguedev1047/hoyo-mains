import { Figure } from '@/render/src/shared/components/figure'
import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Material } from '@prisma/client'
import DropdownOptions from '@/render/src/panel/materials/components/dropdown-options'
import clsx from 'clsx'

interface MaterialItemProps {
  material: Material
}

const MaterialItem = ({ material }: MaterialItemProps) => {
  return (
    <Card
      className={clsx(
        'bg-color-dark border-2',
        getStarBorderColor(material.stars)
      )}
    >
      <CardBody className='flex flex-row items-center justify-between'>
        <article className='flex items-center gap-4'>
          <Figure size='md'>
            <Image
              radius='sm'
              src={material.imageUrl!}
              alt={material.name}
              width={200}
              height={200}
            />
          </Figure>
          <h3 className='text-sm font-medium line-clamp-1'>{material.name}</h3>
        </article>

        <DropdownOptions material={material} />
      </CardBody>
    </Card>
  )
}

export default MaterialItem
