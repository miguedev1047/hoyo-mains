import { deleteTeam } from '@/render/services/panel/teams/delete'
import { Characters, Team } from '@/types'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteTeam = ({
  character,
  team
}: {
  character: Characters | undefined
  team: Team | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const characterId = character?.id

  const handleDeleteCharacterTeam = async (teamId: string | undefined) => {
    startTransition(async () => {
      const { status, message, error } = await deleteTeam(teamId)
      if (status === 200) {
        toast.success(message)
        mutate(`/api/characters/character/${characterId}`)
        return
      }

      toast.error(error)
    })
  }

  return (
    <Button
      size='sm'
      isIconOnly
      color='danger'
      isLoading={isPending}
      className='bg-color-red'
      onPress={() => handleDeleteCharacterTeam(team?.id)}
    >
      <IconTrash size={20} />
    </Button>
  )
}

export default ButtonDeleteTeam
