import { deleteAscension } from '@/render/services/panel/ascensions/delete'
import { Ascension } from '@/types'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const TableActions = ({ ascension }: { ascension: Ascension }) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (ascensionId: string) => {
    startTransition(async () => {
      const { status, error, message } = await deleteAscension(ascensionId)

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character/${ascension.characterId}`)
        return
      }

      toast.error(error)
    })
  }

  return (
    <div className='flex gap-2'>
      {/* <Tooltip
        className='bg-color-light text-color-darkest font-bold'
        content='Editar'
      >
        <Button
          size='sm'
          isIconOnly
          color='success'
          isLoading={isPending}
          className='bg-color-light'
        >
          <IconPencil />
        </Button>
      </Tooltip> */}
      <Tooltip
        className='bg-color-red text-color-lightest font-bold'
        content='Eliminar'
      >
        <Button
          size='sm'
          isIconOnly
          color='danger'
          isLoading={isPending}
          className='bg-color-red'
          onPress={() => handleDelete(ascension.id)}
        >
          <IconTrash />
        </Button>
      </Tooltip>
    </div>
  )
}

export default TableActions
