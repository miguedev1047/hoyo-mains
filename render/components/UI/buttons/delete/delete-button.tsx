'use client'

import { deleteImage } from '@/utils/helpers/delete-image'
import { Button, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface HookProps {
  id: string
  path?: string
  deleteType?: 'normal' | 'image'
  onCallback: (characterId: string) => Promise<any>
}

interface DeleteButtonProps {
  id: string
  children: React.ReactNode
  className?: string
  path?: string
  deleteType?: 'normal' | 'image'
  onCallback: (characterId: string) => Promise<any>
}

const useDelete = ({
  id,
  path = 'none',
  deleteType = 'normal',
  onCallback
}: HookProps) => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const { status, message, error } = await onCallback(id)

      if (status === 201) {
        toast.success(message)

        if (deleteType === 'image') {
          await deleteImage({ path: path!, id: id })
          refresh()
          return
        }

        refresh()
        return
      }

      toast.error(error)
    })
  }

  return { isPending, handleDelete }
}

export const DeleteButton = ({
  id,
  children,
  path,
  className,
  deleteType = 'normal',
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
        size='sm'
        isIconOnly
        color='danger'
        className={`bg-color-red ${className}`}
        isLoading={isPending}
        isDisabled={isPending}
        onPress={handleDelete}
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  )
}
