import { Characters, Constellations } from '@/types'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Image
} from '@nextui-org/react'
import { useModalStore } from '@/utils/store/use-open'
import { useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { deleteConstellation } from '@/render/services/panel/constellations/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import Output from '@/render/components/UI/editor/output'
import Figure from '../../UI/misc/figure'

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
    <Card as='li' className='px-2 py-5 md:px-8 bg-color-darkest space-y-3'>
      <CardHeader>
        <article className='w-full flex items-center max-md:justify-between gap-4'>
          <Figure radius='rounded-full' width='w-20' height='h-20'>
            {constellation.imageUrl ? (
              <Image
                className='w-full h-full bg-primary-color object-cover'
                src={constellation.imageUrl!}
                alt={constellation.name}
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
          <h3 className='text-xl font-semibold text-secondary-color line-clamp-1'>
            {constellation.name}
          </h3>
        </article>
      </CardHeader>
      <Divider />
      <CardBody>
        <Output description={constellation.description!} />
      </CardBody>
      <Divider />
      <CardFooter>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
  )
}

export default ItemCharacterConstellation
