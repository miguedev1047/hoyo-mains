import { Button } from '@nextui-org/button'
import { Material } from '@prisma/client'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { IconPencil, IconSettings, IconTrash } from '@tabler/icons-react'
import { useOpen } from '@/utils/store/use-open'
import { deleteImage } from '@/utils/helpers/delete-image'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip
} from '@nextui-org/react'
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
      <CardBody className='flex flex-row gap-4 items-center justify-between'>
        <article className='flex items-center gap-2'>
          <Avatar
            radius='sm'
            className='p-1 object-cover'
            src={material.imageUrl!}
            alt={material.name}
          />
          <Tooltip
            radius='sm'
            placement='bottom-end'
            className='bg-color-light text-color-darkest p-4 font-medium'
            content={material.name}
          >
            <h3 className='text-base font-semibold line-clamp-1'>
              {material.name}
            </h3>
          </Tooltip>
        </article>

        <Dropdown backdrop='opaque' className='bg-color-dark'>
          <DropdownTrigger>
            <Button
              isIconOnly
              size='sm'
              color='success'
              className='bg-color-light'
              isLoading={isPending}
            >
              <IconSettings />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Weapon Actions'>
            <DropdownSection title='Acciones'>
              <DropdownItem
                key='edit'
                onPress={() => handleEdit(material.id)}
                startContent={<IconPencil />}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key='delete'
                onPress={() => handleDelete(material.id)}
                startContent={<IconTrash />}
                color='danger'
                className='text-color-red'
              >
                Eliminar
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

export default ItemMaterial
