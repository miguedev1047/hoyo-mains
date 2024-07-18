import { Card } from '@nextui-org/card'
import { Chip, Image, Tooltip } from '@nextui-org/react'
import { Character } from '@prisma/client'
import { getStarBorderColor } from '@/render/src/shared/utilities/helpers/get-border-color'
import { getElementImage } from '@/render/src/panel/character/shared/utilities/helpers/get-element-image'
import { Figure } from '@/render/src/shared/components/figure'
import Link from 'next/link'
import clsx from 'clsx'

interface CharacterItemProps {
  character: Character
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const starCharacter = getStarBorderColor(character?.stars || 0)
  const elementCharacter = getElementImage(character?.element!)!

  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
  const url = `/character?name=${characterName}`

  return (
    <li className='space-y-2'>
      <Card
        isPressable
        as={Link}
        href={url}
        className={clsx(
          'bg-color-darkest aspect-square w-full h-auto flex-none border',
          starCharacter
        )}
      >
        <Figure className='w-full h-full bg-color-darkest'>
          <Image
            isZoomed
            loading='lazy'
            className='w-full h-full object-cover'
            src={character?.imageUrl!}
            alt={`Personaje: ${character?.name}`}
          />
        </Figure>
        {character?.isNew && (
          <Chip
            className='text-xs uppercase absolute top-0 left-0 z-20 m-1'
            color='success'
            variant='shadow'
          >
            <p className='font-bold'>{character?.isNew ? 'Nuevo' : ''}</p>
          </Chip>
        )}

        <Tooltip
          className='bg-color-light'
          content={
            <p className='text-color-darkest capitalize font-medium text-center text-sm'>
              {character?.element}
            </p>
          }
        >
          <Card className='w-10 h-10 bg-color-dark uppercase absolute bottom-0 left-0 z-20 m-2 p-2 rounded-full'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src={elementCharacter}
              alt={`Elemento ${character?.element}`}
            />
          </Card>
        </Tooltip>
      </Card>

      <Card className='bg-color-light text-color-darkest px-4 py-1 text-center'>
        <h2 className='text-xs sm:text-sm md:text-base capitalize font-bold line-clamp-1'>
          {character?.name}
        </h2>
      </Card>
    </li>
  )
}

export default CharacterItem
