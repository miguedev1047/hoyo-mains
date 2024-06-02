import { Card } from '@nextui-org/card'
import { IconAlertCircle } from '@tabler/icons-react'

interface Props {
  message?: string
  className?: string
}

export const CharacterError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-warning-500 dark:bg-warning-500/20 border-[1px] border-warning-500/40 mb-4 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <IconAlertCircle size={32} />
        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}

export const CharacterItemError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <IconAlertCircle />
        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}

export const ItemMaterialError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <IconAlertCircle size={32} />
        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}

export const ItemWeaponError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <IconAlertCircle size={32} />
        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}

export const ItemArtifactError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <IconAlertCircle size={32} />
        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}

export const ItemCharacterError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-2 mx-2 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <IconAlertCircle size={64} />
        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}
