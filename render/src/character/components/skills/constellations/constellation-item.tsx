import { Figure } from '@/render/src/shared/components/figure'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider, Image } from '@nextui-org/react'
import { ConstellationsByCharacter } from '@prisma/client'
import Output from '@/render/src/shared/components/editor/output'

interface ConstellationItemProps {
  constellation: ConstellationsByCharacter
}

const ConstellationItem = ({ constellation }: ConstellationItemProps) => {
  return (
    <Card className='px-2 py-5 md:px-8 max-md:rounded-md bg-color-darkest space-y-3 select-none'>
      <CardHeader>
        <article className='w-full flex items-center max-md:justify-between gap-4'>
          <Figure size='lg'>
            <Image
              radius='sm'
              className='w-full h-full bg-primary-color object-cover'
              src={constellation.imageUrl!}
              alt={constellation.name}
            />
          </Figure>
          <h3 className='text-xl font-semibold text-secondary-color line-clamp-1'>
            {constellation.name}
          </h3>
        </article>
      </CardHeader>
      <Divider />
      <CardBody>
        <Output description={constellation.description!} />
      </CardBody>
    </Card>
  )
}

export default ConstellationItem
