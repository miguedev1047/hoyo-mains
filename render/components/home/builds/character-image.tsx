import { CharacterTypes } from '@/types'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { getRole } from '@/utils/helpers/get-role'
import { Chip, Image } from '@nextui-org/react'
import Figure from '@/render/components/UI/misc/figure'
import clsx from 'clsx'
import Link from 'next/link'

const CharacterImage = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const starCharacter = getStarBorderColor(character?.stars || 0)

  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
  const url = `/characters/character?name=${characterName}`

  return (
    <div className='flex items-center gap-5'>
      <Link href={url}>
        <Figure
          padding='p-0'
          width='w-24 lg:w-32'
          height='h-24 lg:h-32'
          radius='rounded-lg'
          className={clsx(' border-[1px]', starCharacter)}
        >
          <Image
            isZoomed
            className='w-full h-full object-cover'
            src={character?.imageUrl!}
            alt={`Personaje: ${character?.name}`}
          />
        </Figure>
      </Link>
      <article className='space-y-2'>
        <h2 className='capitalize text-lg font-medium'>{character?.name}</h2>
        <Chip className='capitalize rounded-md'>
          {getRole(character?.role!)!}
        </Chip>
      </article>
    </div>
  )
}

export default CharacterImage
