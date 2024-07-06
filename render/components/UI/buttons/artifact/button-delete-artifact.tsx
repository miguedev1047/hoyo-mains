import { deleteCharacterArtifact } from '@/render/services/panel/artifacts/delete'
import { CharacterTypes, Data } from '@/types'
import { Button } from '@nextui-org/button'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteArtifact = ({
  artifact,
  character
}: {
  artifact: Data
  character: CharacterTypes | undefined
}) => {
  const [isPending, starTransition] = useTransition()
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const handleDeleteArtifact = (artifactId: string) => {
    starTransition(async () => {
      const { status, message, error } = await deleteCharacterArtifact(
        artifactId
      )

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character?name=${characterName}`)
        return
      }

      toast.error(error)
    })
  }

  return (
    <Button
      isIconOnly
      color='danger'
      isLoading={isPending}
      className='bg-color-red'
      onPress={() => handleDeleteArtifact(artifact.id)}
    >
      <IconTrash />
    </Button>
  )
}

export default ButtonDeleteArtifact
