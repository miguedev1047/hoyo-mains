import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Button, CircularProgress, Divider, Image } from '@nextui-org/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { CharacterTalents, Characters } from '@/types'
import { deleteImage } from '@/utils/helpers/delete-image'
import { useModalStore } from '@/utils/store/use-open'
import { useTransition } from 'react'
import { deleteTalent } from '@/render/services/panel/talents/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import Output from '@/render/components/UI/editor/output'
import Figure from '@/render/components/UI/misc/figure'

const ItemCharacterTalent = ({
  talent,
  character
}: {
  talent: CharacterTalents
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (talentId: string) => {
    setModalId(talentId)
    onOpen({ name: 'talent' })
  }

  const handleDelete = (talentId: string) => {
    startTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'talents',
        id: talentId
      })

      // Si la imagen se elimino, eliminamos el talento
      if (status === 201) {
        // Eliminar el talento
        const { message, status, error } = await deleteTalent(talentId)

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
            {talent.imageUrl ? (
              <Image
                className='w-full h-full bg-primary-color object-cover'
                src={talent.imageUrl!}
                alt={talent.name}
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
            {talent.name}
          </h3>
        </article>
      </CardHeader>
      <Divider />
      <CardBody>
        <Output description={talent.description!} />
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
            onPress={() => handleDelete(talent.id)}
          >
            Eliminar
          </Button>
          <Button
            size='lg'
            startContent={<IconPencil />}
            onPress={() => handleEdit(talent.id)}
            className='bg-color-light font-bold text-color-darkest'
          >
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ItemCharacterTalent
