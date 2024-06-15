import { Characters } from '@/types'
import { CharacterWarnning } from '@/render/components/UI/errors/character-error'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { getElementImage } from '@/utils/helpers/get-element-image'
import { getRole } from '@/utils/helpers/get-role'
import { getWeapon } from '@/utils/helpers/get-weapon'
import { Chip, Image } from '@nextui-org/react'
import clsx from 'clsx'

const CharacterHeader = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='w-full flex flex-col'>
      {!character?.public && (
        <CharacterWarnning message='¡Aviso! Este personaje está configurado como privado. Ajusta esta opción en la configuración para hacerlo público.' />
      )}

      <div className='flex justify-between items-center'>
        <div className='max-md:w-full flex justify-between md:items-center space-y-2 md:space-x-5 lg:space-x-10'>
          <Image
            isBlurred
            width={120}
            height={120}
            className={clsx(
              'bg-color-dark border-2 p-0 aspect-square five-star',
              getStarBorderColor(character?.stars!)
            )}
            src={character?.imageUrl!}
            alt={character?.name}
          />

          <div className='flex flex-col max-md:space-y-3 md:hidden'>
            <h1 className='text-xl text-end font-bold capitalize'>
              {character?.name}
            </h1>
            <div className='capitalize flex flex-col gap-2 items-end'>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-sm px-1.5'
              >
                {getWeapon(character?.weapon!)!}
              </Chip>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-sm px-1.5'
              >
                {getRole(character?.role!)!}
              </Chip>
            </div>
          </div>
          <div className='max-md:hidden md:space-y-4'>
            <h1 className='text-3xl font-bold capitalize'>{character?.name}</h1>
            <div className='capitalize max-md:space-y-4 md:space-x-4'>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-lg px-4'
              >
                {getWeapon(character?.weapon!)!}
              </Chip>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-lg px-4'
              >
                {getRole(character?.role!)!}
              </Chip>
            </div>
          </div>
        </div>

        <Image
          isBlurred
          className='max-md:hidden'
          src={getElementImage(character?.element!)!}
          alt={`Element ${character?.element}`}
        />
      </div>
    </div>
  )
}

export default CharacterHeader