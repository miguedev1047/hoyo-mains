import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider, Image } from '@nextui-org/react'
import { ConstellationsByCharacter } from '@prisma/client'
import Output from '@/render/components/UI/editor/output'
import Figure from '@/render/components/UI/misc/figure'

const CharacterConstellationItem = ({
  constellation
}: {
  constellation: ConstellationsByCharacter
}) => {
  return (
    <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
      <CardHeader>
        <article className='w-full flex items-center max-md:justify-between gap-4'>
          <Figure radius='rounded-full' width='w-20' height='h-20'>
            <Image
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

export default CharacterConstellationItem
