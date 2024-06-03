import { Characters, Constellations } from '@/types'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Avatar, Button, Card, CardBody, CardFooter } from '@nextui-org/react'
import { useModalStore } from '@/utils/store/use-open'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { deleteConstellation } from '@/render/services/panel/constellations/delete'
import Output from '@/render/components/UI/editor/output'

const ItemCharacterConstellation = ({
  constellation,
  character
}: {
  constellation: Constellations
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (constellationId: string) => {
    setModalId(constellationId)
    onOpen({ name: 'constellation' })
  }

  const handleDelete = (constellationsId: string) => {
    startTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'constellations',
        id: constellationsId
      })

      // Si la imagen se elimino, eliminamos la constelación
      if (status === 201) {
        const { message, status, error } = await deleteConstellation(
          constellationsId
        )

        if (status === 201) {
          toast.success(message)
          mutate(`/api/characters/character?name=${characterName}`)
          return
        }

        toast.error(error)
        return
      }

      toast.error(`${error} Intentalo de nuevo`)
    })
  }

  return (
    <li>
      <Card className='py-5 px-8 bg-color-darkest'>
        <CardBody>
          <div className='flex gap-8'>
            <article className='w-64 space-y-4'>
              <Avatar
                src={constellation.imageUrl!}
                size='lg'
                className='w-20 h-20 mx-auto bg-primary-color p-4 object-cover'
              />
              <h3 className='text-xl font-semibold text-secondary-color text-center'>
                {constellation.name}
              </h3>
            </article>

            <Output description={constellation.description!} />
          </div>
        </CardBody>

        <CardFooter>
          <div className='w-full grid grid-cols-2 gap-4'>
            <Button
              size='lg'
              color='danger'
              isLoading={isPending}
              startContent={<IconTrash />}
              className='bg-color-red font-bold'
              onPress={() => handleDelete(constellation.id)}
            >
              Eliminar
            </Button>
            <Button
              size='lg'
              startContent={<IconPencil />}
              onPress={() => handleEdit(constellation.id)}
              className='bg-color-light font-bold text-color-darkest'
            >
              Editar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </li>
  )
}

export default ItemCharacterConstellation
