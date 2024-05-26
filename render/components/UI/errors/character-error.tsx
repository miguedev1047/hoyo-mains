import { Card } from '@nextui-org/card'
import { IconAlertCircle } from '@tabler/icons-react'

interface Props {
  message?: string
  className?: string
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

export const CharacterMaterialItemError = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <div className='size-10 grid place-items-center border-2 rounded-md border-color-red/40'>
          <IconAlertCircle size={32} />
        </div>

        <p className='text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}
