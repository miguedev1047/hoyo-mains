import { Card } from '@nextui-org/card'
import { IconAlertCircle } from '@tabler/icons-react'

interface Props {
  message?: string
  className?: string
}

export const PanelErrorItem = ({ message, className }: Props) => {
  return (
    <Card
      isBlurred
      className={`p-5 text-color-red dark:bg-color-red/20 border-[1px] border-color-red/40 mb-4 lg:mx-1 ${className}`}
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
