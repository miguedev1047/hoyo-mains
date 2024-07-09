'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export const DeleteButton = ({
    children,
    onCallback,
    id,
    ...props
  }: {
    children: React.ReactNode
    id: string
    onCallback: (characterId: string) => Promise<any>
  }) => {
    const [isPending, startTransition] = useTransition()
    const { refresh } = useRouter()
  
    const handleDelete = () => {
      startTransition(async () => {
        const { status, message, error } = await onCallback(id)
  
        if (status === 201) {
          toast.success(message)
          refresh()
          return
        }
  
        toast.error(error)
      })
    }
  
    return (
      <Tooltip
        className='bg-color-red text-color-lightest'
        content={<p className='font-bold'>Eliminar</p>}
      >
        <Button
          size='sm'
          isIconOnly
          color='danger'
          className='bg-color-red'
          isLoading={isPending}
          onPress={handleDelete}
          {...props}
        >
          {children}
        </Button>
      </Tooltip>
    )
  }