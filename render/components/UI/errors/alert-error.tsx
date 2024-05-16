import { IconAlertCircle } from '@tabler/icons-react'

interface Props {
  message?: string
  className?: string
}

const AlertError = ({ message, className }: Props) => {
  return (
    <div
      className={`w-full h-[calc(100vh_-_332px)] grid place-content-center ${className}`}
    >
      <div className='space-y-4 text-color-red'>
        <IconAlertCircle className='mx-auto animate-pulse' size={120} />
        <p className='text-center text-3xl'>
          {message ? message : 'Hubo un problema al cargar los datos'}
        </p>
      </div>
    </div>
  )
}

export default AlertError
