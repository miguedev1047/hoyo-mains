import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider, Image } from '@nextui-org/react'
import { TalentsByCharacter } from '@prisma/client'
import Output from '@/render/components/UI/editor/output'

const CharacterTalentItem = ({ talent }: { talent: TalentsByCharacter }) => {
  return (
    <Card className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
      <CardHeader>
        <article className='w-full flex items-center max-md:justify-between gap-4'>
          <figure className='w-20 h-20 bg-primary-color p-1 rounded-full flex-none relative overflow-hidden'>
            <Image
              className='w-full h-full bg-primary-color object-cover'
              src={talent.imageUrl!}
              alt={talent.name}
            />
          </figure>
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
