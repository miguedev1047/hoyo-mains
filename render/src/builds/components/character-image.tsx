import { Card, Chip, Image, Tooltip } from '@nextui-org/react'
import { Figure } from '@/render/src/shared/components/figure'
import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { getElementImage } from '@/render/src/shared/utilities/helpers/get-element-image'
import { CharacterType } from '@/render/src/types'
import { getRole } from '@/render/src/shared/utilities/helpers/get-role'
import Link from 'next/link'

interface CharacterImageProps {
  build: CharacterType
}

const CharacterImage = ({ build }: CharacterImageProps) => {
  const starsCharacter = getStarBorderColor(build.stars || 0)
  const elementCharacter = getElementImage(build?.element!)!
  const roleCharacter = getRole(build.role)

  const characterName = build?.name.toLowerCase().replace(/\s/g, '-')
  const url = `/character?name=${characterName}`

  return (
    <article className='flex items-center gap-4'>
      <Link href={url} className='relative'>
        <Figure className={`size-20 md:size-[160px] border ${starsCharacter}`}>
          <Image
            isZoomed
            src={build.imageUrl!}
            alt={build.name}
            className='w-full h-full object-cover'
          />
        </Figure>

        <Tooltip
          className='bg-color-light'
          content={
            <p className='text-color-darkest capitalize font-medium text-center text-sm'>
              {build?.element}
            </p>
          }
        >
          <Card className='size-10 max-md:hidden bg-color-dark uppercase absolute bottom-0 left-0 z-20 m-2 p-2 rounded-full'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src={elementCharacter}
              alt={`Elemento ${build?.element}`}
            />
          </Card>
        </Tooltip>
      </Link>

      <div className='space-y-2'>
        <h2 className='text-base md:text-xl font-medium capitalize'>
          {build.name}
        </h2>
        <Chip className='bg-color-gray text-color-darkest rounded-md'>
          <span className='text-xs md:text-base font-bold'>
            {roleCharacter}
          </span>
        </Chip>
      </div>
    </article>
  )
}

export default CharacterImage
