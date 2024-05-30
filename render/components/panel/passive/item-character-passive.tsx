import { Characters } from '@/types'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Avatar, Button, Card, CardBody, CardFooter } from '@nextui-org/react'
import { useOpenModal } from '@/utils/store/use-open'
import { useEffect, useState, useTransition } from 'react'
import { deleteImage } from '@/utils/helpers/delete-image'
import { deleteTalent } from '@/render/services/panel/talents/delete'
import { toast } from 'sonner'
import { mutate } from 'swr'
import Output from '@/render/components/UI/editor/output'

const ItemCharacterPassive = ({
  character
}: {
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

  useEffect(() => {
    setKey(+new Date())
  }, [character])

  const { onOpen, setId } = useOpenModal((state) => ({
    setId: state.setId,
    onOpen: state.onOpen
  }))

  const handleEdit = (passiveId: string) => {
    setId(passiveId)
    onOpen(true, 'passive-modal')
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
        const { message, status, error } = await deleteTalent(passiveId)

        if (status === 201) {
          toast.success(message)
          mutate(`/api/characters/character/${character?.id}`)
          return
        }

        toast.error(error)
        return
      }

      toast.error(`${error} Intentalo de nuevo`)
    })
  }

  return (
    <ol className='space-y-4'>
      {character?.passives.map((passive) => (
        <li key={passive.id}>
          <Card className='py-5 px-8 bg-color-darkest'>
            <CardBody>
              <div className='flex gap-8'>
                <article className='w-64 space-y-4'>
                  <Avatar
                    src={passive.imageUrl!}
                    size='lg'
                    className='w-20 h-20 mx-auto bg-primary-color p-4 object-cover'
                  />
                  <h3 className='text-xl font-semibold capitalize text-secondary-color text-center'>
                    {passive.name}
                  </h3>
                </article>

                <Output key={key} description={passive.description!} />
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
      ))}
    </ol>
  )
}

export default ItemCharacterPassive
