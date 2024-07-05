import { Card } from '@nextui-org/card'
import { IconAlertCircle } from '@tabler/icons-react'

interface Props {
  message?: string
  className?: string
}

export const HomeErrorItem = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 lg:mx-2 ${className}`}
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

export const HomeErrorList = () => {
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center gap-2 text-color-red'>
        <IconAlertCircle size={32} className='animate-pulse' />
        <h2 className='text-base md:text-xl'>
          No se han podido cargar los personajes
        </h2>
      </div>
    </div>
  )
}

export const HomeCharacterTeamError = () => {
  return (
    <Card className='bg-color-red/20 aspect-square flex items-center justify-center text-color-red'>
      <IconAlertCircle size={32} className='animate-pulse' />
    </Card>
  )
}

export const BuildErrorItem = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`col-span-2 w-full px-2 py-3 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-2 rounded-md lg:mr-2 ${className}`}
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

export const BuildErrorList = () => {
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center gap-2 text-color-red'>
        <IconAlertCircle size={32} className='animate-pulse' />
        <h2 className='text-base md:text-xl'>
          No se han podido cargar las builds
        </h2>
      </div>
    </div>
  )
}

export const PanelErrorItem = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 lg:mx-2 ${className}`}
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
