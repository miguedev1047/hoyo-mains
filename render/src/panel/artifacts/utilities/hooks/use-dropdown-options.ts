import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useOpenStore } from '@/render/src/panel/shared/utilities/store/use-open'
import { deleteImage } from '@/render/src/shared/utilities/helpers/delete-image'
import { deleteArtifact } from '@/render/src/panel/artifacts/utilities/services/delete'
import { toast } from 'sonner'

export const useDropdownOptions = () => {
  const [isPending, starTransition] = useTransition()
  const { refresh } = useRouter()

  const { onOpenThis, setId } = useOpenStore((state) => ({
    onOpenThis: state.onOpenThis,
    setId: state.setId
  }))

  const handleEdit = (artifactId: string) => {
    setId(artifactId)
    onOpenThis({ name: 'artifact' })
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
