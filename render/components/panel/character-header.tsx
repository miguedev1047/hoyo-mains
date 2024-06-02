import { Characters } from '@/types'
import { CharacterError } from '@/render/components/UI/errors/character-error'
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
        <CharacterError message='¡Aviso! Este personaje está configurado como privado. Ajusta esta opción en la configuración para hacerlo público.' />
      )}

      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-10'>
          <Image
            isBlurred
            width={125}
            height={125}
            className={clsx(
              'bg-color-dark border-2 p-0 aspect-square five-star',
              getStarBorderColor(character?.stars!)
            )}
            src={character?.imageUrl!}
            alt={character?.name}
          />
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold capitalize'>{character?.name}</h1>
            <div className='capitalize space-x-4'>
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
          src={getElementImage(character?.element!)!}
          alt={`Element ${character?.element}`}
        />
      </div>
    </div>
  )
}

export default CharacterHeader
