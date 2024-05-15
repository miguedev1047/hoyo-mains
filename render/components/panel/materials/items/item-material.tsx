import { Button } from '@nextui-org/button'
import { Material } from '@prisma/client'
import { Image } from '@nextui-org/image'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useOpen } from '@/utils/store/use-open'
import { deleteImage } from '@/utils/helpers/delete-image'
import { mutate } from 'swr'
import { deleteMaterial } from '@/render/services/panel/materials/delete'
import { toast } from 'sonner'
import { useTransition } from 'react'

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

      // Comprobar si la imagen se ha eliminado correctamente
      if (status === 201) {

        // Eliminar el material
        const { message, status, error } = await deleteMaterial(materialId)

        if (status === 201) {
          toast.success(message)
          mutate('/api/materials?type=all')
          return
        }

        toast.error(error)
        return
      }

      toast.error(error)
    })
  }

  return (
    <Card key={material.id} className='bg-color-dark'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Image
          isBlurred
          width={240}
          height={240}
          classNames={{
            wrapper: 'w-12 h-12'
          }}
          className='object-cover'
          src={material.imageUrl!}
          alt={material.name}
        />
        <h3 className='text-base font-semibold line-clamp-1'>
          {material.name}
        </h3>
      </CardHeader>
      <CardFooter className='grid grid-cols-2 gap-4'>
        <Button
          radius='sm'
          color='danger'
          isLoading={isPending}
          onPress={() => handleDelete(material.id)}
          className='bg-color-darkest font-bold'
          startContent={<IconTrash />}
        >
          Eliminar
        </Button>
        <Button
          radius='sm'
          color='success'
          onPress={() => handleEdit(material.id)}
          className='font-bold bg-color-light'
          startContent={<IconPencil />}
        >
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemMaterial
