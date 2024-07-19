import { Chip, Image } from '@nextui-org/react'
import { CharacterType } from '@/render/src/types'
import { getWeapon } from '@/render/src/shared/utilities/helpers/get-weapon'
import { getElementImage } from '@/render/src/shared/utilities/helpers/get-element-image'
import { getRole } from '@/render/src/shared/utilities/helpers/get-role'
import { Figure } from '@/render/src/shared/components/figure'

const InfoHeader = ({ character }: { character: CharacterType }) => {
  const weaponType = getWeapon(character?.weapon!)!
  const elementType = getElementImage(character?.element!)!
  const roleType = getRole(character?.role!)!

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='max-md:w-full flex justify-between md:items-center space-y-2 md:space-x-5 lg:space-x-8'>
        <Figure
          radius='lg'
          className='size-[160px] bg-color-darkest border-[1px] border-color-lightest'
        >
          <Image
            className='w-full h-full object-cover'
            src={character?.imageUrl!}
            alt={character?.name}
          />
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
  )
}

export default InfoHeader
