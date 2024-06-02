import { Button } from '@nextui-org/button'
import { Material } from '@prisma/client'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useOpen } from '@/utils/store/use-open'
import { deleteImage } from '@/utils/helpers/delete-image'
import { Avatar } from '@nextui-org/react'
import { mutate } from 'swr'
import { deleteMaterial } from '@/render/services/panel/materials/delete'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import clsx from 'clsx'

const ItemMaterial = ({ material }: { material: Material }) => {
  const [isPending, starTransition] = useTransition()

  const { onOpen, setId } = useOpen((state) => ({
    onOpen: state.onOpen,
    setId: state.setId
  }))

  const handleEdit = (materialId: string) => {
    setId(materialId)
    onOpen(true)
  }

  const handleDelete = (materialId: string) => {
    starTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'materials',
        id: materialId
      })

      // Si la imagen se elimino, eliminamos el material
      if (status === 201) {
        // Eliminar el material
        const { message, status, error } = await deleteMaterial(materialId)

        if (status === 201) {
          toast.success(message)
          mutate('/api/materials?')
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
      key={material.id}
      className={clsx(
        'bg-color-dark border-2',
        getStarBorderColor(material.stars)
      )}
    >
      <CardHeader className='flex flex-row items-center gap-4'>
        <Avatar
          radius='sm'
          className='p-1 object-cover'
          src={material.imageUrl!}
          alt={material.name}
        />
        <h3 className='text-base font-semibold line-clamp-1'>
          {material.name}
        </h3>
      </CardHeader>
      <CardFooter className='grid grid-cols-2 gap-2'>
        <Button
          size='sm'
          radius='sm'
          color='danger'
          isLoading={isPending}
          onPress={() => handleDelete(material.id)}
          className='bg-color-darkest font-bold'
          startContent={<IconTrash size={16} />}
        >
          Eliminar
        </Button>
        <Button
          size='sm'
          radius='sm'
          color='success'
          onPress={() => handleEdit(material.id)}
          className='font-bold bg-color-light'
          startContent={<IconPencil size={16} />}
        >
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemMaterial
