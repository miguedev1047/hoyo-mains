import { useIsPresent } from 'framer-motion'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { Card } from '@nextui-org/card'
import { Chip, Image } from '@nextui-org/react'
import { Character } from '@prisma/client'
import { MotionLi } from '@/render/components/motion'
import clsx from 'clsx'

const ItemCharacter = ({ character }: { character: Character | undefined }) => {
  const starCharacter = getStarBorderColor(character?.stars || 0)
  const isPresent = useIsPresent()

  return (
    <MotionLi
      style={{
        position: isPresent ? 'static' : 'absolute'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
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
          loading='lazy'
          classNames={{
            wrapper: 'w-full h-full mx-auto',
            zoomedWrapper: 'h-full'
          }}
          className='w-full h-full object-cover'
          src={character?.imageUrl!}
          alt={`Personaje: ${character?.name}`}
        />
        {character?.isNew && (
          <Chip
            className='text-xs uppercase absolute top-0 left-0 z-20 m-1'
            color='success'
            variant='shadow'
          >
            <p className='font-bold'>{character?.isNew ? 'Nuevo' : ''}</p>
          </Chip>
        )}
      </Card>

      <Card className='bg-color-light text-color-darkest px-4 py-1 text-center'>
        <h2 className='text-xs sm:text-sm md:text-base capitalize font-bold line-clamp-1'>
          {character?.name}
        </h2>
      </Card>
    </MotionLi>
  )
}

export default ItemCharacter
