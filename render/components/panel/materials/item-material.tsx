import { Button } from '@nextui-org/button'
import { Material } from '@prisma/client'
import { Card, CardBody } from '@nextui-org/card'
import { IconPencil, IconSettings, IconTrash } from '@tabler/icons-react'
import { useModalStore } from '@/utils/store/use-open'
import { deleteImage } from '@/utils/helpers/delete-image'
import {
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image
} from '@nextui-org/react'
import { mutate } from 'swr'
import { deleteMaterial } from '@/render/services/panel/materials/delete'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import Figure from '@/render/components/UI/misc/figure'
import TooltipItemName from '@/render/components/UI/tooltip/tooltip-item-name'
import clsx from 'clsx'

const ItemMaterial = ({ material }: { material: Material }) => {
  const [isPending, starTransition] = useTransition()

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (materialId: string) => {
    setModalId(materialId)
    onOpen({ name: 'material' })
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
        <article className='flex items-center gap-4'>
          <Figure width='w-10' height='h-10'>
            {material.imageUrl ? (
              <Image
                radius='sm'
                className='w-full h-full object-cover'
                src={material.imageUrl!}
                alt={material.name}
              />
            ) : (
              <CircularProgress
                aria-label='Loading...'
                size='lg'
                classNames={{
                  svg: 'w-full h-full drop-shadow-md',
                  indicator: 'stroke-color-success',
                  track: 'stroke-white/10',
                  value: 'text-sm font-semibold text-white'
                }}
                strokeWidth={5}
              />
            )}
          </Figure>
          <TooltipItemName item={material}>
            <h3 className='text-base font-semibold line-clamp-1'>
              {material.name}
            </h3>
          </TooltipItemName>
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
          <DropdownMenu aria-label='Material Actions'>
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
