import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Avatar, Button } from '@nextui-org/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { CharacterPassives, Characters } from '@/types'
import { deleteImage } from '@/utils/helpers/delete-image'
import { useModalStore } from '@/utils/store/use-open'
import { useTransition } from 'react'
import { deletePassive } from '@/render/services/panel/passives/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import Output from '@/render/components/UI/editor/output'

const ItemCharacterPassive = ({
  passive,
  character
}: {
  passive: CharacterPassives
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const { onOpen, setModalId } = useModalStore((state) => ({
    onOpen: state.onOpen,
    setModalId: state.setModalId
  }))

  const handleEdit = (passiveId: string) => {
    setModalId(passiveId)
    onOpen({ name: 'passive' })
  }

  const handleDelete = (passiveId: string) => {
    startTransition(async () => {
      const { status, error } = await deleteImage({
        path: 'passives',
        id: passiveId
      })

      // Si la imagen se elimino, eliminamos el talento
      if (status === 201) {
        // Eliminar el talento
        const { message, status, error } = await deletePassive(passiveId)

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
                src={passive.imageUrl!}
                size='lg'
                className='w-20 h-20 mx-auto bg-primary-color p-4 object-cover'
              />
              <h3 className='text-xl font-semibold text-secondary-color text-center'>
                {passive.name}
              </h3>
            </article>

            <Output description={passive.description!} />
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
              onPress={() => handleDelete(passive.id)}
            >
              Eliminar
            </Button>
            <Button
              size='lg'
              startContent={<IconPencil />}
              onPress={() => handleEdit(passive.id)}
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

export default ItemCharacterPassive
