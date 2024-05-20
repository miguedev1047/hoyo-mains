import { deleteCharacterArtifact } from '@/render/services/panel/artifacts/delete'
import { Data } from '@/types'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteArtifact = ({ artifact }: { artifact: Data }) => {
  const [isPending, starTransition] = useTransition()

  const handleDeleteArtifact = (artifactId: string) => {
    starTransition(async () => {
      const { status, message, error } = await deleteCharacterArtifact(
        artifactId
      )

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character/${artifact.characterId}`)
        return
      }

      toast.error(error)
    })
  }

  return (
    <Button
      color='danger'
      isLoading={isPending}
      isIconOnly
      onPress={() => handleDeleteArtifact(artifact.id)}
    >
      <IconTrash />
    </Button>
  )
}

export default ButtonDeleteArtifact
