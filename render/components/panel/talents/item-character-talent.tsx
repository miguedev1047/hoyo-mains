import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Avatar, Button } from '@nextui-org/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { CharacterTalents, Characters } from '@/types'
import { deleteImage } from '@/utils/helpers/delete-image'
import { useModalStore } from '@/utils/store/use-open'
import { useTransition } from 'react'
import { deleteTalent } from '@/render/services/panel/talents/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import Output from '@/render/components/UI/editor/output'

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
    <li>
      <Card className='py-5 px-8 bg-color-darkest'>
        <CardBody>
          <div className='grid grid-cols-12 gap-8'>
            <article className='space-y-4 col-span-2'>
              <Avatar
                src={talent.imageUrl!}
                size='lg'
                className='w-20 h-20 mx-auto bg-primary-color p-4 object-cover'
              />
              <h3 className='text-xl font-semibold text-secondary-color text-center'>
                {talent.name}
              </h3>
            </article>

            <div className='col-span-10'>
              <Output description={talent.description!} />
            </div>
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
    </li>
  )
}

export default ItemCharacterTalent
