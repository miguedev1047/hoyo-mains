import React from 'react'
import { Figure } from '../../shared/components/figure'
import { getStarBorderColor } from '../../shared/utilities/helpers/get-border-color'
import { CharacterType } from '../../types'
import { Chip, Image } from '@nextui-org/react'
import { getRole } from '../../shared/utilities/helpers/get-role'

interface CharacterImageProps {
  build: CharacterType
}

const CharacterImage = ({ build }: CharacterImageProps) => {
  const stars = getStarBorderColor(build.stars || 0)
  const role = getRole(build.role)

  return (
    <article className='flex items-center gap-4'>
      <Figure size='square' className={`border ${stars}`}>
        <Image
          src={build.imageUrl!}
          alt={build.name}
          className='w-full h-full object-cover'
        />
      </Figure>

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
