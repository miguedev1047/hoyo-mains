import { Card } from '@nextui-org/card'
import { IconAlertCircle } from '@tabler/icons-react'
import clsx from 'clsx'

interface Props {
  message?: string
  className?: string
  type?: 'error' | 'warning' | 'info' | 'success' | 'default'
}

export const Alert = ({ className, message, type = 'default' }: Props) => {
  const successStyle =
    'text-success-500 bg-success-500/20 border-success-500/40'
  const errorStyle = 'text-color-red bg-color-red/20 border-color-red/40'
  const infoStyle = 'text-primary-500 bg-primary/20 border-primary-500/40'
  const warningStyle =
    'text-warning-500 bg-warning-500/20 border-warning-500/40'
  const defaultStyle = 'text-primary-500 bg-primary/20 border-primary-500/40'

  return (
    <Card
      className={clsx(
        `p-5 mb-4 border-[1px] ${className}`,
        type === 'error' ? errorStyle : '',
        type === 'warning' ? warningStyle : '',
        type === 'info' ? infoStyle : '',
        type === 'success' ? successStyle : '',
        type === 'default' ? defaultStyle : ''
      )}
    >
      <div className='flex items-center gap-2'>
        <span className='max-md:hidden'>
          <IconAlertCircle size={32} />
        </span>
        <p className='text-xs sm:text-base lg:text-lg font-semibold'>
          {message ? message : 'Ha ocurrido un error.'}
        </p>
      </div>
    </Card>
  )
}
