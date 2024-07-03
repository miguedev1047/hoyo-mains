import { characterType } from '@/types'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { getRole } from '@/utils/helpers/get-role'
import { Chip, Image } from '@nextui-org/react'
import Figure from '@/render/components/UI/misc/figure'
import clsx from 'clsx'

const CharacterImage = ({
  character
}: {
  character: characterType | undefined
}) => {
  const starCharacter = getStarBorderColor(character?.stars || 0)

  return (
    <div className='flex items-center gap-5'>
      <Figure
        padding='p-0'
        width='w-32'
        height='h-32'
        radius='rounded-lg'
        className={clsx(' border-[1px]', starCharacter)}
      >
        <Image
          className='w-full h-full object-cover'
          src={character?.imageUrl!}
          alt={`Personaje: ${character?.name}`}
        />
      </Figure>
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
