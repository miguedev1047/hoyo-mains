import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider, Image } from '@nextui-org/react'
import { TalentsByCharacter } from '@prisma/client'
import Output from '@/render/components/UI/editor/output'
import Figure from '@/render/components/UI/misc/figure'

const CharacterTalentItem = ({ talent }: { talent: TalentsByCharacter }) => {
  return (
    <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
      <CardHeader>
        <article className='w-full flex items-center max-md:justify-between gap-4'>
          <Figure radius='rounded-full' width='w-20' height='h-20'>
            <Image
              radius='sm'
              className='w-full h-full bg-primary-color object-cover'
              src={talent.imageUrl!}
              alt={talent.name}
            />
          </Figure>
          <h3 className='text-xl font-semibold text-secondary-color line-clamp-1'>
            {talent.name}
          </h3>
        </article>
      </CardHeader>
      <Divider />
      <CardBody>
        <Output description={talent.description!} />
      </CardBody>
    </Card>
  )
}

export default CharacterTalentItem
