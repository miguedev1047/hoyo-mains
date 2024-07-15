import { Chip, Image } from '@nextui-org/react'
import { IconAlertCircle } from '@tabler/icons-react'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'
import { CharacterType } from '@/render/src/types'
import { getElementImage } from '@/render/src/panel/character/shared/utilities/helpers/get-element-image'
import { getRole } from '@/render/src/panel/character/shared/utilities/helpers/get-role'
import { getWeapon } from '@/render/src/panel/character/shared/utilities/helpers/get-weapon'
import Figure from '@/render/src/shared/components/figure'

const InfoHeader = ({ character }: { character: CharacterType }) => {
  const weaponType = getWeapon(character?.weapon!)!
  const elementType = getElementImage(character?.element!)!
  const roleType = getRole(character?.role!)!

  return (
    <div className='w-full flex flex-col'>
      {!character?.public && (
        <Alert variant='warning'>
          <IconAlertCircle />
          <AlertTitle>¡Aviso!</AlertTitle>
          <AlertDescription>
            Este personaje está configurado como privado. Ajusta esta opción en
            la configuración para hacerlo público.
          </AlertDescription>
        </Alert>
      )}

      {character?.public && (
        <Alert variant='success'>
          <IconAlertCircle />
          <AlertTitle>¡Aviso!</AlertTitle>
          <AlertDescription>
            Este personaje está configurado como público. Los demás usuarios
            pueden verlo.
          </AlertDescription>
        </Alert>
      )}

      <div className='flex justify-between items-center'>
        <div className='max-md:w-full flex justify-between md:items-center space-y-2 md:space-x-5 lg:space-x-8'>
          <Figure
            width='w-[160px]'
            height='h-[160px]'
            background='bg-darkest'
            className='border-[1px] border-color-lightest rounded-lg'
          >
            <Image src={character?.imageUrl!} alt={character?.name} />
          </Figure>

          <div className='flex flex-col max-md:space-y-3 md:hidden'>
            <h1 className='text-xl text-end font-bold capitalize'>
              {character?.name}
            </h1>
            <div className='capitalize flex flex-col gap-2 items-end'>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-sm px-1.5'
              >
                {weaponType}
              </Chip>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-sm px-1.5'
              >
                {roleType}
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
                {weaponType}
              </Chip>
              <Chip
                radius='sm'
                className='bg-color-light text-color-darkest text-lg px-4'
              >
                {roleType}
              </Chip>
            </div>
          </div>
        </div>

        <Image
          isBlurred
          className='max-md:hidden'
          src={elementType}
          alt={`Element ${character?.element}`}
        />
      </div>
    </div>
  )
}

export default InfoHeader
