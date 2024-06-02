import { deleteAscension } from '@/render/services/panel/ascensions/delete'
import { Ascension, Characters } from '@/types'
import { Button, Tooltip } from '@nextui-org/react'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const TableActions = ({
  ascension,
  character
}: {
  ascension: Ascension
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const handleDelete = (ascensionId: string) => {
    startTransition(async () => {
      const { status, error, message } = await deleteAscension(ascensionId)

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character?name=${characterName}`)
        return
      }

      toast.error(error)
    })
  }

  return (
    <div className='flex gap-2'>
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
