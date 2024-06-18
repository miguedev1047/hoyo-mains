import { getStarBorderColor } from '@/utils/helpers/get-color'
import { Card } from '@nextui-org/card'
import { Chip, Image } from '@nextui-org/react'
import { Character } from '@prisma/client'
import { useIsPresent } from 'framer-motion'
import { MotionLi } from '@/render/components/motion/index'
import clsx from 'clsx'

const ItemCharacter = ({ character }: { character: Character | undefined }) => {
  const isPresent = useIsPresent()
  const starCharacter = getStarBorderColor(character?.stars || 0)

  return (
    <MotionLi
      style={{
        position: isPresent ? 'static' : 'absolute'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
      layout
      className='space-y-2'
    >
      <Card
        isPressable
        className={clsx(
          'bg-color-darkest aspect-square w-full h-auto flex-none border',
          starCharacter
        )}
      >
        <Image
          isZoomed
          className='object-cover w-full h-full'
          src={character?.imageUrl!}
          alt={`Personaje: ${character?.name}`}
        />
        {character?.isNew && (
          <Chip
            className='text-xs uppercase absolute top-0 left-0 z-50 m-1'
            color='success'
            variant='shadow'
          >
            <p className='font-bold'>{character?.isNew ? 'Nuevo' : ''}</p>
          </Chip>
        )}
      </Card>

      <Card className='bg-color-light text-color-darkest px-4 py-1 text-center'>
        <h2 className='capitalize font-bold line-clamp-1'>{character?.name}</h2>
      </Card>
    </MotionLi>
  )
}

export default ItemCharacter