'use client'

import { deleteImage } from '@/utils/helpers/delete-image'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface DeleteHookProps {
  id: string
  path?: string
  deleteType?: 'normal' | 'image'
  onCallback: (characterId: string) => Promise<any>
}

const useDelete = ({
  id,
  path = 'none',
  deleteType = 'normal',
  onCallback
}: DeleteHookProps) => {
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

export default useDelete
