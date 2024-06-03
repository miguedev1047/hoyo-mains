import { Button } from '@nextui-org/button'
import { Artifact } from '@prisma/client'
import { Card, CardBody } from '@nextui-org/card'
import { IconPencil, IconSettings, IconTrash } from '@tabler/icons-react'
import { useModalStore } from '@/utils/store/use-open'
import { deleteImage } from '@/utils/helpers/delete-image'
import { mutate } from 'swr'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip
} from '@nextui-org/react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { deleteArtifact } from '@/render/services/panel/artifacts/delete'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import clsx from 'clsx'

const ItemArtifact = ({ artifact }: { artifact: Artifact }) => {
  const [isPending, starTransition] = useTransition()

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
      <CardBody className='flex flex-row gap-4 items-center justify-between'>
        <article className='flex items-center gap-2'>
          <Avatar
            radius='sm'
            className='p-1 object-cover'
            src={artifact.imageUrl!}
            alt={artifact.name}
          />
          <Tooltip
            radius='sm'
            placement='bottom-end'
            className='bg-color-light text-color-darkest p-4 font-medium'
            content={artifact.name}
          >
            <h3 className='text-base font-semibold line-clamp-1'>
              {artifact.name}
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
                onPress={() => handleEdit(artifact.id)}
                startContent={<IconPencil />}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                key='delete'
                onPress={() => handleDelete(artifact.id)}
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

export default ItemArtifact
