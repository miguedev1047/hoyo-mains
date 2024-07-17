import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { deleteImage } from '@/render/src/shared/utilities/helpers/delete-image'
import { deleteWeapon } from '@/render/src/panel/weapons/utilities/services/delete'
import { toast } from 'sonner'

export const useDropdownOptions = () => {
  const [isPending, starTransition] = useTransition()
  const { refresh } = useRouter()

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (weaponId: string) => {
    setModalId(weaponId)
    onOpen({ name: 'weapon' })
  }

  const handleDelete = (weaponId: string) => {
    starTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'weapons',
        id: weaponId
      })

      // Si la imagen se elimino, eliminamos el arma
      if (status === 201) {
        // Eliminar el arma
        const { message, status, error } = await deleteWeapon(weaponId)

        if (status === 201) {
          toast.success(message)
          refresh()
          return
        }

        toast.error(error)
        return
      }

      toast.error(`${error} Intentalo de nuevo`)
    })
  }

  return { handleEdit, handleDelete, isPending }
}
