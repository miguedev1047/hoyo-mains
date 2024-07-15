'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { cn } from '@/libs/utils'
import useDelete from '@/render/src/panel/shared/utilities/hooks/use-delete'

interface DeleteButtonProps {
  id: string
  children: React.ReactNode
  className?: string
  path?: string
  deleteType?: 'normal' | 'image'
  isIconOnly?: boolean
  startContent?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | undefined
  onCallback: (characterId: string) => Promise<any>
}

const DeleteButton = ({
  id,
  children,
  path,
  className,
  deleteType = 'normal',
  startContent,
  isIconOnly = true,
  size = 'sm',
  onCallback,
  ...props
}: DeleteButtonProps) => {
  const { handleDelete, isPending } = useDelete({
    id,
    path,
    deleteType,
    onCallback
  })

  return (
    <Tooltip
      className='bg-color-red text-color-lightest'
      content={<p className='font-bold'>Eliminar</p>}
    >
      <Button
        color='danger'
        size={size}
        isIconOnly={isIconOnly}
        startContent={startContent}
        className={cn('bg-color-red', className)}
        isLoading={isPending}
        isDisabled={isPending}
        onPress={handleDelete}
        {...props}
      >
        <>{children}</>
      </Button>
    </Tooltip>
  )
}

export default DeleteButton
