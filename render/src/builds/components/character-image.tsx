import { Figure } from '@/render/src/shared/components/figure'
import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { CharacterType } from '@/render/src/types'
import { Chip, Image } from '@nextui-org/react'
import { getRole } from '@/render/src/shared/utilities/helpers/get-role'
import Link from 'next/link'

interface CharacterImageProps {
  build: CharacterType
}

const CharacterImage = ({ build }: CharacterImageProps) => {
  const stars = getStarBorderColor(build.stars || 0)
  const role = getRole(build.role)

  const characterName = build?.name.toLowerCase().replace(/\s/g, '-')
  const url = `/character?name=${characterName}`

  return (
    <article className='flex items-center gap-4'>
      <Link href={url}>
        <Figure size='square' className={`border ${stars}`}>
          <Image
            isZoomed
            src={build.imageUrl!}
            alt={build.name}
            className='w-full h-full object-cover'
          />
        </Figure>
      </Link>

      <div className='space-y-2'>
        <h2 className='text-xl font-medium capitalize'>{build.name}</h2>
        <Chip className='bg-color-gray text-color-darkest rounded-md'>
          <span className='font-bold'>{role}</span>
        </Chip>
      </div>
    </article>
  )
}

export default CharacterImage
