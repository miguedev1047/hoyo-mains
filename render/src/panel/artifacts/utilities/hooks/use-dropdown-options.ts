import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { deleteImage } from '@/render/src/shared/utilities/helpers/delete-image'
import { deleteArtifact } from '@/render/src/panel/artifacts/utilities/services/delete'
import { toast } from 'sonner'

export const useDropdownOptions = () => {
  const [isPending, starTransition] = useTransition()
  const { refresh } = useRouter()

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (artifactId: string) => {
    setModalId(artifactId)
    onOpen({ name: 'artifact' })
  }

  const handleDelete = (artifactId: string) => {
    starTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'artifacts',
        id: artifactId
      })

      // Si la imagen se elimino, eliminamos el arma
      if (status === 201) {
        // Eliminar el arma
        const { message, status, error } = await deleteArtifact(artifactId)

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
