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
import { getStarBorderColor } from '@/utils/helpers/get-color'
import clsx from 'clsx'

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
    <Card
      key={artifact.id}
      className={clsx(
        'bg-color-dark border-2',
        getStarBorderColor(artifact.stars)
      )}
    >
      <CardHeader className='flex flex-row items-center gap-4'>
        <Image
          className='w-12 h-12 object-cover bg-color-darkest rounded-lg'
          src={artifact.imageUrl!}
          alt={artifact.name}
        />
        <h3 className='text-base font-semibold line-clamp-1'>
          {artifact.name}
        </h3>
      </CardHeader>
      <CardFooter className='grid grid-cols-2 gap-2'>
        <Button
          size='sm'
          radius='sm'
          color='danger'
          isLoading={isPending}
          onPress={() => handleDelete(artifact.id)}
          className='bg-color-darkest font-bold'
          startContent={<IconTrash size={16} />}
        >
          Eliminar
        </Button>
        <Button
          size='sm'
          radius='sm'
          color='success'
          onPress={() => handleEdit(artifact.id)}
          className='font-bold bg-color-light'
          startContent={<IconPencil size={16} />}
        >
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemArtifact
