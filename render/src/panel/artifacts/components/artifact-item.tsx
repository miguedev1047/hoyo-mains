import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { Figure } from '@/render/src/shared/components/figure'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Artifact } from '@prisma/client'
import DropdownOptions from '@/render/src/panel/artifacts/components/dropdown-options'
import clsx from 'clsx'

interface ArtifactItemProps {
  artifact: Artifact
}

const ArtifactItem = ({ artifact }: ArtifactItemProps) => {
  return (
    <Card
      className={clsx(
        'bg-color-dark border-2',
        getStarBorderColor(artifact.stars)
      )}
    >
      <CardBody className='flex flex-row items-center justify-between'>
        <article className='flex items-center gap-4'>
          <Figure size='md'>
            <Image
              className='w-full h-full object-cover'
              src={artifact.imageUrl!}
              alt={artifact.name}
            />
          </Figure>
          <h3 className='text-sm font-medium line-clamp-1'>{artifact.name}</h3>
        </article>

        <DropdownOptions artifact={artifact} />
      </CardBody>
    </Card>
  )
}

export default ArtifactItem
