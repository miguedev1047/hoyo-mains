import { Button } from '@nextui-org/button'
import { Artifact } from '@prisma/client'
import { Image } from '@nextui-org/image'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useOpen } from '@/utils/store/use-open'
import { deleteImage } from '@/utils/helpers/delete-image'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { deleteArtifact } from '@/render/services/panel/artifacts/delete'

const ItemArtifact = ({ artifact }: { artifact: Artifact }) => {
  const [isPending, starTransition] = useTransition()

  const { onOpen, setId } = useOpen((state) => ({
    onOpen: state.onOpen,
    setId: state.setId
  }))

  const handleEdit = (artifactId: string) => {
    setId(artifactId)
    onOpen(true)
  }

  const handleDelete = (artifactId: string) => {
    starTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'artifacts',
        id: artifactId
      })

      // Si la imagen se elimino, eliminamos el material
      if (status === 201) {
        // Eliminar el material
        const { message, status, error } = await deleteArtifact(artifactId)

        if (status === 201) {
          toast.success(message)
          mutate('/api/artifacts')
          return
        }

        toast.error(error)
        return
      }

      toast.error(`${error} Intentalo de nuevo`)
    })
  }

  return (
    <Card key={artifact.id} className='bg-color-dark'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Image
          isBlurred
          className='object-cover w-12 h-12'
          src={artifact.imageUrl!}
          alt={artifact.name}
        />
        <h3 className='text-base font-semibold line-clamp-1'>
          {artifact.name}
        </h3>
      </CardHeader>
      <CardFooter className='grid grid-cols-2 gap-4'>
        <Button
          radius='sm'
          color='danger'
          isLoading={isPending}
          onPress={() => handleDelete(artifact.id)}
          className='bg-color-darkest font-bold'
          startContent={<IconTrash />}
        >
          Eliminar
        </Button>
        <Button
          radius='sm'
          color='success'
          onPress={() => handleEdit(artifact.id)}
          className='font-bold bg-color-light'
          startContent={<IconPencil />}
        >
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemArtifact
